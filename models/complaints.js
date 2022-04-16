module.exports = (sequelize, type) =>{
	return sequelize.define('complaints', {
		  id:{
            type:type.INTEGER,
            primaryKey: true,
            autoIncrement: true,            
        },
        reason_id:{
        	type: type.INTEGER,
        	allowNull:false
        },
        complaint_description:{
            type: type.STRING(500),
            allowNull:false
        },
        creator_user_id:{
        	type: type.INTEGER,
        	allowNull:false
        },
        reported_user_id:{
        	type: type.INTEGER,
              	allowNull:false
        },
        admin_user_id:{
        	type: type.INTEGER,
        	allowNull:false        
	}},
	{
                timestamps: false
        });

}