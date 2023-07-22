import {Sequelize, ModelStatic, Model} from 'sequelize'
import {HydricBalance} from './HydricBalance'
import {MedicalAppoitment} from './MedicalAppointment'

export default class Database {
  private static instance: Database;
  private connection:Sequelize;
  public hydricBalance: ModelStatic<Model<any, any>>;
  public medicalAppointment: ModelStatic<Model<any, any>>;

  private constructor() {}

  public async init(): Promise<void> {
    if (!this.connection) {
      this.connection = new Sequelize(process.env.DATABASE_URI)
      try {
          await this.connection.authenticate();
          this._loadSchemas()
          console.log('Connection has been established successfully.');
      } catch (error) {
          console.error('Unable to connect to the database:', error);
      }
    }
  }

  private _loadSchemas() {
    this.hydricBalance = HydricBalance(this.connection)
    this.medicalAppointment = MedicalAppoitment(this.connection)

    this.connection.sync().then(() => {
      console.log('Book table created successfully!');
    }).catch((error) => {
      console.error('Unable to create table : ', error);
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
        Database.instance = new Database();
    }
    return Database.instance;
  }

  public getConnection() {
    return this.connection
  }

}
