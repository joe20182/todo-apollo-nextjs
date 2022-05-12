import { useState, useEffect } from "react";
import Head from "next/head";
import { useQuery, useMutation } from "@apollo/client";
// MUI
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// local
import { initializeApollo } from "../apollo/client";
import { GET_TODOS } from "../graphql/query";
import { CREATE_TODO } from "../graphql/mutation";
import connectDb from "../apollo/db";

const Index = () => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: { todos },
    loading,
    error,
  } = useQuery(GET_TODOS);

  const [createTodo] = useMutation(CREATE_TODO, {
    onCompleted: () => setText(""),
  });

  /**
   * 勾選checkbox
   */
  const handleCheck = () => {
    console.log("handleCheck");
  };

  /**
   * 刪除資料
   */
  const handleDelete = () => {
    console.log("delete!");
  };

  useEffect(() => {
    console.log(87, loading);
  }, [loading]);

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
        refetchQueries: [
          {
            query: GET_TODOS,
          },
        ],
      });
    } catch (error) {
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
      <Backdrop open={isLoading} sx={{ zIndex: 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
          <Button variant="contained" size="large" onClick={handleAdd}>
            ADD
          </Button>
        </Box>
        <Divider sx={{ margin: 3 }} />
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {todos.map((item) => {
            return (
              <ListItem
                key={item.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={handleDelete}
                  >
                    <DeleteForeverIcon sx={{ color: "text.primary" }} />
                  </IconButton>
                }
              >
                <ListItemButton role={undefined} dense onClick={handleCheck}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={item.status}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Container>
    </>
  );
};

export async function getStaticProps() {
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
