import graphql from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers'

const typeDefs = `
type Todo {
  id: ID! # the ! means that every author object _must_ have an id
  text: String
  checked: Boolean,
  createdAt: Float,
  updatedAt: Float
}

# the schema allows the following query:
type Query {
  todos: [Todo]
}

input CreateTodoInput {
  text: String
}

input UpdateTodoInput {
  id: ID,
  text: String,
  checked: Boolean
}

# this schema allows the following mutation:
type Mutation {
  createTodo (
    input: CreateTodoInput
  ): Todo

  updateTodo (
    input: UpdateTodoInput
  ): Todo
}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: Query
  mutation: Mutation
}
`;

export const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});
