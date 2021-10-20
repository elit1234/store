import { createGlobalStyle, ThemeProvider } from "styled-components";
import Router from "next/router";
import nProgress from "nprogress";
import "../nprogress.css";
import Head from "next/head";
import { wrapper } from "../Components/Redux/store";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }


  @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');


  @font-face {
    font-family: 'Proximanova Regular';
    src: url('/fonts/ProximaNova-Regular.otf') format("opentype");
  }


  
`;

const theme = {
  colors: {
    orange: "#FF6D29",
    black: "#212121",
    lightBlack: "#313131",
    lighterBlack: "#414141",
    lightestBlack: "#515151",
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

MyApp.getInitialProps = wrapper.getInitialAppProps();

export default wrapper.withRedux(MyApp);
