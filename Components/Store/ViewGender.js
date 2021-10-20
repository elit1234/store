import { useRouter } from "next/router";
import Head from "next/head";
import styled from "styled-components";
import TopBar from "../Shared/TopBar";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ViewGender = () => {
  const router = useRouter();
  const { gender } = router.query;
  return (
    <>
      <Head>
        <title>
          Store - {gender.charAt(0).toUpperCase() + gender.slice(1)}
        </title>
      </Head>
      <Wrapper>
        <TopBar />
        <h1>Viewing {gender.charAt(0).toUpperCase() + gender.slice(1)}</h1>
      </Wrapper>
    </>
  );
};

export default ViewGender;
