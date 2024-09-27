module.exports = (sequelize, Sequelize) => {
    const Card = sequelize.define("card", {
        count: Sequelize.INTEGER,
    });
    return Card;
}
