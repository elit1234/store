import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useDispatch, useSelector } from "react-redux";

import { setLanguage, setCurrency } from "../Redux/store";
const Wrapper = styled.div`
  height: 130px;
  font-family: "Proximanova Regular", sans-serif;
`;

const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.7fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: "topRowLeft topRowRight";
  width: 100%;
  height: 40%;
  padding: 20px 35px;
  align-items: center;

  @media (max-width: 550px) {
    grid-template-columns: 130px 1fr;
    padding: 20px 10px;
  }
`;

const TopRowLeft = styled.div`
  grid-area: topRowLeft;

  display: flex;
  gap: 10px;
`;

const TopRowOption = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 5px;
  color: ${(props) => (props.active ? `#FF4858` : `#000`)};
  &:hover {
    color: #ff4858;
  }

  transition: color 0.3s ease-in-out;
`;

const TopRowRight = styled.div`
  width: 100%;
  grid-area: topRowRight;
  display: flex;
  justify-content: space-evenly;
`;

const CartAmount = styled.span`
  opacity: 0.5;
`;

const BottomRow = styled.div`
  height: 60%;
  padding: 20px 35px;

  display: grid;
  grid-template-columns: minmax(0, 0.5fr) repeat(5, minmax(0, 0.5fr));
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: "logo . . . . . .";
  height: 60%;
  align-items: center;
  @media (max-width: 550px) {
    gap: 0px 25px;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 20px 10px;
    margin-right: 10px;
    -ms-overflow-style: none;
    scrollbar-width: none;
    :-webkit-scrollbar {
      display: none;
    }
  }
  max-width: 100%;
`;

const Logo = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  font-size: 22px;
  display: flex;
  align-items: center;
  gap: 0 5px;
  color: #40bfff;
  grid-area: logo;
`;

const BottomRowOption = styled.div.attrs((props) => ({
  className: "bottomRowMenuOption",
}))`
  cursor: pointer;
  margin: 0 auto;
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: ${(props) => (props.active ? `#40bfff` : `#000`)};
  font-weight: ${(props) => (props.active ? 700 : 400)};
  font-size: 20px;
  &:hover {
    color: #40bfff;
  }
  transition: color 0.3s ease-in-out;
`;

const LanguageDropdown = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  margin: 35px;
  margin-top: 45px;
  height: 0;
  visibility: hidden;
  background: #fff;
  width: 150px;
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
  @media (max-width: 550px) {
    margin: 10px;
    margin-top: 60px;
  }
  overflow-y: auto;
  gap: 20px 0;
`;

const CurrencyDropdown = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  margin: 40px;
  margin-top: 45px;
  height: 0;
  visibility: hidden;
  background: #fff;
  width: 150px;
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
  @media (max-width: 550px) {
    margin: 10px;
    margin-top: 60px;
  }
  overflow-y: auto;
  gap: 20px 0;
`;

const LanguageDropdownOption = styled.div`
  cursor: pointer;
  opacity: 0.6;
  &:hover {
    opacity: 1;
  }
  height: 50px;
  transition: opacity 0.3s ease-in-out;
`;

const BottomRowDropdown = styled.div`
  width: 80%;
  background: #fff;
  position: relative;
  margin: 0 auto;
  height: 0;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  padding: 0 20px;
`;

const BottomRowDropdownCategory = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const BottomRowDropdownTitle = styled.a`
  color: #818181;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  text-decoration: none;
  transition: all 0.4s ease-in-out;
  width: 30%;
`;

const BottomRowDropdownSubs = styled.div`
  min-width: 150px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 70%;
`;

const BottomRowDropdownSub = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: #000;
  &:hover {
    text-decoration: underline;
  }
`;

const OuterRef = styled.div``;

const ChevronWrapper = styled.div``;

const TopBar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state) =>
    state.user.language ? state.user.language : "ERR"
  );
  const currentCurrency = useSelector((state) =>
    state.user.currency ? state.user.currency : "ERR"
  );

  const [dropdownOptions, setDropdownOptions] = useState(null);
  const [dropdownGender, setDropdownGender] = useState(null);

  const topBarRef = useRef(null);
  const languageChevronRef = useRef(null);
  const currencyChevronRef = useRef(null);

  const languageDropRef = useRef(null);
  const currencyDropRef = useRef(null);
  const bottomRowDropdownRef = useRef(null);

  const animRef = useRef(null);
  const currencyAnimRef = useRef(null);
  const bottomAnimRef = useRef(null);

  const tl = gsap.timeline({ paused: true, reversed: true });
  const currencyTl = gsap.timeline({ paused: true, reversed: true });
  const languageTl = gsap.timeline({ paused: true, reversed: true });
  const bottomTl = gsap.timeline({ paused: true, reversed: true });

  const options = [
    {
      name: "Home",
      to: "/",
    },
    {
      name: "Mens",
      to: "/store/mens",
      items: [
        {
          name: "Tops",
          subItems: [
            {
              name: "T-Shirts",
              id: "tshirts",
            },
            {
              name: "Sweatshirts",
              id: "sweatshirts",
            },
          ],
        },
        {
          name: "Bottoms",
          subItems: [
            {
              name: "Pants",
              id: "pants",
            },
            {
              name: "Shorts",
              id: "shorts",
            },
          ],
        },
        {
          name: "Shoes",
          subItems: [
            {
              name: "Dress Shoes",
              name: "dress-shoes",
            },
            {
              name: "Sneakers",
              id: "sneakers",
            },
            {
              name: "Beachwear",
              id: "beachwear",
            },
          ],
        },
      ],
    },
    {
      name: "Womens",
      to: "/store/womens",
      items: [
        {
          name: "Tops",
          subItems: [
            {
              name: "Shirts",
              id: "shirts",
            },
            {
              name: "Dresses",
              id: "dresses",
            },
          ],
        },
      ],
    },
    {
      name: "Kids",
      to: "/store/kids",
    },
    {
      name: "Contact",
      to: "/contact",
    },
  ];

  const languages = [
    {
      name: "EN",
    },
    {
      name: "FR",
    },
    {
      name: "ES",
    },
    {
      name: "DE",
    },
    {
      name: "IT",
    },
    {
      name: "JA",
    },
    {
      name: "TR",
    },
    {
      name: "AR",
    },
  ];

  const currencies = [
    {
      name: "NZD",
    },
    {
      name: "USD",
    },
    {
      name: "AUD",
    },
    {
      name: "GBP",
    },
    {
      name: "CAD",
    },
    {
      name: "CHF",
    },
    {
      name: "EUR",
    },
    {
      name: "JPY",
    },
  ];

  useEffect(() => {
    animRef.current = tl
      .fromTo(
        languageDropRef.current,
        {
          height: 0,
          autoAlpha: 0,
        },
        {
          height: 250,
          autoAlpha: 1,
        },
        0
      )
      .to(
        languageChevronRef.current,
        {
          transform: "rotateX(180deg)",
        },
        0
      );

    currencyAnimRef.current = currencyTl
      .fromTo(
        currencyDropRef.current,
        {
          height: 0,
          autoAlpha: 0,
        },
        {
          height: 250,
          autoAlpha: 1,
        },
        0
      )
      .to(
        currencyChevronRef.current,
        {
          transform: "rotateX(180deg)",
        },
        0
      );

    bottomAnimRef.current = bottomTl.fromTo(
      bottomRowDropdownRef.current,
      {
        height: 0,
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        minHeight: 200,
      }
    );

    gsap.utils
      .toArray(".bottomRowMenuOption")
      .forEach((bottomRowMenuOption) => {
        bottomRowMenuOption.addEventListener("mouseenter", () => {
          updateMenu(bottomRowMenuOption.id);
        });

        bottomRowDropdownRef.current.addEventListener("mouseleave", () => {
          bottomAnimRef.current.reverse();
        });

        topBarRef.current.addEventListener("mouseleave", () =>
          bottomAnimRef.current.reverse()
        );
      });
  }, []);

  const updateMenu = (opt) => {
    let hoveredOpt = options.filter((obj) => obj.name === opt);
    if (hoveredOpt && hoveredOpt[0] && hoveredOpt[0].items) {
      setDropdownOptions(hoveredOpt[0].items);
      setDropdownGender(hoveredOpt[0].name);
      bottomAnimRef.current.play();
    } else {
      setDropdownOptions(null);
      setDropdownGender(null);
      if (!bottomAnimRef.current.reversed()) bottomAnimRef.current.reverse();
    }
  };

  const clickedLanguage = (lang) => {
    animRef.current.reverse();
    if (lang) {
      dispatch(
        setLanguage({
          language: lang.name ? lang.name : null,
        })
      );
    }
  };

  const clickedCurrency = (curr) => {
    currencyAnimRef.current.reverse();
    if (curr) {
      dispatch(
        setCurrency({
          currency: curr.name ? curr.name : null,
        })
      );
    }
  };

  return (
    <OuterRef>
      <Wrapper>
        <LanguageDropdown ref={languageDropRef}>
          {languages &&
            languages.map((language, key) => {
              return (
                <LanguageDropdownOption
                  key={key}
                  onClick={() => {
                    clickedLanguage(language);
                  }}
                >
                  {language.name && language.name}
                </LanguageDropdownOption>
              );
            })}
        </LanguageDropdown>
        <CurrencyDropdown ref={currencyDropRef}>
          {currencies &&
            currencies.map((curr, key) => {
              return (
                <LanguageDropdownOption
                  key={key}
                  onClick={() => {
                    clickedCurrency(curr);
                  }}
                >
                  {curr.name && curr.name}
                </LanguageDropdownOption>
              );
            })}
        </CurrencyDropdown>
        <TopRow ref={topBarRef}>
          <TopRowLeft>
            <TopRowOption
              onClick={() => {
                animRef.current.reversed()
                  ? currencyAnimRef.current.reverse().then(() => {
                      animRef.current.play();
                    })
                  : animRef.current.reverse();
              }}
            >
              {currentLanguage}
              <ChevronWrapper ref={languageChevronRef}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18px"
                  viewBox="0 0 24 24"
                  width="18px"
                  fill="#000000"
                >
                  <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
                </svg>
              </ChevronWrapper>
            </TopRowOption>
            <TopRowOption
              onClick={() => {
                currencyAnimRef.current.reversed()
                  ? animRef.current.reverse().then(() => {
                      currencyAnimRef.current.play();
                    })
                  : currencyAnimRef.current.reverse();
              }}
            >
              {currentCurrency}
              <ChevronWrapper ref={currencyChevronRef}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18px"
                  viewBox="0 0 24 24"
                  width="18px"
                  fill="#000000"
                >
                  <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
                </svg>
              </ChevronWrapper>
            </TopRowOption>
          </TopRowLeft>
          <TopRowRight>
            <TopRowOption>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18px"
                viewBox="0 0 24 24"
                width="18px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              My Profile
            </TopRowOption>
            <TopRowOption>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </TopRowOption>
            <TopRowOption>
              <CartAmount>$0.00</CartAmount>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </TopRowOption>
          </TopRowRight>
        </TopRow>
        <BottomRow>
          <Logo>
            <svg
              width="44"
              height="45"
              viewBox="0 0 44 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: "pointer" }}
            >
              <rect
                y="0.00244141"
                width="44"
                height="44"
                rx="16"
                fill="#40BFFF"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M31.0619 20.274C32.0165 21.2286 32.0165 22.7763 31.0619 23.7309L23.7285 31.0643C22.7739 32.0189 21.2262 32.0189 20.2716 31.0643L12.9382 23.7309C11.9836 22.7763 11.9836 21.2286 12.9382 20.274L20.2716 12.9406C21.2262 11.986 22.7739 11.986 23.7285 12.9406L31.0619 20.274ZM22.0001 18.1261L18.1237 22.0024L22.0001 25.8788L25.8764 22.0024L22.0001 18.1261Z"
                fill="white"
              />
            </svg>
            STORE
          </Logo>
          {options &&
            options.map((option, key) => {
              return (
                <BottomRowOption key={key} id={option.name}>
                  <Link href={option.to ? option.to : "#"} passHref>
                    <StyledLink
                      onClick={() => {
                        bottomAnimRef.current.reverse();
                      }}
                      active={
                        option.to !== "/" &&
                        option.to &&
                        router.asPath === option.to
                          ? 1
                          : option.to && router.pathname === option.to
                          ? 1
                          : router.query &&
                            router.query.gender &&
                            router.query.gender.toLowerCase() ===
                              option.name.toLowerCase()
                          ? 1
                          : 0
                      }
                    >
                      {option.name && option.name}
                    </StyledLink>
                  </Link>
                </BottomRowOption>
              );
            })}
        </BottomRow>
        <BottomRowDropdown ref={bottomRowDropdownRef}>
          {dropdownOptions &&
            dropdownOptions.map((dropdownOption, key) => {
              return (
                <BottomRowDropdownCategory key={key}>
                  <Link
                    href={`/store/${
                      dropdownGender && dropdownGender.toLowerCase()
                    }/${
                      dropdownOption.name && dropdownOption.name.toLowerCase()
                    }`}
                    passHref
                  >
                    <BottomRowDropdownTitle
                      onClick={() => {
                        bottomAnimRef.current.reverse();
                      }}
                    >
                      {dropdownOption.name && dropdownOption.name}
                    </BottomRowDropdownTitle>
                  </Link>
                  <BottomRowDropdownSubs>
                    {dropdownOption.subItems &&
                      dropdownOption.subItems.map((subItem, subKey) => {
                        return (
                          <Link
                            href={`/store/${
                              dropdownGender && dropdownGender.toLowerCase()
                            }/${
                              dropdownOption.name &&
                              dropdownOption.name.toLowerCase()
                            }/${subItem.id ? subItem.id : null}`}
                            passHref
                            key={subKey}
                          >
                            <BottomRowDropdownSub
                              onClick={() => {
                                bottomAnimRef.current.reverse();
                              }}
                              key={subKey}
                            >
                              {subItem.name && subItem.name}
                            </BottomRowDropdownSub>
                          </Link>
                        );
                      })}
                  </BottomRowDropdownSubs>
                </BottomRowDropdownCategory>
              );
            })}
        </BottomRowDropdown>
      </Wrapper>
    </OuterRef>
  );
};

export default TopBar;
