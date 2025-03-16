from flask import Flask, request, jsonify
import os
import google.generativeai as genai
from PIL import Image
from flask_cors import CORS
import io
import json
from pymongo import MongoClient
from datetime import datetime
import base64

app = Flask(__name__)
CORS(app, origins=[os.getenv("CLIENT_URL")] ,supports_credentials=True)
# Gemini API configuration
GENI_API_KEY = "AIzaSyB6FnJr5QNhtfE972ydklzCx_Rv9P4PChU"
genai.configure(api_key=GENI_API_KEY)
gemini_model = genai.GenerativeModel("gemini-2.0-flash")

# MongoDB setup
MONGO_URI = "mongodb+srv://admin:nYo9ijypMswauJz5@cluster0.kr9ba.mongodb.net/"
mongo_client = MongoClient(MONGO_URI)
db = mongo_client["chat_db"]
chat_history_collection = db["chat_history"]

def save_chat_history(user_id, prompt, summary):
    entry = {
        "user_id": user_id,
        "history": [
            {"prompt": prompt, "summary": summary, "timestamp": datetime.utcnow()}
        ]
    }
    existing = chat_history_collection.find_one({"user_id": user_id})
    if existing:
        chat_history_collection.update_one(
            {"user_id": user_id},
            {"$push": {"history": {"prompt": prompt, "summary": summary, "timestamp": datetime.utcnow()}}}
        )
    else:
        chat_history_collection.insert_one(entry)

def convert_image(image_data_url):
    try:
        # If the image_data_url is a base64 data URL (as sent by the frontend)
        if image_data_url.startswith("data:image"):
            header, encoded = image_data_url.split(",", 1)
            image_bytes = base64.b64decode(encoded)
            mime_type = header.split(";")[0].replace("data:", "")
            return {"mime_type": mime_type, "data": image_bytes}
        else:
            # Otherwise, treat as a file path (if applicable)
            with Image.open(image_data_url) as img:
                img_bytes = io.BytesIO()
                img.save(img_bytes, format="JPEG")
                return {"mime_type": "image/jpeg", "data": img_bytes.getvalue()}
    except Exception as e:
        print("Error converting image:", e)
        return None

def chunk_text(text, chunk_size=500):
    return [text[i : i + chunk_size] for i in range(0, len(text), chunk_size)]

# Global instructions for Gemini (for plant-related decision)
INSTRUCTIONS = (
    "You are a plant health specialist."
    "You excel at identifying plant diseases the plant is suffering from just from a picture of the plant."
    "You specifically have more experienced towards indian faura and fauna."
    "You also are multilingual and is able to understand many indian languages"
    "If the user query is not in english . first translate the language to english."    
    "Then infer if the prompt is related to plants, if yes regardless which language the original query was. respond with \"1\". "
    "If not, respond with \"0\". "
    "Respond strictly with only \"1\" or \"0\"."
)

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    user_id = data.get("user_id")
    prompt = data.get("prompt", "")
    image_path = data.get("image_path", "")

    if not user_id or not prompt:
        return jsonify({"error": "Missing user_id or prompt"}), 400

    # Reassemble prompt if too long
    prompt_chunks = chunk_text(prompt)
    full_prompt = " ".join(prompt_chunks)

    # Step 1: Decide if the prompt is plant-related
    gemini_prompt = f"{INSTRUCTIONS} Prompt: {full_prompt}"
    decision_response = gemini_model.generate_content([{"text": gemini_prompt}])
    decision = decision_response.text.strip()

    # Step 2: decide the language of the prompt.
    language_inst =  (
        "You excel at detecting language from queries. "
        "you return the language of the user query back to user " 
        "you only do this specific work and nothing else. "
        "Here are few examples for you. "
        "<user>: ମୋ ଖେତରେ ଏକ ଗଛ କୌଣସି ରୋଗର ଶିକାର ହୋଇଛି, ମୁଁ କି କରିବି ?. "
        "<assistant>: odia language. "
        "<user>: ਮੇਰੇ ਖੇਤ ਵਿੱਚ ਇੱਕ ਪੌਦਾ ਕਿਸੇ ਬਿਮਾਰੀ ਦਾ ਸ਼ਿਕਾਰ ਹੋ ਗਿਆ ਹੈ, ਮੈਂ ਕੀ ਕਰਾਂ. "
        "<assistant>: punjabi language. "
        "<user>: আমার খেতে একটি গাছ কোনো রোগে আক্রান্ত হয়েছে, আমি কী করব? "
        "<assistant>: bengali language."
        "<user>: मेरे खेत की फसल में पत्तियों में कीड़े लग गए, मैं क्या करूँ?. "
        "<assistant>: Hindi language."
    )
    language_prompt = f"{language_inst} Prompt: {full_prompt}"
    language_response = gemini_model.generate_content([{"text": language_prompt}])
    language = language_response.text.strip()

    if decision == "1":
        # Plant-related: perform analysis
        img_data = convert_image(image_path) if image_path else None
        if img_data:
            analysis_instruction = (
                "---System-Instruction---" +
                " \nYou are an expert at identifying plant dieseases by just having an image of the suffering plant or crop." +
                " \nPlease analyze the plant in the image for any signs of disease. " +
                f" \nGive the final answer output to the user in {language}" +
                " \nconvert the query to english language if other language apart from english is mentioned" +
                " \nYou think step by step." +
                " \nYou refine , reflect and revaluate on your answers." +
                " \nYou do not give any wrong solutions or solutions with contradictions." +
                " \nYou do not engage in any conversations other than invloving plants or crops or farmer / botanist related." +
                " \nIf the plant seems okay do not give false diagnosis and solution. Reply accordingly." +
                " \nProvide the output in HTML format. Include a relevant title (using bold and italic tags) " +
                " and a detailed explanation. Use <ul>, <li>, and <br> tags for formatting as needed." +
                " \nyour answer should be well structured and edited. use emojis where necessary." +
                " \nyou will follow a structure while giving the user a solution." + 
                " \nIdentify the plant or the crop given in the image. give the answer for your founding in italic" +
                " \nIdentify at most 2 most possible and accurate diesease the plant/crop has been diagnosed with and treat it as the title." +
                """ \nCome up with the adequate reason for "why" the plant has been diagnosed with those specific illness. treat this as the subtitle.""" +
                " \nthink step by step for all the necessary solution required to cure the plant fully and remove the illness completely" +
                " \nwhile thinking about the solution consider all factors which might benifit quick recovery of the plant such as required weather, temperature, additional inscetisides, fertilizers, specilized medication to treat certain plant illnessess, organic methods, physical methods like separation of diagnosed plants etc. and so on" +
                " \nOrganize all of your solution and key points to take care of" +
                " \nPresent your solution in Header and subtext format , where solutions are categorized into few headers and the subtext under the respective headers which contains the deep solution." +
                " \nDo not overwhelm the user with technical jargons. make sure your solution is as easy to understand as it can get." +
                " \nAdd an conclusion header at the end in bold with the subtext containing the summary of your whole solution under 100 words with key action to take asap to save the crop / plant." +
                f" \ntranslate back only your answer from english to {language}" +
                " \nstriclty adhere to the given structure." + 
                " \nThe solution should look visually colorful." +
                " \nshould always have transparent background color or rgb(54, 69, 79)." +
                " \nshould have white  color text in front of transparent background." +
                " \nAnd should always have white thin rounded borders" +
                " \nUse good color combinations in the boxes. everything should be center aligned." +
                " \nalways give padding to text." +
                " \ndo not add ```html and ``` at opening or closing." +
                " \ndo not add any links or images or videos in the solution." +
                " \nHere is an example." + 
                " \n<user>: {image of the plant} + English language {its own query.}" +
                """ \n<assistant>: 
<div style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; background-color: rgba(0, 0, 0, 0); color: #ffffff; padding: 30px; max-width: 900px; margin: 0 auto;">
    <div style="background-color: rgba(38, 48 ,55, 0.7); border-radius: 15px; padding: 30px; box-shadow: 0 8px 16px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px; background-color: rgba(0, 0, 0, 0);">
            <p style="font-size: 22px; font-weight: 600; color: #ffffff; background-color: rgba(0, 0, 0, 0); padding: 12px; border-radius: 8px; display: inline-block; margin-bottom: 15px;">
                <span style="font-weight: bold;">The leaf in the image has been identified as that of a potato plant.</span>
            </p>
            
            <h1 style="font-size: 36px; color: #white; margin-top: 20px; text-transform: uppercase; letter-spacing: 1px; text-shadow: 1px 1px 3px rgba(0,0,0,0.1);">
                Probable cause Identified: Early Potato blight or Fungal Outbreak
            </h1>
        </div>
        
        <div>
            <h2 style="font-size: 32px; color: #ffffff; text-align: center; margin: 40px 0 25px; padding-bottom: 10px; border-bottom: 3px solid #3cb371;">
                Solution to Cure Potato Blight
            </h2>
            
            <h3 style="font-size: 26px; color: #ffffff; margin: 30px 0 20px; padding: 10px 15px; background-color: rgba(0, 0, 0, 0); border-radius: 8px;">
                Immediate Actions
            </h3>
            
            <ol style="font-size: 18px; padding-left: 25px; margin: 25px 0;">
                <li style="margin-bottom: 18px; padding: 12px; background-color: rgb(54, 69, 79); border-radius: 8px;" onmouseover="this.style.transform='translateX(5px)'" onmouseout="this.style.transform='translateX(0)'">
                    <span style="font-weight: bold; color: #ffffff; font-size: 20px;">Remove Infected Foliage</span>: Cut all infected stems/leaves to ground level using clean tools. Burn the material or dispose of it in municipal green waste bins — do not compost it. If the infection is severe, cut all foliage (even if healthy-looking) to stop spores from reaching tubers.
                </li>
                
                <li style="margin-bottom: 18px; padding: 12px; background-color: rgb(54, 69, 79); border-radius: 8px;" onmouseover="this.style.transform='translateX(5px)'" onmouseout="this.style.transform='translateX(0)'">
                    <span style="font-weight: bold; color: #ffffff; font-size: 20px;">Apply Fungicide</span>:
                    <ul style="margin-top: 10px; padding-left: 25px;">
                        <li style="margin-bottom: 12px; padding: 8px; background-color: rgba(0, 0, 0, 0); border-radius: 6px;">
                            <span style="font-weight: bold; color: #2e8b57;">Chemical options</span>:
                            <ul style="margin-top: 8px; padding-left: 20px;">
                                <li style="margin-bottom: 8px; padding: 6px;">Use <span style="font-weight: bold; color: #228b22;">mandipropamid</span> (e.g., Revus Top®) to kill spores on plant surfaces and block new infections.</li>
                                <li style="margin-bottom: 8px; padding: 6px;">Apply <span style="font-weight: bold; color: #228b22;">fluazinam</span> (e.g., Ranman Top) for spore-killing effects during tuber maturation.</li>
                                <li style="margin-bottom: 8px; padding: 6px;">For early-stage infections, use <span style="font-weight: bold; color: #228b22;">zineb + hexaconazole</span> (e.g., 68% zineb + 4% hexaconazole) to reduce disease spread effectively.</li>
                            </ul>
                        </li>
                        
                        <li style="margin-bottom: 12px; padding: 8px; background-color: rgba(0, 0, 0, 0); border-radius: 6px;">
                            <span style="font-weight: bold; color: #2e8b57;">Organic options</span>:
                            <ul style="margin-top: 8px; padding-left: 20px;">
                                <li style="margin-bottom: 8px; padding: 6px;">Use <span style="font-weight: bold; color: #228b22;">copper hydroxide</span> or <span style="font-weight: bold; color: #228b22;">phosphorous acid sprays</span> (approved for organic use).</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                
                <li style="margin-bottom: 18px; padding: 12px; background-color: rgb(54, 69, 79); border-radius: 8px; " onmouseover="this.style.transform='translateX(5px)'" onmouseout="this.style.transform='translateX(0)'">
                    <span style="font-weight: bold; color: #ffffff; font-size: 20px;">Dry the Foliage</span>: Avoid watering foliage. If irrigation is needed, water only at the base in the morning to let leaves dry quickly.
                </li>
            </ol>

            <h3 style="font-size: 26px; color: #3cb371; margin: 30px 0 20px; padding: 10px 15px; background-color: rgba(0,0,0,0); border-radius: 8px; ">
                Post-Infection Care
            </h3>
            
            <ol style="font-size: 18px; padding-left: 25px; margin: 25px 0;">
                <li style="margin-bottom: 18px; padding: 12px; background-color: rgb(54, 69, 79); border-radius: 8px; " onmouseover="this.style.transform='translateX(5px)'" onmouseout="this.style.transform='translateX(0)'">
                    <span style="font-weight: bold; color: #ffffff; font-size: 20px;">Protect Tubers</span>: Leave tubers in the ground for <span style="font-weight: bold; color: #ffffff;">3 weeks</span> after cutting foliage. This allows spores on the soil surface to die and lets tuber skins harden. Do not harvest early—infected tubers may rot in storage.
                </li>
                
                <li style="margin-bottom: 18px; padding: 12px; background-color: rgb(54, 69, 79); border-radius: 8px; " onmouseover="this.style.transform='translateX(5px)'" onmouseout="this.style.transform='translateX(0)'">
                    <span style="font-weight: bold; color: #ffffff; font-size: 20px;">Check Tubers</span>: After 3 weeks, dig up tubers carefully. Discard any with dark spots, rot, or soft areas. Use undamaged tubers ASAP—they won't store well.
                </li>
            </ol>

            <h3 style="font-size: 26px; color: #3cb371; margin: 30px 0 20px; padding: 10px 15px; background-color: rgba(0, 0, 0, 0); border-radius: 8px;">
                Prevent Future Outbreaks
            </h3>
            
            <ol style="font-size: 18px; padding-left: 25px; margin: 25px 0;">
                <li style="margin-bottom: 18px; padding: 12px; background-color: rgb(54, 69, 79); border-radius: 8px;" onmouseover="this.style.transform='translateX(5px)'" onmouseout="this.style.transform='translateX(0)'">
                    <span style="font-weight: bold; color: #ffffff; font-size: 20px;">Use Resistant Varieties</span>: Plant blight-resistant types like <span style="font-weight: bold; color: #228b22;">Sarpo Mira</span> or <span style="font-weight: bold; color: #228b22;">Sarpo Axona</span> next season.
                </li>
                
                <li style="margin-bottom: 18px; padding: 12px; background-color: rgb(54, 69, 79); border-radius: 8px;" onmouseover="this.style.transform='translateX(5px)'" onmouseout="this.style.transform='translateX(0)'">
                    <span style="font-weight: bold; color: #ffffff; font-size: 20px;">Adjust Farming Practices</span>:
                    <ul style="margin-top: 10px; padding-left: 25px;">
                        <li style="margin-bottom: 8px; padding: 6px;">Space plants widely to improve airflow and reduce leaf wetness.</li>
                        <li style="margin-bottom: 8px; padding: 6px;">Rotate crops (3+ years) and avoid nightshade-family plants (e.g., tomatoes).</li>
                        <li style="margin-bottom: 8px; padding: 6px;">Apply <span style="font-weight: bold; color: #228b22;">balanced nitrogen fertilizer</span>—low nitrogen increases blight risk.</li>
                    </ul>
                </li>
                
                <li style="margin-bottom: 18px; padding: 12px; background-color: rgb(54, 69, 79); border-radius: 8px;" onmouseover="this.style.transform='translateX(5px)'" onmouseout="this.style.transform='translateX(0)'">
                    <span style="font-weight: bold; color: #ffffff; font-size: 20px;">Monitor & Spray Preventatively</span>:
                    <ul style="margin-top: 10px; padding-left: 25px;">
                        <li style="margin-bottom: 8px; padding: 6px;">Scout fields weekly after plants reach 12 inches tall.</li>
                        <li style="margin-bottom: 8px; padding: 6px;">Apply fungicides like <span style="font-weight: bold; color: #228b22;">fluopyram</span> (Luna Tranquility®) or <span style="font-weight: bold; color: #228b22;">chlorothalonil</span> before infections start.</li>
                    </ul>
                </li>
            </ol>

            <h3 style="font-size: 26px; color: #ffffff; margin: 30px 0 20px; padding: 10px 15px; text-align: center; background-color: rgba(0,0,0,0); border-radius: 8px;">
                Recommended Products
            </h3>            
            <div style="display: flex; justify-content: center; margin: 30px 0;">
                <table style="border: 4px solid #2e8b57; border-radius: 15px; border-collapse: separate; border-spacing: 0; width: 90%; box-shadow: 0 6px 12px rgba(0,0,0,0.15); overflow: hidden; font-family: 'Segoe UI', Arial, sans-serif;">
                    <tr style="background-color: #3cb371; color: white;">
                        <th style="padding: 15px 20px; text-align: center; border: 1px solid #2e8b57; border-bottom: 3px solid #2e8b57; font-weight: bold; font-size: 20px;">Product</th>
                        <th style="padding: 15px 20px; text-align: center; border: 1px solid #2e8b57; border-bottom: 3px solid #2e8b57; font-weight: bold; font-size: 20px;">Active Ingredient</th>
                        <th style="padding: 15px 20px; text-align: center; border: 1px solid #2e8b57; border-bottom: 3px solid #2e8b57; font-weight: bold; font-size: 20px;">Use Case</th>
                    </tr>
                    <tr style="background-color: #32de84;">
                        <td style="padding: 12px 20px; text-align: center; border: 1px solid #2e8b57; font-size: 18px; font-weight: 500;">Revus Top®</td>
                        <td style="padding: 12px 20px; text-align: center; border: 1px solid #2e8b57; font-size: 18px;">Mandipropamid</td>
                        <td style="padding: 12px 20px; text-align: left; border: 1px solid #2e8b57; font-size: 18px;">Early/late blight prevention</td>
                    </tr>
                    <tr style="background-color: #3cb371; ">
                        <td style="padding: 12px 20px; text-align: center; border: 1px solid #2e8b57; font-size: 18px; font-weight: 500;">Zineb + Hexaconazole</td>
                        <td style="padding: 12px 20px; text-align: center; border: 1px solid #2e8b57; font-size: 18px;">Zineb (68%)</td>
                        <td style="padding: 12px 20px; text-align: left; border: 1px solid #2e8b57; font-size: 18px;">Most effective field control</td>
                    </tr>
                    <tr style="background-color: #32de84; ">
                        <td style="padding: 12px 20px; text-align: center; border: 1px solid #2e8b57; font-size: 18px; font-weight: 500;">Copper Hydroxide</td>
                        <td style="padding: 12px 20px; text-align: center; border: 1px solid #2e8b57; font-size: 18px;">Copper</td>
                        <td style="padding: 12px 20px; text-align: left; border: 1px solid #2e8b57; font-size: 18px;">Organic-approved option</td>
                    </tr>
                    <tr style="background-color: #3cb371; ">
                        <td style="padding: 12px 20px; text-align: center; border: 1px solid #2e8b57; font-size: 18px; font-weight: 500;">Ranman Top®</td>
                        <td style="padding: 12px 20px; text-align: center; border: 1px solid #2e8b57; font-size: 18px;">Cyazofamid</td>
                        <td style="padding: 12px 20px; text-align: left; border: 1px solid #2e8b57; font-size: 18px;">Spore-killing during harvest</td>
                    </tr>
                </table>
            </div>

            <p style="font-size: 20px; text-align: center; margin: 30px 0; padding: 15px; background-color: rgba(0, 0, 0, 0); border-radius: 10px; border-left: 5px solid #2e8b57; font-weight: 500; line-height: 1.7; color: #ffffff; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                Act quickly—delay increases tuber infection risk. Focus on removing infected foliage first, then apply fungicides. For severe cases, prioritize saving tubers over foliage.
            </p>
        </div>
    </div>
</div>\n""" +
                "---System-Instruction---\n" +
                full_prompt
            )
            analysis_contents = [img_data, {"text": analysis_instruction}]
        else:
            analysis_instruction = (
                full_prompt +
                " Please provide the analysis in HTML format with a relevant title (using bold and italic tags) " +
                "and a detailed explanation. Use <ul>, <li>, and <br> tags for formatting as necessary."
            )
            analysis_contents = [{"text": analysis_instruction}]
        analysis_response = gemini_model.generate_content(analysis_contents)
        analysis_text = analysis_response.text.strip().split("```html")
        final_output = {
            "title": "Plant Analysis Result",
            "response": analysis_text[1][:-3] if "```html" in analysis_response.text.strip() else analysis_text[0]
        }
        print(f"-------------------------------- {type(analysis_text)}")
    else:
        final_output = {
            "title": "Not Plant-Related",
            "response": "I am an assistant to help out farmers and hobbyists gardeners with their plant/crop related queries. How's your green little buddy doing?"
        }

    save_chat_history(user_id, full_prompt, final_output)
    print(final_output)
    return jsonify(final_output)

@app.route("/")
def home():
    return "<h1>Hello World</h1>"

if __name__ == "__main__":
    app.run(port=2000, debug=True)
