const { default: mongoose } = require("mongoose");
const keys = require('../config/keys');
const sgMail = require('@sendgrid/mail');
const ensureAuth = require("../middleware/ensureAuth");
module.exports=(app)=>{
    const User=mongoose.model("users");
    const bcrypt=require('bcryptjs');
    app.post("/api/sign-up", async (req, res) => {
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email });
    
      if (existingUser) {
        // If the user exists but is not verified, re-send OTP.
        if (!existingUser.verified) {
          const otp = Math.floor(100000 + Math.random() * 900000);
          req.session.otp = otp;
          req.session.email = email;
          sgMail.setApiKey(keys.sendGridKey);
          const msg = {
            to: email,
            from: process.env.SENDGRID_VERIFIED_EMAIL || "primoel968@proton.me",
            subject: "Your OTP for Pulse Plant",
            text: `Your OTP is: ${otp}`,
            html: `<strong>Your OTP: ${otp}</strong>`,
          };
          try {
            await sgMail.send(msg);
            console.log("Email sent with OTP:", otp);
            return res.send({ message: true });
          } catch (error) {
            console.error(error);
            return res.status(500).send({ message: "Error sending OTP email" });
          }
        }
        // If user exists and is verified, do not allow duplicate sign-up.
        return res.send({ message: false });
      }
    
      // If user doesn't exist, create new user with hashed password.
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, verified: false });
        await newUser.save();
    
        // Generate OTP and send it.
        const otp = Math.floor(100000 + Math.random() * 900000);
        req.session.otp = otp;
        req.session.email = email;
        sgMail.setApiKey(keys.sendGridKey);
        const msg = {
          to: email,
          from: process.env.SENDGRID_VERIFIED_EMAIL || "primoel968@proton.me",
          subject: "Your OTP for Pulse Plant",
          text: `Your OTP is: ${otp}`,
          html: `<strong>Your OTP: ${otp}</strong>`,
        };
        await sgMail.send(msg);
        console.log("Email sent with OTP:", otp);
        return res.send({ message: true });
      } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error creating user" });
      }
    });
    

app.post("/api/verify-otp", async (req, res) => {
  console.log("Verify OTP request recieved");
  console.log(req.body)
    const { otp } = req.body;
    console.log("User otp recieved :",otp)
    console.log(`session email ${req.session.email} , session otp ${req.session.otp}y`)
    if (!req.session.otp || !req.session.email) {
      return res.status(400).send({ message: "OTP expired or invalid" });
    }
  
    if (req.session.otp !== parseInt(otp)) {
      return res.status(400).send({ message: "Incorrect OTP" });
    }
  
    try {
      const user = await User.findOneAndUpdate(
        { email: req.session.email },
        { verified: true },
        { new: true }
      );
      if (!user) {
        return res.status(400).send({ message: "User not found" });
      }
      req.logIn(user, (err) => {
        if (err) return next(err);
  
        req.session.otp = null;
        req.session.email = null;
  
        res.send({ message: true, user });
      });
    } catch (error) {
      console.error("Error during OTP verification:", error);
      res.status(500).send({ message: "Verification failed" });
    }  });
  
  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return res.status(500).json({ message: "Server error"+err });
      if (!user) return res.status(400).json({ message: info.message });
  
      req.logIn(user, (err) => {
        if (err) return res.status(500).json({ message: "Login error" });
        res.json({ message: true, user });
      });
    })(req, res, next);
  });
const passport=require("passport")
app.get('/auth/google',passport.authenticate('google',{
    scope:['profile','email']
}));

app.get('/auth/google/callback',passport.authenticate('google'),
(req, res) => {
    res.redirect(`${keys.client_url}/home`);
  });
app.get('/api/current_user',(req,res)=>{
    console.log("Accessing current user request recieved",req.user);
    res.send(req.user);
}
)
app.get("/check-session", (req, res) => {
    console.log("Session data:", req.session);
    res.send(req.session);
});

app.get("/api/logout", (req, res, next) => {
  req.logout((err) => {
      if (err) {
          return next(err); // Pass error to Express error handler
      }
      console.log("logout successfull");
      res.send({ message: true });
  });
});

}
