import { Typography } from "@material-tailwind/react";
import firstCardImg from "../../../assets/images/firstcardimg.png"

export function ContentSection16() {
    return (
        <section className="p-8">
            <div className="mx-auto max-w-screen-md">
                <img
                    src={firstCardImg}
                    alt="team work"
                    className="mb-4 h-[28rem] w-full rounded-xl object-cover"
                />
                <Typography
                    variant="small"
                    className="font-medium !text-blue-500"
                >
                    #blog #post #greenpulse
                </Typography>
                <Typography
                    variant="h2"
                    color="blue-gray"
                    className="my-4 font-white text-white text-4xl !leading-snug"
                >
                    TThe true impact of plant diseases – A BSPP blog post written by Dr Eric Boa
                    6th October 2016

                </Typography>
                <Typography className="font-normal !text-gray-500">
                    We take it for granted that major plant diseases – and insect pests for that matter – have a significant impact. But what does ‘significant’ mean and how do you measure impact?
                    <br />
                    <br />
                    The most common and simplest measure is to give a percentage reduction in production. Common, yet not always as helpful as it sounds. First, there is the challenge of extrapolating from trials, where plants are deliberately infected or exposed to inoculum (re photo from Kenya). Second, the full impact of a plant disease should consider value of losses and the cost of control measures (re photo of potato from Syria). Sadly, the quality of available data is variable, patchy and often missing, particularly for smallholders, who produce the majority of the world’s food.

                    A few years back late b,light attacked the tomatoes in my London suburban garden. All five plants died sans tomatoes. It was a bad year for late blight, though the more alert growers will have sprayed fungicides and some will have escaped infection. So though it’s true to say that late blight can cause 100% losses the real production losses are much less.

                    <br />
                    <br />
                    CIP, the international research centre with an historical mandate for potato, estimates 15% production losses each year due to late blight. USAblight (a national project on lb on potato and tomato) says that (annual) global losses ‘exceed US$6.7 billion’. Knowing the financial costs of a plant disease tells you much more about its impact. It also makes for cogent research proposals, as a US colleague explained. A proposal to study a sugarcane disease was magically transformed when my friend and collaborators said they aimed to save industry tens of millions of dollars. Reducing losses by 3% sounded much tamer. They got the grant.

The economic costs of late blight have been estimated from fungicide sales in the US and Europe, elsewhere less reliably. There still seems to be much wagging of wet fingers in the air when estimating production losses and especially the economic costs of plant diseases to farmers. When market prices for potatoes are high, the loss of 15% production may not matter so much. When farmers in the UK were being paid around £60 per tonne for wheat, the marginal cost of spraying against aphids (which transmit viruses) rose hugely. You were damned if you sprayed, making little or no profit, and under greater risk from disease if you didn’t, tipping break-even into a loss.

Each year the World Health Organisation says how many people die from malaria and other major human diseases. I assume they compute the number from data supplied by Ministries of Health around the world. Try asking Ministries of Agriculture for similar data on plant disease losses. Indeed, it’s difficult to see who is coordinating such data and even asking for such information. FAO? World Bank? Good data do exist on the impact of plant diseases, but it is widely dispersed and difficult to find. Which makes a study we carried out in Bolivia, led by Jeff Bentley, of unusual interest.

                </Typography>
            </div>
        </section>
    );
}

export default ContentSection16;