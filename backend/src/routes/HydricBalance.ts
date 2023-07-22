import * as express from 'express';
import * as hydricBalance from './controllers/HydricBalance'

export default class Auth {
	public path = '/hydricbalance';
	public router = express.Router();

	constructor() {
		this.initializeRoute();
	}

	public initializeRoute(): void {
		this.router.get(`${this.path}/find`, hydricBalance.find);
		this.router.post(`${this.path}/add`, hydricBalance.add);
	}
}
