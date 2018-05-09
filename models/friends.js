module.exports = function (sequelize, DataTypes) {
    var Friends = sequelize.define("Friend", {
        friend_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Friends.asssociate = function (models) {
        Friends.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Friends;
}