import { gql } from "@apollo/client";

export const CREATE_TODO = gql`
  mutation ($input: TodoInput!) {
    createTodo(input: $input) {
      id
      text
      status
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation ($id: ID!, $input: TodoInput!) {
    updateTodo(id: $id, input: $input) {
      id
      text
      status
    }
  }
`;

export const DELETE_TODO = gql`
  mutation ($id: ID!) {
    deleteTodo(id: $id)
  }
`;
