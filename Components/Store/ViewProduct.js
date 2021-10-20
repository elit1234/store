import { useRouter } from "next/router";
import Head from "next/head";
import styled from "styled-components";
import TopBar from "../Shared/TopBar";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ViewProduct = () => {
  const router = useRouter();
  const { product } = router.query;
  return (
    <>
      <Head>
        <title>Store - {product}</title>
      </Head>
      <Wrapper>
        <TopBar />
        <h1>Viewing Product ID {product}</h1>
      </Wrapper>
    </>
  );
};

export default ViewProduct;
