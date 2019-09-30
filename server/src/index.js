import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';

import models from './models';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const port = 4000;
(async () => {
  const app = express();
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
  app.get('/', (_, res) => res.send('slack clone'));

  const context = ({ req, res }) => ({
    req, res, models, user: { id: 1 },
  });

  const apolloServer = new ApolloServer({
    schema, context,
  });
  apolloServer.applyMiddleware({ app, cors: false });

  models.sequelize.sync({force: true}).then(() => {
    app.listen(port, () => {
      console.log(`express server started at port ${port}`);
    });
  });
})();
