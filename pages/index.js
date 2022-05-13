import { useState } from "react";
import Head from "next/head";
import { useQuery, useMutation } from "@apollo/client";
// MUI
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
// local
import { initializeApollo } from "../apollo/client";
import { GET_TODOS } from "../graphql/query";
import { CREATE_TODO, UPDATE_TODO, DELETE_TODO } from "../graphql/mutation";
import connectDb from "../apollo/db";
// local components
import TodoList from "../components/TodoList";
import Loading from "../components/Loading";

const Index = () => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: { todos },
    refetch,
  } = useQuery(GET_TODOS);

  const [createTodo] = useMutation(CREATE_TODO, {
    onCompleted: () => setText(""),
  });
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);

  /**
   * 勾選checkbox
   */
  const handleCheck = async ({ id, status }) => {
    console.log("handleCheck");
    setIsLoading(true);
    try {
      await updateTodo({
        variables: {
          id,
          input: { status: !status },
        },
      });
    } catch (error) {
      alert("update failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 刪除資料
   */
  const handleDelete = async ({ id }) => {
    console.log("delete!");
    setIsLoading(true);
    try {
      await deleteTodo({
        variables: { id },
      });
      refetch();
    } catch (error) {
      alert("delete failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 新增按鈕
   */
  const handleAdd = async () => {
    setIsLoading(true);
    try {
      await createTodo({
        variables: {
          input: {
            text,
            status: false,
          },
        },
      });
      refetch();
    } catch (error) {
      alert("oh no");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 文字寫入state
   * @param {Event} e
   */
  const handleInput = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <CssBaseline />
      <Loading isLoading={isLoading} />
      <Container maxWidth="md">
        <Typography variant="h3" gutterBottom component="div">
          TODO LIST
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
            placeholder="ADD TODOS"
            sx={{ marginRight: 1 }}
            onChange={handleInput}
            value={text}
          />
          <Button
            variant="contained"
            size="large"
            onClick={handleAdd}
            disabled={!text}
          >
            ADD
          </Button>
        </Box>
        <Divider sx={{ margin: 3 }} />
        <TodoList
          todos={todos}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      </Container>
    </>
  );
};

// getStaticProps 改成 getServerSideProps
export async function getServerSideProps() {
  await connectDb();

  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_TODOS,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Index;
