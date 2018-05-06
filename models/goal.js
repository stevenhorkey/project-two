module.exports = function (sequelize, DataTypes) {
    var Goals = sequlize.define("goal", {
        goal_name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                len: [140]
            }
        },
        goal_description: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                len: [240]
            }
        },
        completed: {
            type: DataType.BOOLEAN,
            allowNull: true
        }
    });

    Post.associate = function (models) {
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Goals;
};