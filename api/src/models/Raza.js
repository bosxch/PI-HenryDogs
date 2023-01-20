const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define('Raza', {
    
      id: {
        type: DataTypes.UUID,   
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true, 
        allowNull: false, 

      },
      name: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      heightMin: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      heightMax: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      weightMin: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      weightMax: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      life_span: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT, 
        allowNull: false,
      },
      created_in_dogs: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },

  
},
{timestamps : false} 
);
};
