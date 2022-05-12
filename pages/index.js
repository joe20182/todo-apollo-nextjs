import gql from "graphql-tag";
import Link from "next/link";
import Head from "next/head";
import { useQuery } from "@apollo/client";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
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

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <Container maxWidth="md">
        <Typography variant="h3" gutterBottom component="div">
          TODO LIST
        </Typography>
        <div>
          You're signed in as {viewer.name} and you're {viewer.status} goto{" "}
          <Link href="/about">
            <a>static</a>
          </Link>{" "}
          page.
        </div>
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
