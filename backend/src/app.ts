import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import nocache from 'nocache';
import express from 'express';
import Database from '@database/index'
import * as ApiResponse from '@response/index';
import errorMiddleware from '@middleware/error';
import { version } from '@utils/api.versions';


interface Controller {
	path: string;
	router: express.Router;
}

export default class App {
	public app: express.Application;
	private controllers: Controller[] = [];

	constructor(controllers: Controller[]) {
		// initialize configuration
		dotenv.config();

		this.app = express();

		this.controllers = controllers;

		this.connectToTheDatabase();
		this.initializeCors();
		this.initializeHelmet();
		this.initializeNoCache();
		this.initializeMiddleware();
		this.initializeControllers();
		this.initializeNotFoundPage();
		this.initializeErrorHandling();
	}

	public async listen(): Promise<void> {
		const port = process.env.PORT || 3000;

		this.app.listen(port, () => {
			console.log('🚀 ~ file: app.ts:57 ~ App ~ listen ~ process.env.NODE_ENV', process.env.NODE_ENV);
			console.log(`Express server listening on port ${port}`);
		});
	}

	private async connectToTheDatabase() {
		console.log('connecting to db');
		await Database.getInstance().init()
	}

	private initializeCors() {
		this.app.use(cors());
	}

	private initializeHelmet() {
		this.app.use(helmet());
	}

	private initializeNoCache() {
		this.app.use(nocache());
	}

	private initializeMiddleware() {
		this.app.use(express.json());
	}

	private initializeControllers() {
		this.app.get('/healthcheck', ({}, res) => {
			res.end('Ok.');
		});
		this.app.get(`/api/${version.v1}`, ({}, res) => {
			res.status(200).send('API works.');
		});
		this.controllers.forEach((controller) => {
			this.app.use(`/api/${version.v1}`, controller.router);
		});
	}

	private initializeNotFoundPage() {
		this.app.use((_, __, next) => {
			next(new ApiResponse.ApiError('NOT_FOUND'));
		});
	}

	private initializeErrorHandling() {
		this.app.use(errorMiddleware);
	}
}
