module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: Sequelize.STRING,
        surname: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        emailToken:Sequelize.STRING,
        image:{
            type: Sequelize.STRING,
            defaultValue: 'user-icon.png'
        },
        isVerified: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        refreshToken:Sequelize.STRING,
        role:Sequelize.INTEGER
    });
    return User;
}

/**
 * 
 * role-ADMIN=2.MANAGER=1,USER=0
 */