'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    user_line_id: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};