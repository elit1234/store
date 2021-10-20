import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

const Wrapper = styled.div`
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  text-align: center;
  font-size: 35px;
  font-weight: bold;
  text-transform: uppercase;
  padding: 20px 0;
`;

const Sections = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 50%;
  margin: 0 auto;
  height: 40px;

  @media (max-width: 1300px) {
    width: 80%;
    flex-wrap: wrap;
  }
  transition: width 0.5s ease-in-out;
  margin-bottom: 50px;
`;

const Section = styled.div`
  font-size: 20px;
  cursor: pointer;
  ${(props) =>
    props.active
      ? `
    color: #40bfff;
  `
      : `
  color: #000;`};
  transition: color 0.2s ease-in-out;
`;

const ItemsContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-template-rows: 1fr;
  gap: 20px 0px;
  justify-content: center;
`;

const Item = styled.div.attrs((props) => ({
  className: "storeItem",
}))`
  background: #f6f6f6;
  height: 200px;
  width: 250px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const ItemImage = styled.div`
  width: 80%;
  height: 100%;
  background: url(${(props) => (props.image ? props.image : 0)}) center center
    no-repeat;
  background-size: contain;
  margin: 0 auto;
`;

const ItemTitle = styled.a`
  text-decoration: none;
  font-weight: bold;
  color: #223263;
  margin: 0 auto;
  width: 80%;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  font-size: 18px;
`;

const LoadMore = styled.div`
  font-weight: bold;
  color: #40bfff;
  margin: 0 auto;
  width: 80%;
  cursor: pointer;
  text-decoration: underline;
  text-align: center;
  padding: 60px 0;
  padding-bottom: 120px;
`;

const BestSeller = () => {
  const [activeSection, setActiveSection] = useState({
    name: "All",
  });
  const sections = [
    {
      name: "All",
    },
    {
      name: "Bags",
    },
    {
      name: "Sneakers",
    },
    {
      name: "Belt",
    },
    {
      name: "Sunglasses",
    },
  ];

  const bestSellers = [
    {
      name: "Nike Air Max 270 React",
      stars: 4,
      price: 299.43,
      image: "https://i.imgur.com/yPfGBto.png",
      uid: 1,
      gender: "mens",
    },
    {
      name: "Nike Air Max 270 React",
      image: "https://i.imgur.com/nevapPQ.png",
      uid: 2,
      gender: "mens",
    },
    {
      name: "Nike Air Max 270 React",
      image: "https://i.imgur.com/Ws0I33p.png",
      uid: 3,
      gender: "mens",
    },
    {
      name: "Nike Air Max 270 React",
      image: "https://i.imgur.com/nevapPQ.png",
      uid: 4,
      gender: "mens",
    },
    {
      name: "Nike Air Max 270 React",
      image: "https://i.imgur.com/yPfGBto.png",
      uid: 5,
      gender: "mens",
    },
    {
      name: "Nike Air Max 270 React",
      image: "https://i.imgur.com/Ws0I33p.png",
      uid: 6,
      gender: "mens",
    },
  ];
  return (
    <Wrapper>
      <Title>Best Seller</Title>
      <Sections>
        {sections &&
          sections.map((section, key) => {
            return (
              <Section
                onClick={() => setActiveSection(section)}
                active={
                  activeSection &&
                  section.name &&
                  activeSection.name === section.name
                    ? 1
                    : 0
                }
                key={key}
              >
                {section.name && section.name}
              </Section>
            );
          })}
      </Sections>
      <ItemsContainer>
        {bestSellers &&
          bestSellers.map((bestSeller, key) => {
            return (
              <Item key={key}>
                <ItemImage image={bestSeller.image ? bestSeller.image : 0} />
                <Link href={`/product/${bestSeller.uid}`} passHref>
                  <ItemTitle>{bestSeller.name && bestSeller.name}</ItemTitle>
                </Link>
              </Item>
            );
          })}
      </ItemsContainer>
      <LoadMore>Load More</LoadMore>
    </Wrapper>
  );
};

export default BestSeller;
