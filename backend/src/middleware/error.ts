import * as ApiResponse from '@response/index';
import { Request, Response, NextFunction } from 'express';

export default function errorMiddleware(error: ApiResponse.ApiError, {}: Request, res: Response, {}: NextFunction): any {
	console.log('🚀 ~ file: error.middleware.ts ~ line 5 ~ errorMiddleware ~ error', error);
	if (error instanceof ApiResponse.ApiError) {
		res.statusMessage = error.message;
	} else {
		error = new ApiResponse.ApiError('INTERNAL_SERVER_ERROR');
	}
	if (error.code === 60203 || error.code === 20429) error = new ApiResponse.ApiError('RATE_LIMIT');
	res.status(error.code).json({ code: error.code, name: error.name, message: error.message });
}