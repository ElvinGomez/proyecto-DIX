import { z } from "zod";
import { Sequelize, DataTypes } from 'sequelize'

export const HydricBalance = (connection: Sequelize) => connection.define('HydricBalance', {
    social_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    patient: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    blood_pressure_systolic: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    blood_pressure_diastolic: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    blood_pressure_pulse: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    concentration: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    infusion: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    drainage: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
    },
    quality: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    balance: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
    },
    total_infusion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_drainage: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_balance: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

// Estructura del objeto
export const HydricBalanceSchema = z.object({
  social_number: z.string().nonempty(),
  id_number: z.string().nonempty(),
  patient: z.string().nonempty(),
  date: z.date(),
  blood_pressure_systolic: z.number().int().nullable(),
  blood_pressure_diastolic: z.number().int().nullable(),
  blood_pressure_pulse: z.number().int().nullable(),
  concentration: z.array(z.string().nonempty()).nonempty(),
  infusion: z.array(z.string().nonempty()).nonempty(),
  drainage: z.array(z.number().int()).nonempty(),
  quality: z.array(z.string().nonempty()).nonempty(),
  balance: z.array(z.number().int()).nonempty(),
  total_infusion: z.number().int(),
  total_drainage: z.number().int(),
  total_balance: z.number().int(),
});

export const HydricsBalanceSchema = z.array(HydricBalanceSchema)