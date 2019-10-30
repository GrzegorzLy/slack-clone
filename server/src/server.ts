import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';

import db from './db';
import services from './services';
import refreshTokenMiddleware from './auth/refreshToken';
import { tradeTokenForUser } from './auth/utils';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './modules/**/*.graphql')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './modules/**/*.resolver.ts')));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const port = process.env.PORT || 3000;
(async () => {
  const app = express();
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(
    cors({
      origin: '*',
      credentials: true,
    }),
  );

  app.get('/', (_, res) => res.send('server is running'));
  app.post('/refresh_token', refreshTokenMiddleware(services));

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => {
      return {
        req,
        res,
        services,
        user: tradeTokenForUser(req),
      };
    },
  });
  apolloServer.applyMiddleware({ app, cors: false });

  db.sync().then(() => {
    app.listen(port, () => {
      console.log(`express server started at port ${port}`);
    });
  });
})();
