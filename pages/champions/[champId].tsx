import {
  Button,
  Card,
  createPolymorphicComponent,
  Flex,
  Group,
  MediaQuery,
  SimpleGrid,
  Text,
  TextProps,
  Title,
} from "@mantine/core";
import {
  riotAPI,
  infoChampion,
  imageChampion,
  imageSkill,
  imagePassive,
} from "../../config/riotapi";
import Image from "next/image";
import { IChampion } from ".";
import getNewName from "../../config/getName";
import styled from "@emotion/styled";
import Skill from "../../components/SkillCard";

export async function getStaticProps({ params }: any) {
  var Champion: IChampion;
  const res = await fetch(infoChampion + params.champId + ".json");
  const data = await res.json();
  const champ: any = Object.values(data.data)[0];
  let newName = getNewName(champ.name);
  Champion = {
    name: champ.name,
    image: imageChampion + newName + "_0.jpg",
    description: champ.lore,
    title: champ.title[0].toUpperCase() + champ.title.slice(1),
    tags: [`${champ.tags[0]}`, `${champ.tags[1] ? champ.tags[1] : null}`],
    passive: {
      name: champ.passive.name,
      image: imagePassive + champ.passive.image.full,
      description: champ.passive.description,
    },
    skills: [
      {
        name: champ.spells[0].name,
        image: imageSkill + champ.spells[0].id + ".png",
        description: champ.spells[0].description,
      },
      {
        name: champ.spells[1].name,
        image: imageSkill + champ.spells[1].id + ".png",
        description: champ.spells[1].description,
      },
      {
        name: champ.spells[2].name,
        image: imageSkill + champ.spells[2].id + ".png",
        description: champ.spells[2].description,
      },
      {
        name: champ.spells[3].name,
        image: imageSkill + champ.spells[3].id + ".png",
        description: champ.spells[3].description,
      },
    ],
  };

  return {
    props: {
      data: Champion,
    },
  };
}

export async function getStaticPaths() {
  const response = await fetch(riotAPI);
  const data = await response.json();

  const paths = Object.values(data.data).map((champ: any) => {
    return {
      params: {
        champId: `${champ.id}`,
      },
    };
  });

  return { paths, fallback: false };
}

export default function Champion({ data }: any) {
  return (
    <SimpleGrid>
      <Button
        variant="filled"
        color="orange"
        radius="md"
        size="lg"
        compact
        component="a"
        href="/champions"
        style={{ width: "80px", fontFamily: "Friz-Regular", color: "black" }}
      >
        Voltar
      </Button>
      <MediaQuery
        largerThan={1200}
        styles={{ width: "1200px", height: "500px" }}
      >
        <Card
          withBorder
          style={{ backgroundColor: "rgba(0,0,0,0.65)", border: "black" }}
        >
          <MediaQuery smallerThan={780} styles={{ flexWrap: "wrap" }}>
            <StyledFlex>
              <Image
                src={data.image}
                alt={data.name}
                width={250}
                height={465}
              />
              <Card style={{ backgroundColor: "transparent" }}>
                <SimpleGrid style={{ height: "100%" }}>
                  <Title
                    align="center"
                    color="#c39031"
                    style={{ fontFamily: "Friz-Regular" }}
                  >
                    {data.title}
                  </Title>
                  <Group position="center" spacing="xl">
                    <StyledGroup>
                      <StyledText>P</StyledText>
                      <Skill props={data.passive} />
                    </StyledGroup>

                    <StyledGroup>
                      <StyledText>Q</StyledText>
                      <Skill props={data.skills[0]} />
                    </StyledGroup>

                    <StyledGroup>
                      <StyledText>W</StyledText>
                      <Skill props={data.skills[1]} />
                    </StyledGroup>

                    <StyledGroup>
                      <StyledText>E</StyledText>
                      <Skill props={data.skills[2]} />
                    </StyledGroup>

                    <StyledGroup>
                      <StyledText>R</StyledText>
                      <Skill props={data.skills[3]} />
                    </StyledGroup>
                  </Group>
                  <Title
                    order={2}
                    color="#c39031"
                    style={{ fontFamily: "Friz-Regular" }}
                  >
                    {" "}
                    Lore:{" "}
                  </Title>
                  <Text
                    weight={500}
                    align="justify"
                    color="#c39031"
                    style={{ fontFamily: "Friz-Regular" }}
                  >
                    {data.description}
                  </Text>
                </SimpleGrid>
              </Card>
            </StyledFlex>
          </MediaQuery>
        </Card>
      </MediaQuery>
    </SimpleGrid>
  );
}

const StyledFlex = styled(Flex)`
  gap: 20px;
  justify-content: center;
  alignitems: flex-start;
  flex-direction: row;
`;

const _StyledText = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  color: #c6a756;
  text-shadow: 1px 1px 1px black;
  font-family: Friz-Regular;
`;

const StyledText = createPolymorphicComponent<"text", TextProps>(_StyledText);

const StyledGroup = styled(Group)`
  display: flex;
  flex-direction: column;
  gap: 0px;
`;
