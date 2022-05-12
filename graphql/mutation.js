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
