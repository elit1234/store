import { useRouter } from "next/router";
import Head from "next/head";
import styled from "styled-components";
import TopBar from "../Shared/TopBar";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ViewSubItemCategory = () => {
  const router = useRouter();
  const { gender, category, subitem } = router.query;
  return (
    <>
      <Head>
        <title>
          Store -{" "}
          {gender.charAt(0).toUpperCase() +
            gender.slice(1) +
            " " +
            category.charAt(0).toUpperCase() +
            category.slice(1)}
        </title>
      </Head>
      <Wrapper>
        <TopBar />
        <h1>
          Viewing {gender.charAt(0).toUpperCase() + gender.slice(1) + " "}
          {subitem.charAt(0).toUpperCase() + subitem.slice(1)}
        </h1>
      </Wrapper>
    </>
  );
};

export default ViewSubItemCategory;
