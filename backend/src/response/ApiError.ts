const ERROR_CODE = {
	NOT_FOUND: {
		code: 404,
		status: 404,
		name: 'NOT_FOUND',
		message: 'Page not found',
	},
	INTERNAL_SERVER_ERROR: {
		code: 800,
		status: 500,
		name: 'INTERNAL_SERVER_ERROR',
		message: 'Something went wrong',
	},
	INVALID_REQUEST: {
		code: 800,
		status: 400,
		name: 'INVALID_REQUEST',
		message: 'The request was invalid',
	},
	CLIENT_UNAUTHORIZED: {
		code: 801,
		status: 401,
		name: 'CLIENT_UNAUTHORIZED',
		message: 'The client is not authorized',
	},
	RATE_LIMIT: {
		code: 802,
		status: 429,
		name: 'RATE_LIMIT',
		message: 'To many requests',
	},
	NOT_EXIST: {
		code: 804,
		status: 404,
		name: 'NOT_EXIST',
		message: 'No result',
	},
};

type Errors = 'NOT_FOUND' | 'INTERNAL_SERVER_ERROR' | 'INVALID_REQUEST' | 'CLIENT_UNAUTHORIZED' | 'RATE_LIMIT' | 'NOT_EXIST';

export class ApiError extends Error {
	public status: number;
	public code: number;
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	constructor(name: Errors = 'INTERNAL_SERVER_ERROR', ...params: any) {
		super(...params);
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ApiError);
		}
		this.code = ERROR_CODE[name].code || ERROR_CODE['INTERNAL_SERVER_ERROR'].code;
		this.status = ERROR_CODE[name].status || ERROR_CODE['INTERNAL_SERVER_ERROR'].status;
		this.name = ERROR_CODE[name].name || ERROR_CODE['INTERNAL_SERVER_ERROR'].name;
		this.message = ERROR_CODE[name].message || ERROR_CODE['INTERNAL_SERVER_ERROR'].message;
	}
}
