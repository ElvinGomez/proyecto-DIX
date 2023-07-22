import { z } from "zod";
import { Sequelize, DataTypes } from 'sequelize'

export const MedicalAppoitment = (connection: Sequelize) => connection.define('MedicalAppointment', {
    id_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    patient: {
      type: DataTypes.STRING,
      allowNull: false
    },
    specialty: {
      type: DataTypes.STRING,
      allowNull: false
    },
    doctor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false
    }
});

// Estructura del objeto
export const MedicalAppoitmentSchema = z.object({
  id_number: z.string().nonempty(),
  patient: z.string().nonempty(),
  specialty: z.string().nonempty(),
  doctor: z.string().nonempty(),
  reason: z.string().nonempty(),
});

export const MedicalAppoitmentsSchema = z.array(MedicalAppoitmentSchema)