const { DataTypes, Model } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

class Temperamento extends Model {}

module.exports = (sequelize) => {
  // defino el modelo
  return Temperamento.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, //Tipo de Id unico
        allowNull:false, //Datos que no pueden ser nulos  
        primaryKey: true, // Seteada como clave primaria
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize, modelName: "Temperamento" }
  );
};

//Model es otra forma de iniciar las base de datos con sequelize, no cambia nada solo el formato
//Queda como model name Temperamento, averiguar por que desp le agrega "s" --> RESUELTO: Sequelize siempre pluraliza las tablas
