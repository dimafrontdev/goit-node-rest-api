import { DataTypes } from 'sequelize';

import { sequelize } from '../Sequelize.js';

const User = sequelize.define(
  'User',
  {
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    subscription: {
      type: DataTypes.ENUM,
      values: ['starter', 'pro', 'business'],
      defaultValue: 'starter',
    },
    avatarURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    token: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    tableName: 'users',
    timestamps: false,
  }
);

await User.sync({ alter: true });

export default User;
