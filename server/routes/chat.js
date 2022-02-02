const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const ChatApplication = require("../models/ChatApplication");
const MessagesSchema = require("../models/Messages");
const { findOneAndUpdate } = require("../models/Messages");

//admin registration
router.post(
  "/",
  [check("phone_number", "Please provide phone number").isMobilePhone()],
  [check("email_address", "Please provide email address").isEmail()],
  [
    check(
      "password",
      "Please provide a password 6 charecter long password"
    ).isLength({ min: 6 }), //.exists(),
  ],
  async (req, res) => {
    const { phone_number, email_address, password } = req.body;
    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    } else {
      try {
        admin = new ChatApplication({
          phone_number,
          email_address,
          password,
        });
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(password, salt);

        await admin.save();

        const payload = {
          ChatApplication: {
            id: admin.id,
          },
        };
        jwt.sign(
          payload,
          process.env.SECRET,
          {
            expiresIn: 3600,
          },
          (err, token) => {
            if (err) throw err;

            res.send({ token });
          }
        );
      } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
      }
    }
  }
);

//admin login
router.post(
  "/admin_login",

  [check("phone_number", "Please provide phone number").isMobilePhone()],
  [
    check(
      "password",
      "Please provide a password 6 charecter long password"
    ).isLength({ min: 6 }), //.exists(),
  ],

  async (req, res) => {
    const { phone_number, password } = req.body;
    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    } else {
      try {
        let admin = await ChatApplication.findOne({ phone_number });
        if (!admin) {
          return res
            .status(400)
            .json({ error: [{ msg: "invalid credntials" }] });
        }
        console.log("85", res.error);
        const match = await bcrypt.compare(password, admin.password);

        if (!match) {
          return res
            .status(400)
            .json({ error: [{ msg: "invalid credntials" }] });
        }

        const payload = {
          ChatApplication: {
            id: admin.id,
          },
        };
        console.log(payload);
        jwt.sign(
          payload,
          process.env.SECRET,
          {
            expiresIn: 360000,
          },
          (err, token) => {
            if (err) throw err;
            res.send({ token, ChatApplication });
            // res.json({token,user});
            console.log(token);
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    }
  }
);

//forgot password
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
router.post(
  "/forgotPassword",
  [check("email_address", "Please provide a valid email").isEmail()],
  async (req, res) => {
    //console.log(req.body);
    const { email_address } = req.body;

    const errors = validationResult(req);
    //console.log(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    } else {
      let user = await ChatApplication.findOne({ email_address });
      if (!user) {
        return res
          .status(400)
          .json({ error: [{ msg: "E-mail address is invalid" }] });
      }
      var passwordId = Math.random().toString(36).slice(-8);
      randomNumber = passwordId;
      console.log(randomNumber);

      try {
        const msg = {
          to: req.body.email_address, // Change to your recipient
          from: "tridetyencore@gmail.com", // Change to your verified sender
          subject: "Chat Application Password Updated Sucessfully",
          // text: `Hi, <br/> Your Password has been updated and that password is ${randomNumber}. <br/> So, now you will login to system with the updated password.`,
          html: `Hi, <br/> Your Password has been updated and that password is <strong> ${randomNumber} </strong> <br/> So, now you will login to system with the updated password. <br/><br/> Thanks,<br/>Chat Application Team`,
        };

        sgMail.send(msg);
        const salt = await bcrypt.genSalt(10);
        randomNumber = await bcrypt.hash(randomNumber, salt);
        console.log(randomNumber);
        user = await ChatApplication.findOneAndUpdate(
          { email_address: req.body.email_address },
          { $set: { password: randomNumber } },
          { new: true }
        );
        res.json(user);
        console.log(user);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
      }
    }
  }
);

// Pull all messages on Admin Page
//Add Auth middleware at final stage for security of data
router.get("/getMessages", async (req, res) => {
  try {
    let allMessages = await MessagesSchema.find({});
    res.json(allMessages).status(200);
  } catch (error) {
    res.json(error.message).status(500);
  }
});

// Pull messages of normal user for chatting with admin
// router.get("/getMessagesUser", async (req, res) => {
//   try {
//     let userMessages = await MessagesSchema.findOne({
//       phone_number: req.body.phone_number,
//     });
//     res.json(userMessages).status(200);
//   } catch (error) {
//     res.json(error.message).status(500);
//   }
// });

router.get("/getMessagesUser", async (req, res) => {
  try {
    const userMessages = await MessagesSchema.find();
    console.log(userMessages);
    res.json(userMessages);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ msg: error });
  }
});

//Multer

router.post(
  "/user_messages",
  [
    check("phone_number", "Please provide your phone number").isMobilePhone(),

    check("messages", "Please provide your message").not().isEmpty(),
  ],
  async (req, res) => {
    console.log(req.body);
    const { phone_number, messages } = req.body;
    const errors = validationResult(req);
    // console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    } else {
      // Is user chat with provided mobile number present in database
      let user = await MessagesSchema.findOne({ phone_number: phone_number });
      // If no message was sent warlier, a new document with new mobile number will be created here
      if (!user) {
        // New Message
        console.log("New Chat Create");
        let data = new MessagesSchema({
          phone_number: phone_number,
          chat: [
            {
              messages: messages,
              isAdmin: req.body.phone_number == 9145530022 ? true : false,
            },
          ],
        });
        data = await data.save();
        res.json(data);
        console.log("88", data);
      } else {
        data = await MessagesSchema.findOneAndUpdate(
          { phone_number: phone_number },
          {
            $push: {
              chat: {
                messages: messages,
                isAdmin: req.body.phone_number == 9145530022 ? true : false,
              },
            },
          },
          { new: true }
        );
      }
      res.json(data);
      console.log(data);
    }
  }
);

router.put(
  "/admin_reply",
  [
    check("phone_number", "Please provide your phone number").isMobilePhone(),

    check("messages", "Please provide your message").not().isEmpty(),
  ],
  async (req, res) => {
    console.log(req.body);
    const { phone_number, messages } = req.body;
    const errors = validationResult(req);
    // console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    } else {
      let reply = await MessagesSchema.findOneAndUpdate(
        {
          phone_number: phone_number,
        },
        {
          $push: {
            chat: {
              messages: messages,
              isAdmin: true,
            },
          },
        },
        { new: true }
      );
    }
  }
);

module.exports = router;
