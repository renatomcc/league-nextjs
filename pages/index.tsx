import styled from "@emotion/styled";
import {
  Button,
  Flex,
  createPolymorphicComponent,
  ButtonProps,
  MediaQuery,
} from "@mantine/core";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <>
      <Head>
        <title>League of Legends</title>
        <meta
          name="keywords"
          content="leagueoflegends, champions, project, nextjs, mantine, styledcomponents, riotapi"
        ></meta>
        <meta
          name="description"
          content="league of legends champions project created with next js, mantine, styled components and using the riot games api"
        ></meta>
      </Head>
      <MediaQuery largerThan={400} styles={{ paddingTop: "120px" }}>
        <motion.div
          initial={{ opacity: 0, translateY: -30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.6 }}
          exit={{ opacity: 0 }}
        >
          <StyledFlex>
            <StyledText> Welcome to my application </StyledText>
            <StyledText>
              This is a list of Champions of the game League of Legends created
              with
              <Link
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <b style={{ color: "#812af8" }}> Next JS</b>
              </Link>
              ,
              <Link
                href="https://mantine.dev"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <b style={{ color: "#339af0" }}> Mantine </b>
              </Link>
              and
              <Link
                href="https://styled-components.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <b style={{ color: "#fbb26d" }}> Styled Components</b>
              </Link>
              <br />
              Using the
              <Link
                href="https://developer.riotgames.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "red" }}
              >
                &nbsp;Riot Games API
              </Link>
            </StyledText>
            <motion.div
              initial={{ opacity: 0, translateX: 50 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <StyledButton
                variant="gradient"
                gradient={{ from: "#84320b", to: "#d6951b", deg: 1 }}
                size="lg"
                component="a"
                href="/champions"
              >
                See Champions
              </StyledButton>
            </motion.div>
          </StyledFlex>
        </motion.div>
      </MediaQuery>
    </>
  );
};

const StyledFlex = styled(Flex)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
`;

const StyledText = styled.div`
  font-size: 30px;
  font-family: Friz-Medium;
  color: #d4b362;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
  text-align: center;
`;

export const _StyledButton = styled(Button)`
  color: #ffdbc0;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.8);
  font-family: Friz-Regular;
  padding: 15px;
  letter-spacing: 1.2px;
  transition: all linear 0.1s;
  &:hover {
    transform: scale(1.02);
  }
`;

export const StyledButton = createPolymorphicComponent<"button", ButtonProps>(
  _StyledButton
);

export default Home;
