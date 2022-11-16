import styled from "@emotion/styled";
import {
  Button,
  Flex,
  createPolymorphicComponent,
  ButtonProps,
  MediaQuery,
} from "@mantine/core";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <MediaQuery largerThan={400} styles={{ paddingTop: "120px" }}>
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
              <b style={{ color: "#5800d1" }}> Next JS</b>
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
          <StyledButton
            variant="gradient"
            gradient={{ from: "#84320b", to: "#d6951b", deg: 10 }}
            size="lg"
            component="a"
            href="/champions"
          >
            See Champions
          </StyledButton>
        </StyledFlex>
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

const _StyledButton = styled(Button)`
  color: #fab582;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.8);
  font-family: Friz-Medium;
  padding: 15px;
  transition: all linear 0.1s;
  &:hover {
    transform: scale(1.02);
  }
`;

const StyledButton = createPolymorphicComponent<"button", ButtonProps>(
  _StyledButton
);

export default Home;
