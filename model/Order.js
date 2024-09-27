module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        count: Sequelize.INTEGER,
        total: Sequelize.INTEGER,
        product_name: Sequelize.STRING,

    });
    return Order;
}
