const { Sequelize } = require('sequelize');
require('dotenv').config()


const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });

const User = require("./User")(sequelize, Sequelize)
const Card = require("./Card")(sequelize, Sequelize)
const Category = require("./Category")(sequelize, Sequelize)
const Order = require("./Order")(sequelize, Sequelize)
const Product = require("./Product")(sequelize, Sequelize)
const ProductImage = require("./ProductImage")(sequelize, Sequelize)
const WishList = require("./WishList")(sequelize, Sequelize)

Product.belongsTo(Category, { onUpdate: "cascade", onDelete: "cascade" })
Product.belongsTo(User, { onUpdate: "cascade", onDelete: "cascade" })
ProductImage.belongsTo(Product, { onUpdate: "cascade", onDelete: "cascade" })
WishList.belongsTo(Product, { onUpdate: "cascade", onDelete: "cascade" })
WishList.belongsTo(User, { onUpdate: "cascade", onDelete: "cascade" })
Card.belongsTo(Product, { onUpdate: "cascade", onDelete: "cascade" })
Card.belongsTo(User, { onUpdate: "cascade", onDelete: "cascade" })
Order.belongsTo(Product)
Order.belongsTo(User)


User.hasMany(Product)
Product.hasMany(ProductImage)
Category.hasMany(Product)
User.hasMany(WishList)
Product.hasMany(WishList)
User.hasMany(Card)
Product.hasMany(Card)
User.hasMany(Order)
Product.hasMany(Order)

sequelize.sync()
module.exports = {
    User,
    sequelize,
    Category,
    Order,
    Card,
    Product,
    ProductImage,
    WishList
}