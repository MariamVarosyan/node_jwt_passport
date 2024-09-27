module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        name: Sequelize.STRING,
        count: Sequelize.INTEGER,
        price: Sequelize.DOUBLE,
        description: Sequelize.STRING
    });
    return Product;
}
