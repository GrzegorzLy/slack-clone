import { Sequelize } from 'sequelize-typescript';
import path from 'path';

const sequelize = new Sequelize('slack', 'postgres', 'postgres', {
	dialect: 'postgres',
	repositoryMode: true,
	models: [ path.join(__dirname, '../modules/**/*.model.ts') ],
});

export default sequelize;
