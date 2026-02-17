const { DataTypes } = require("sequelize");
const {v4 : uuidv4} = require("uuid");

module.exports = (sequelize) => {
  const Box = sequelize.define("boxes", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId:{
        type: DataTypes.UUID,
        allowNull: false
    },
    code:{
      type: DataTypes.STRING(10),
      allowNull: true
    },
    labelType:{
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
    maxWeightKg:{
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    location:{
      type: DataTypes.STRING,
      allowNull: true
    },
    note:{
      type: DataTypes.TEXT,
      allowNull: true
    },
    status:{
      type: DataTypes.STRING,
      allowNull:true
    }
  },
{
  timestamps: true
})
  Box.associate = (models) => {
    Box.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  }
  return Box;
};