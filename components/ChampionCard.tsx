import styled from "@emotion/styled";
import { Tooltip, Group, Text, Button } from "@mantine/core";
import getNewName from "../config/getName";
import Image from "next/image";
import Link from "next/link";
import { getClasses } from "../config/getClasses";

export function Champion(props: any) {
  let newName = getNewName(props.props.name);
  console.log(props.props.tags);
  return (
    <>
      <Link href={`/champions/${newName}`} style={{ textDecoration: "none" }}>
        <StyledCard>
          <Image
            src={props.props.image}
            height={450}
            width={250}
            alt={props.props.name}
          />
          <StyledGroup className="spells">
            <Text
              size="xl"
              color="#c8a355"
              align="center"
              weight={500}
              transform="uppercase"
              style={{
                fontFamily: "Friz-Medium",
              }}
            >
              {props.props.name}
            </Text>
            <Group position="center" spacing="xl">
              <Tooltip
                label={props.props.tags[0]}
                color="#b96400"
                position="top"
                withArrow
                arrowSize={10}
              >
                <div>
                  <Image
                    src={getClasses(props.props.tags[0])}
                    alt={props.props.tags[0]}
                    width={40}
                    height={40}
                  />
                </div>
              </Tooltip>
              {props.props.tags[1] !== "null" ? (
                <Tooltip
                  label={props.props.tags[1]}
                  color="#b96400"
                  position="top"
                  withArrow
                  arrowSize={10}
                >
                  <div>
                    <Image
                      src={getClasses(props.props.tags[1])}
                      alt={props.props.tags[1]}
                      width={40}
                      height={40}
                    />
                  </div>
                </Tooltip>
              ) : null}
            </Group>
          </StyledGroup>
        </StyledCard>
      </Link>
    </>
  );
}

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  width: 250px;
  height: 485px;
  padding: 0px;
  background: black;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.4);
  border-radius: 3px;
  transition: all linear 0.2s;
  &:hover .spells {
    transform: translateY(-60px);
    transition: all linear 0.2s;
  }
`;

const StyledGroup = styled(Group)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: all linear 0.4s;
  background-color: black;
  width: 100%;
  box-shadow: 0px -5px 5px #000;
`;

export default Champion;
