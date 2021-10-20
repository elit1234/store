import styled from "styled-components";
import TopBar from "../Shared/TopBar";
import Head from "next/head";
import TopSection from "./TopSection";
import BestSeller from "./BestSeller";
import { useEffect } from "react";
import { gql } from "@apollo/client";
import client from "../Apollo/client";
import LoadItems from "../Redux/LoadItems";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Home = ({ countries }) => {
  useEffect(() => {
    console.log(countries);
  }, [countries]);
  return (
    <Wrapper>
      <LoadItems />
      <Head>
        <title>Home</title>
      </Head>
      <TopBar />
      <pre>{JSON.stringify(countries, null, 4)}</pre>
      <TopSection />
      <BestSeller />
    </Wrapper>
  );
};

export default Home;
export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query Countries {
        countries {
          code
          name
          emoji
        }
      }
    `,
  });
  console.log(data);

  return {
    props: {
      countries: data.countries.slice(0, 4),
    },
  };
}
