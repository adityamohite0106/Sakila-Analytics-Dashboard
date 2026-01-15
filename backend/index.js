import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import dotenv from 'dotenv';
import schema from './schema.js';
import resolvers from './graphql/resolvers.js';

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 4000;

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}/graphql`);
});