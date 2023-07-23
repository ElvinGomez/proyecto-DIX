import { NextFunction, Request, Response } from 'express';
import Database from '@database/index'

export const add = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const {
        social_number,
        id_number,
        patient,
        date,
        blood_pressure_systolic,
        blood_pressure_diastolic,
        blood_pressure_pulse,
        concentration,
        infusion,
        drainage,
        quality,
        balance,
        total_infusion,
        total_drainage,
        total_balance
    } = req.body;
    try {
        const dt = new Date(date)
        dt.setHours(0,0,0,0)
        const newRecord = Database.getInstance().hydricBalance.build({
            social_number,
            id_number,
            patient,
            date: dt,
            blood_pressure_systolic,
            blood_pressure_diastolic,
            blood_pressure_pulse,
            concentration,
            infusion,
            drainage,
            quality,
            balance,
            total_infusion,
            total_drainage,
            total_balance
        })
        await newRecord.save()
    } catch (error) {
        console.log("🚀 ~ file: add.ts:42 ~ add ~ error:", error)
    }
	res.end();
};
