import gql from "graphql-tag";
import Link from "next/link";
import Head from "next/head";
import { useQuery } from "@apollo/client";
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

import { initializeApollo } from "../apollo/client";

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      name
      status
    }
  }
`;

const Index = () => {
  const {
    data: { viewer },
  } = useQuery(ViewerQuery);

  const handleCheck = () => {
    console.log("handleCheck");
  };

  const handleDelete = () => {
    console.log("delete!");
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
      <Container maxWidth="md">
        <Typography variant="h3" gutterBottom component="div">
          TODO LIST
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TextField placeholder="ADD TODOS" sx={{ marginRight: 1 }} />
          <Button variant="contained" size="large">
            ADD
          </Button>
        </Box>
        <Divider sx={{ margin: 3 }} />
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {[0, 1, 2, 3].map((v) => {
            return (
              <ListItem
                key={v}
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
                      checked={true}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText id={v} primary={"12321"} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        {/* <div>
          You're signed in as {viewer.name} and you're {viewer.status} goto{" "}
          <Link href="/about">
            <a>static</a>
          </Link>{" "}
          page.
        </div> */}
      </Container>
    </>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ViewerQuery,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Index;
