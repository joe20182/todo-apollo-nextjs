import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Todo {
    id: ID!
    text: String!
    status: Boolean!
  }

  type Query {
    todos: [Todo]
  }

  input TodoInput {
    text: String
    status: Int!
  }

  type Mutation {
    createTodo(input: TodoInput!): Todo
    updateTodo(id: ID!, input: TodoInput!): Todo
    deleteTodo(id: ID!): String
  }
`;
