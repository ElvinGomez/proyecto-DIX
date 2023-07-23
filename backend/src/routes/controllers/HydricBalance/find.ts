import { NextFunction, Request, Response } from 'express';
import Database from '@database/index';
import {Op} from 'sequelize'
import {HydricsBalanceSchema} from '@database/HydricBalance';


export const find = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const {idNumber, socialNumber, startDate, endDate} = req.query;
    let response = [];
    let query = {}
    if(startDate && endDate){
        const _startDate = new Date(startDate?.toString())

        const _endDate = new Date(endDate?.toString())
        _endDate.setDate(_endDate.getDate() + 1)
        query = {
            date: {
                [Op.and]: {
                    [Op.gte]: _startDate ?? '',
                    [Op.lte]: _endDate ?? ''
                }
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
