'use strict';

import { graphqlLambda, graphiqlLambda } from 'graphql-server-lambda';
import { schema } from '../graphql';

export const graphql = graphqlLambda({
  schema: schema,
  logFunction: console.log,
  debug: true
});

export const graphiql = graphiqlLambda({
    endpointURL: '/dev/graphql'
});
