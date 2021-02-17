/**
 * 
 * donationController object holds the methods to make sql queries re: donations
 * 
 */

const db = require("../models/databaseModel");

const donationController = {};

donationController.getDonations = (req, res, next) => {
  const allDonations = 'SELECT sum(amount) FROM donations';
  db.query(allDonations)
    .then((data) => {
        res.locals.donations = data.rows[0].sum;
        console.log('this is res.locals:',res.locals.donations);
        return next();
    })
    .catch((err) => {
        next(err);
    }); 
};

// TO BE CONTINUED 
donationController.makeDonation = (req, res, next) => {
  // destructor request body
  const { donations, members } = req.body

  // test if request would like to add user
  if (members) {
    const { user_name, password } = members;
    const inputUser = "INSERT INTO users (user_name, password) VALUES ($1, $2) RETURNING *";
    // query DB passing in user_name and password as variables and storing in res.locals
    db.query(inputUser,[user_name, password])
      .then((data) => res.locals.user = data.rows)
      .catch((err) => next(err))
  }

  // post donation to DB
  const {nameInput, donationAmount, creditCard, phone, date, email} = donations
  const inputDonation = "INSERT INTO donations (nameInput, donationAmount, creditCard, phone, date, email) VALUES ()"
}

module.exports = donationController;