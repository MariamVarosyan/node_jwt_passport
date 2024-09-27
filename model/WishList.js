module.exports = (sequelize, Sequelize) => {
    const WishList = sequelize.define("wish_list", {
        userId:{
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        productId:{
            type: Sequelize.INTEGER,
            primaryKey: true
        },
    });
    return WishList;
}
