import styled from "@emotion/styled";
import { ActionIcon, Text } from "@mantine/core";
import { BsInfoCircle } from "react-icons/bs";
import getNewName from "../config/getName";
import Image from "next/image";

export function Champion(props: any) {
  let newName = getNewName(props.props.name);
  return (
    <>
      <StyledCard>
        <Image
          src={props.props.image}
          height={450}
          width={250}
          alt={props.props.name}
        />

        <Text
          size="xl"
          color="#c8a355"
          align="center"
          weight={500}
          transform="uppercase"
          style={{ fontFamily: "Friz-Medium" }}
        >
          {props.props.name}
        </Text>
        <ActionIcon
          size="lg"
          radius="xl"
          variant="filled"
          component="a"
          href={`/champions/${newName}`}
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            backgroundColor: "transparent",
          }}
        >
          <BsInfoCircle size={30} fill="white" />
        </ActionIcon>
      </StyledCard>
    </>
  );
}

const StyledCard = styled.div`
  position: relative;
  width: 250px;
  height: 485px;
  padding: 0px;
  background: black;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.4);
  border-radius: 3px;
  transition: all linear 0.2s;
  &:hover {
    transform: scale(1.05);
    transition: all linear 0.2s;
  }
`;

export default Champion;
