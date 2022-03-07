module.exports = (sequelize, type) => {
    return sequelize.define('profile_pictures',{
        id:{
            type: type.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        pp_name:{
            type: type.STRING(10),
            allowNull:false
        },pp_data:{
            type: type.BLOB("medium"),
        }
    },
    {
        timestamps: false
    });
}
