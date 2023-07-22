import { NextFunction, Request, Response } from 'express';
import Database from '@database/index'

export const add = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const {
        id_number,
        patient,
        specialty,
        doctor,
        reason
    } = req.body;
    try {
        const newRecord = Database.getInstance().medicalAppointment.build({
            id_number,
            patient,
            specialty,
            doctor,
            reason
        })
        await newRecord.save()
    } catch (error) {
        console.log("🚀 ~ file: add.ts:42 ~ add ~ error:", error)
    }
	res.end();
};
