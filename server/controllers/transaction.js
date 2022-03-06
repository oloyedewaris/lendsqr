const Transaction = require("../models/Transaction")
const User = require("../models/User")

//Converting javascript date to human understandable
const d = new Date();
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const weeks = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
const date = `${weeks[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()} ${d.getFullYear()}`;

// get a user transaction history
exports.getTransactions = (req, res) => {
  //try block to catch error and prevent server crashing
  try {
    Transaction.find({ user: req.params.userId })
      .populate("user")
      .populate("sender")
      .populate("receiver")
      .then(transaction => res.status(200).json({ success: true, transaction }))
      .catch(err => res.status(400).json({ success: false, err, msg: "cant get transaction" }))
  } catch (err) {
    return res.status(500).json({ msg: "Failed, internal server error", err })
  }

}

// user withdraw function
exports.withdraw = (req, res) => {
  //try block to catch error and prevent server crashing
  try {
    const { userId, details, amount } = req.body;

    if (!details || !amount)
      return res.status(400).json({ success: false, msg: "Please enter all field" })

    if (Number(amount) < 0)
      return res.status(400).json({ success: false, msg: "No negative number" })

    //Check if amount is greater than balance
    User.findById(userId)
      .then(user => {
        if (amount > user.balance)
          return res.status(400).json({ success: false, msg: "Insufficient balance" })

        User.findByIdAndUpdate(
          userId,
          {
            $inc: { balance: Number(`-${amount}`) }
          },
          { new: true, runValidators: true },
          (err, user) => {
            if (err) throw err;
            const newTransaction = new Transaction({
              user: user._id,
              type: "withdraw",
              service: null,
              details,
              amount,
              performedAt: date
            })
            newTransaction.save()
              .then(transaction => res.status(200).json({ success: true, user, transaction }))
              .catch(err => res.status(400).json({ success: false, err, msg: "cant save transaction" }))

          }
        )
      })
  } catch (err) {
    return res.status(500).json({ msg: "Failed, internal server error", err })
  }
}

// user transfer function
exports.transfer = (req, res) => {
  //try block to catch error and prevent server crashing
  try {
    const { userId, phone, details, amount } = req.body;

    //validate
    if (!details || !amount || !phone)
      return res.status(400).json({ success: false, msg: "Please enter all field" })

    if (Number(amount) < 0)
      return res.status(400).json({ success: false, msg: "No negative number" })

    User.findById(userId)
      .then(user => {
        if (amount > user.balance)
          return res.status(400).json({ success: false, msg: "Insufficient balance" })

        User.findOne({ phone })
          .then(user => {
            //check if the phone number does not exist
            if (!user)
              return res.status(400).json({ success: false, msg: "Phone not found" })
            User.findByIdAndUpdate(
              userId,
              { $inc: { balance: Number(`-${amount}`) } },
              { new: true },
              (err, sender) => {
                if (err) throw err;

                User.findOneAndUpdate(
                  { phone },
                  { $inc: { balance: amount } },
                  { new: true },
                  (err, receiver) => {
                    if (err) throw err;

                    const newTransaction = new Transaction({
                      user: sender._id,
                      type: "transfer",
                      service: null,
                      details,
                      amount,
                      sender: sender._id,
                      receiver: receiver._id,
                      performedAt: date
                    });

                    newTransaction.save()
                      .then(transaction =>
                        res.status(200).json({ success: true, sender, receiver, transaction })
                      ).catch(err => res.status(400).json({ success: false, err, msg: "cant save transaction" }));
                  }
                )
              }
            )

          })


      })


  } catch (err) {
    return res.status(500).json({ msg: "Failed, internal server error", err })
  }
}

// user perfoms services function
exports.services = (req, res) => {
  //try block to catch error and prevent server crashing
  try {
    const { userId, details, amount } = req.body;
    const service = req.query.type

    if (!details || !amount)
      return res.status(400).json({ success: false, msg: "Please enter all field" })

    if (Number(amount) < 0)
      return res.status(400).json({ success: false, msg: "No negative number" })

    User.findById(userId)
      .then(user => {
        if (amount > user.balance)
          return res.status(400).json({ success: false, msg: "Insufficient balance" })
        if (service === "pay_bill") {
          User.findByIdAndUpdate(
            userId,
            {
              $inc: { balance: Number(`-${amount}`) }
            },
            { new: true },
            (err, user) => {
              if (err) throw err;
              const newTransaction = new Transaction({
                user: user._id,
                type: "service",
                service: "pay_bills",
                details,
                amount,
                performedAt: date
              })
              newTransaction.save()
                .then(transaction => res.status(200).json({ success: true, user, transaction }))
                .catch(err => res.status(400).json({ success: false, err, msg: "cant save transaction" }))

            }
          )
        }

        // buy airtime
        else if (service === "buy_airtime") {
          User.findByIdAndUpdate(
            userId,
            {
              $inc: { balance: Number(`-${amount}`) }
            },
            { new: true },
            (err, user) => {
              if (err) throw err;
              const newTransaction = new Transaction({
                user: user._id,
                type: "service",
                service: "buy_airtime",
                details,
                amount,
                performedAt: date
              })
              newTransaction.save()
                .then(transaction => res.status(200).json({ success: true, user, transaction }))
                .catch(err => res.status(400).json({ success: false, err, msg: "cant save transaction" }))
            }
          )
        }

        // buy data
        else if (service === "buy_data") {
          User.findByIdAndUpdate(
            userId,
            {
              $inc: { balance: Number(`-${amount}`) }
            },
            { new: true },
            (err, user) => {
              if (err) throw err;
              const newTransaction = new Transaction({
                user: user._id,
                type: "service",
                service: "buy_data",
                details,
                amount,
                performedAt: date
              })
              newTransaction.save()
                .then(transaction => res.status(200).json({ success: true, user, transaction }))
                .catch(err => res.status(400).json({ success: false, err, msg: "cant save transaction" }))
            }
          )
        }

        //merchant payment 
        else if (service === "merchant_payment") {
          User.findByIdAndUpdate(
            userId,
            {
              $inc: { balance: Number(`-${amount}`) }
            },
            { new: true },
            (err, user) => {
              if (err) throw err;
              const newTransaction = new Transaction({
                user: user._id,
                type: "service",
                service: "merchant_payments",
                details,
                amount,
                performedAt: date
              })
              newTransaction.save()
                .then(transaction => res.status(200).json({ success: true, user, transaction }))
                .catch(err => res.status(400).json({ success: false, err, msg: "cant save transaction" }))
            }
          )
        }

        //query not found for else
        else {
          return res.status(400).json({ success: false, msg: "Query not identified" })
        }
      })

    // pay bill

  } catch (err) {
    return res.status(500).json({ msg: "Failed, internal server error", err })
  }
}

// user deposit function
exports.deposit = (req, res) => {
  //try block to catch error and prevent server crashing
  try {
    const { userId, details, amount } = req.body;

    //validation
    if (!details || !amount)
      return res.status(400).json({ success: false, msg: "Please enter all field" })

    if (Number(amount) < 0)
      return res.status(400).json({ success: false, msg: "No negative number" })

    User.findByIdAndUpdate(
      userId,
      {
        $inc: { balance: amount }
      },
      { new: true },
      (err, user) => {
        if (err) throw err;
        const newTransaction = new Transaction({
          user: userId,
          type: "deposit",
          service: null,
          details,
          amount,
          performedAt: date
        })
        newTransaction.save()
          .then(transaction => res.status(200).json({ success: true, user, transaction }))
          .catch(err => res.status(400).json({ success: false, err, msg: "cant save transaction" }))
      }
    )
  } catch (err) {
    return res.status(500).json({ msg: "Failed, internal server error", err })
  }
}