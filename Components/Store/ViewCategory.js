import styled from "styled-components";
import TopBar from "../Shared/TopBar";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ViewCategory = () => {
  const router = useRouter();

  return (
    <Wrapper>
      <TopBar />
      <h1>
        Viewing category:{" "}
        {router.query && router.query.category ? router.query.category : "null"}
      </h1>
    </Wrapper>
  );
};

export default ViewCategory;
