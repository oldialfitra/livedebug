const Account = require('../models/account');

class AccountController {
  static findAccounts(req, res) {
    console.log(req.params, 'masuk ke account')
    Account.findOne({ accountNumber: req.params.accountNumber })
      .populate('user')
      .then(account => {
        res.status(200).json(account);
      })
      .catch(err => {
        res.status(500).json(err);
      })
  }

  static newAccount(req, res) {
    console.log(req.body, 'new account')
    let acc = null;

    if (req.body.hasOwnProperty('balance')) {
      console.log('masuk ke if')
      acc = {
        balance: req.body.balance,
        userId: req.user._id
      }
    } else {
      acc = {
        userId: req.user._id
      }
    }

    Account
      .create({
        balance: acc.balance,
        userId: acc.userId
      })
      .then(account => {
        console.log(account, 'then')
        res.status(201).json(account);
      })
      .catch(err => {
        console.log(err, 'err')
        res.status(500).json(err);
      })
  }

  static remove(req, res) {
    Account
      .deleteOne({
        accountNumber: req.params.accountNumber
      })
      .then(deleted => {
        res.status(200).json(deleted);
      })
      .catch(err => {
        res.status(500).json(err);
      })
  }

}

module.exports = AccountController
