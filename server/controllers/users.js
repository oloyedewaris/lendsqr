const bcrypt = require("bcryptjs");

//User Model
const User = require("../models/User");

// // Users Controllers // //

exports.settings = (req, res) => {
  const userId = req.params.id;
  const Email = req.body.email;
  const Name = req.body.name;
  const Bio = req.body.bio;
  const Password = req.body.password;
  const NewPassword = req.body.newPassword;

  if (!Password && !Email && !Name && !Bio) {
    return res.status(400).json("Nothing to update");
  } else if (!Password) {
    return res.status(400).json("No Password");
  } else if (!Email && !Name && !Bio && !NewPassword) {
    return res.status(400).json("Please complete all fields");
  }

  if (NewPassword && NewPassword.length < 6) {
    return res.status(400).json("Password should be at least six characters");
  }

  try {
    if (req.query.type === "dataChange") {
      //Compare password before update settings
      bcrypt.compare(Password, req.user.password).then(isMatch => {
        if (!isMatch) {
          return res.status(400).json("Invalid password");
        } else {
          if (Email) {
            //Check for existing email
            User.findOne({ email: Email }).then(user => {
              if (user) {
                return res.status(400).json("Email already used");
              } else {
                //Update if doesnt exist before
                User.findByIdAndUpdate(
                  userId,
                  {
                    $set: {
                      email: Email
                    }
                  },
                  { new: true, upsert: true },
                  err => {
                    if (err) throw err;
                    return User.findById(userId)
                      .select("-password")
                      .then(user => res.json(user))
                      .catch(err => res.status(404).json(err));
                  }
                );
              }
            });
          }

          if (Name) {
            //To change all previous posts

            //Update user names
            User.findByIdAndUpdate(
              userId,
              {
                $set: {
                  name: Name
                }
              },
              { new: true, upsert: true },
              err => {
                if (err) throw err;
                return User.findById(userId)
                  .select("-password")
                  .then(user => res.json(user))
                  .catch(err => res.status(404).json(err));
              }
            );
          }

          if (Bio) {
            User.findByIdAndUpdate(
              userId,
              {
                $set: {
                  bio: Bio
                }
              },
              { new: true, upsert: true },
              err => {
                if (err) throw err;
                return User.findById(userId)
                  .select("-password")
                  .then(user => res.json(user))
                  .catch(err => res.status(404).json(err));
              }
            );
          }
        }
      });

      if (!userId) {
        return res.status(404).json({ message: "User not found." });
      }
    } else if (req.query.type === "passwordChange") {
      bcrypt.compare(Password, req.user.password).then(isMatch => {
        if (!isMatch) {
          return res.status(400).json("Invalid password");
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(NewPassword, salt, (err, hash) => {
              if (err) throw err;
              // newPassword = hash;
              User.findByIdAndUpdate(
                userId,
                {
                  $set: {
                    password: hash
                  }
                },
                { new: true, upsert: true },
                err => {
                  if (err) throw err;
                  return User.findById(userId)
                    .select("-password")
                    .then(user => res.json(user))
                    .catch(err => res.status(404).json(err));
                }
              );
            });
          });
        }
      });
    }
  } catch (err) {
    return res.status(500).json("Internal server error");
  }
};
