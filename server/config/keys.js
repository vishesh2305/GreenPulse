require("dotenv").config();
module.exports={
    mongo_url:process.env.MONGO_URL,
    googleClientId:process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.CALLBACKURL,
    sendGridKey:process.env.SEND_GRID_KEY,
    client_url:process.env.CLIENT_URL,
    server_url:process.env.SERVER_URL
}