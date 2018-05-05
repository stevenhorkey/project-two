module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userPassword: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return User;
  };