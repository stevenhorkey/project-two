module.exports = function (sequelize, DataTypes) {
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
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        image: {
            type: DataTypes.STRING,
            defaultValue: 'https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png'
        }
    });

    
    User.associate = function (models) {
        User.hasMany(models.Goal, {
            onDelete: "cascade"
        })
        User.hasMany(models.Friend, {
            onDelete: "cascade"
        })
    }

    return User;
};