import { Sequelize } from 'sequelize-typescript';
import path from 'path';

const sequelize = new Sequelize(process.env.DATA_BASE!, process.env.DATA_BASE_LOGIN!, process.env.DATA_BASE_PASSWORD!, {
  dialect: 'postgres',
  repositoryMode: true,
  models: [path.join(__dirname, '../modules/**/*.model.ts')],
});

export default sequelize;
