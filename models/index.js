module.exports = db=> {
    const dbConfig = require("../config/db.config.js");
    const { Sequelize } = require("sequelize");
    const sequelize = new Sequelize(
        dbConfig.DB, 
        dbConfig.USER, 
        dbConfig.PASSWORD, 
        {   host: dbConfig.HOST, 
            dialect: dbConfig.dialect, 
            //operatorsAliases: false,
            define:{
                freezeTableName:true,
                //modelName: 'singularName'
            },
            pool:{
                max: dbConfig.pool.max,
                min: dbConfig.pool.min,
                require: dbConfig.pool.acquire,
                idle: dbConfig.pool.idle
            }
        }    
    );

    db.Sequelize = Sequelize;
    db.sequelize = sequelize
}