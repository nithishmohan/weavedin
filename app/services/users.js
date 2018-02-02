'use strict'

const UserActions= require("../models/user_actions").Model

exports.getActivites = (input, userId) => {
  if(userId)
    return UserActions.getAllActivites(input)
  else
    return UserActions.getAllUserActivites(input)

}