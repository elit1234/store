import styled from "styled-components";
import { gsap } from "gsap";
import { useRef, useEffect } from "react";

const TopBanner = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
    url(${(props) => (props.image ? props.image : 0)}) center center no-repeat;
  background-size: cover;
  background-position: fixed;
  background-repeat: no-repeat;
  height: 300px;
`;

const Section = styled.div`
  min-height: 300px;
  width: 60%;
  margin: 0 auto;
  margin-top: -40px;
  display: flex;
  gap: 0px 0px;
  @media (max-width: 850px) {
    flex-direction: column;
    align-items: center;
    gap: 10px 0;
    width: 80%;
  }
  margin-bottom: 50px;
`;

const TopText = styled.div`
  color: #fff;
  font-size: 35px;
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding: 0 30px;
  height: 100%;
`;

const Item = styled.div.attrs((props) => ({
  className: "storeItem",
}))`
  width: 40%;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: ${(props) => (props.alt ? `#f6f6f6` : `#e7e7e7`)};
  border-radius: 5px;
  font-family: "Poppins", sans-serif;
  @media (max-width: 850px) {
    width: 100%;
  }
`;

const ItemTitle = styled.div`
  font-weight: bold;
  color: #223263;
  padding: 0 40px;
  width: 80%;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  font-size: 18px;
  transition: text-decoration 0.3s ease-in-out;
  ${(props) =>
    props.altPos &&
    `
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 1000px) {
        flex-wrap: wrap;
    }
  width: 100%;
  padding: 0 10px;
`}
`;

const ItemImage = styled.div`
  height: 150px;
  background: url(${(props) => (props.image ? props.image : 0)}) center center
    no-repeat;
  background-size: contain;
  width: 80%;
  margin: 0 auto;
`;

const ItemPrice = styled.div`
  font-size: 30px;
  color: #40bfff;
`;

const TopSection = () => {
  const topBannerUrl = "https://i.imgur.com/IZQ95Dd.png";
  const bannerItems = [
    {
      name: "FS - QUILTED MAXI CROSS BAG",
      image: "https://i.imgur.com/yPfGBto.png",
      oldPrice: "$534.33",
      discount: "24% off",
    },
    {
      name: "FS - Nike Air Max 270 React...",
      image: "https://i.imgur.com/nevapPQ.png",
      alt: 1,
      altPos: 1,
      price: "$299.43",
    },
    {
      name: "FS - Nike Air Max 270 React...",
      image: "https://i.imgur.com/Ws0I33p.png",
      alt: 1,
    },
  ];

  const animRef = useRef(null);
  const tl = gsap.timeline({ paused: true });

  useEffect(() => {
    gsap.utils.toArray(".storeItem").forEach((item) => {
      let hoverTl = gsap.to(item, { scale: 1.05, paused: true });
      item.addEventListener("mouseenter", () => hoverTl.play());
      item.addEventListener("mouseleave", () => hoverTl.reverse());
    });
  }, []);
  return (
    <>
      <TopBanner image={topBannerUrl}>
        <TopText>
          Super Flash Sale
          <br />
          50% off
        </TopText>
      </TopBanner>
      <Section>
        {bannerItems &&
          bannerItems.map((bannerItem, key) => {
            return (
              <Item key={key} alt={bannerItem.alt ? 1 : 0}>
                <ItemTitle altPos={bannerItem.altPos ? 1 : 0}>
                  {bannerItem.name && bannerItem.name}
                  <ItemPrice>{bannerItem.price && bannerItem.price}</ItemPrice>
                </ItemTitle>
                <ItemImage image={bannerItem.image ? bannerItem.image : 0} />
              </Item>
            );
          })}
      </Section>
    </>
  );
};

export default TopSection;
