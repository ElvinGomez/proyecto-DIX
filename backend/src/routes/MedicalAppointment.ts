import * as express from 'express';
import * as MedicalAppointment from './controllers/MedicalAppointment'

export default class Auth {
	public path = '/medical_appointment';
	public router = express.Router();

	constructor() {
		this.initializeRoute();
	}

	public initializeRoute(): void {
		this.router.post(`${this.path}/add`, MedicalAppointment.add);
	}
}
