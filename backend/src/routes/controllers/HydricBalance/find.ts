import { z } from "zod";
import { NextFunction, Request, Response } from 'express';
import Database from '@database/index';
import {Op} from 'sequelize'
import {HydricsBalanceSchema} from '@database/HydricBalance';


export const find = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const {idNumber, socialNumber, startDate, endDate} = req.query;
    let response = [];
    let query = {}
    if(startDate && endDate){
        query = {
            date: {
                [Op.between]: [new Date(startDate?.toString()) ?? '', new Date(endDate?.toString()) ?? '']
            }
        }
    }
    if(idNumber) {
        query = {
            id_number: idNumber
        }
    }
    if(socialNumber) {
        query = {
            social_number: socialNumber
        }
    }
    const {count, rows} = await Database.getInstance().hydricBalance.findAndCountAll({
        where: query
    })
    const data = HydricsBalanceSchema.safeParse(rows);
    if (data.success) {
        response = data.data
    } else {
        console.log("Los datos no cumplen con el esquema");
    }
	res.json({data: response, count: count});
};
