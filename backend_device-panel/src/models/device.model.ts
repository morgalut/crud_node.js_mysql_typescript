// src/models/device.model.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class Device extends Model {
  public id!: number;
  public deviceName!: string;
  public serialNumber!: string;
  public creationDate!: Date;
}

Device.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    deviceName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creationDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'devices',
    timestamps: false,
  }
);

export default Device;
