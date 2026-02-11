const { DataTypes } = require("sequelize");
const {v4 : uuidv4} = require("uuid");

module.exports = (sequelize) => {
  const Item = sequelize.define("items", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    userId:{
        type: DataTypes.UUID,
        allowNull: false
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: true
    },
    category:{
      type: DataTypes.STRING,
      allowNull: true
    },
    lengthCm:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    widthCm:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    heightCm:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weightKg:{
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    imagepath:{
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
{
  timestamps: true
})

  return Item;
};