'user strict';

require('dotenv').config();

const ENV         = process.env.ENV || "development";
const knexConfig  = require("./../../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const express     = require("express");

module.exports = function registerNewUser(entry){
  const insertNewUsername = (entry) => {
    knex('users').insert(entry)
    .then(() => {
        res.redirect(303, '/main');
    });
  };

  knex('users')
  .where({username: entry.username})
  .select()
  .then((result) => {
    if (result.length > 0) {
      res.redirect(303, '/')
    } else {
      insertNewUsername(entry);
    }
  });
};
