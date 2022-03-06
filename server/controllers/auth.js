const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// // Auth Controllers // //

//User Model
const User = require("../models/User");


// login function
exports.loginUser = (req, res) => {
  //try block to catch error and prevent server crashing
  try {
    const { phone, password } = req.body;

    // backend Validations
    if (!phone || !password)
      return res.status(400).json("Please enter all fields");

    //Check for existing user
    User.findOne({ phone })
      .then(user => {
        if (!user) return res.status(400).json("Phone not found");

        //Compare user's password
        bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) return res.status(400).json("Invalid password");

          //Sign a jwt token
          jwt.sign(
            { id: user._id },
            "waris",
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.status(200).json({
                token,
                user
              });
            }
          );
        });
      })
      .catch(err => res.status(500).json({ success: false, msg: "Failed, internal server error", err }))
  } catch (err) {
    return res.status(500).json({ msg: "Failed, internal server error", err })
  }
};

// register function
exports.registerUser = (req, res) => {
  //try block to catch error and prevent server crashing
  try {
    const { name, email, phone, password } = req.body;

    //Converting javascript date to human understandable
    const d = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const weeks = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
    const date = `${weeks[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()} ${d.getFullYear()}`;

    // backend validation
    if (!name || !email || !phone || !password)
      return res.status(400).json("Please enter all fields");
    if (phone.length !== 11)
      return res.status(400).json("Phone number should be 11 digits");
    if (password.length < 6)
      return res.status(400).json("Password should be up to six characters");

    //Check for existing user
    User.findOne({ phone }).then(user => {
      if (user) return res.status(400).json("Phone already exist");

      User.findOne({ email }).then(user => {
        if (user) return res.status(400).json("Email already exist");

        //Create a new user
        const newUser = new User({
          name,
          email,
          phone,
          password,
          registeredAt: date
        });

        //Hash the user's password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(firstUser => {
                //sign a jwt token
                jwt.sign(
                  { id: firstUser._id },
                  "waris",
                  { expiresIn: 3600 },
                  (err, token) => {
                    if (err) throw err;
                    User.findById(firstUser._id)
                      .select("-password")
                      .then(user =>
                        res.status(201).json({
                          token,
                          user
                        })
                      );
                  }
                );
              })
              .catch(err => res.status(500).json({ msg: "Failed, internal server error", err }));
          });
        });
      }).catch(err => res.status(500).json({ msg: "Failed, internal server error", err }));
    }).catch(err => res.status(500).json({ msg: "Failed, internal server error", err }));
  } catch (err) {
    return res.status(500).json({ msg: "Failed, internal server error", err })
  }
};
