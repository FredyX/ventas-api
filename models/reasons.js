module.exports = (sequelize, type) => {
	return sequelize.define('reasons', {
		id:{
			type: type.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		reason_name:{
			type: type.STRING(50),
			allowNull: false
		},
		reason_description:{
			type: type.STRING(500),
			allowNull:false
		}
	},
	{timestamps: false});
}