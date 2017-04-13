'use strict';

import { graphqlLambda } from 'graphql-server-lambda';
import { schema } from '../graphql';

export const graphql = graphqlLambda({
  schema: schema,
  logFunction: console.log,
  debug: true
});
