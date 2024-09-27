module.exports = (sequelize, Sequelize) => {
    const ProductImage = sequelize.define("product_image", {
        image: Sequelize.STRING
    });
    return ProductImage;
}
