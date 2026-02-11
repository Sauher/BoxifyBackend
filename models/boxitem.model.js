const { DataTypes } = require("sequelize");
const {v4 : uuidv4} = require("uuid");

module.exports = (sequelize) => {
  const Boxitem = sequelize.define("box_items", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    boxId:{
        type: DataTypes.UUID,
        allowNull: false
    },
    itemId:{
        type: DataTypes.UUID,
        allowNull: false
    },
    quantity:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  },
{
  timestamps: true
})

  return Boxitem;
};