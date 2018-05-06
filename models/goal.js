module.exports = function (sequelize, DataTypes) {
    var Goal = sequelize.define("Goal", {
        goal_name: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [140]
            }
        },
        goal_description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [240]
            }
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    });

    Goal.associate = function (models) {
        Goal.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Goal;
};