module.exports = (sequelize, DataTypes) => {
    const Multer = sequelize.define(
        'multer',
        {
            img : {
                type : DataTypes.STRING,
                allowNull : true
            },
            img2 : {
                type : DataTypes.STRING,
                allowNull : true
            }
        },
        {
            freezeTableName : true,
            timestamps : false,
            comment : 'multer tester'
        }
    );
    return Multer ; 
}