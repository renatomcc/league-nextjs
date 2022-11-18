import {
  Button,
  ButtonProps,
  Card,
  createPolymorphicComponent,
  Flex,
  Group,
  keyframes,
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
import { useState } from "react";
import { Router } from "next/router";

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
      description: champ.passive.description.replace(/(<([^>]+)>)/gi, ""),
    },
    skills: [
      {
        name: champ.spells[0].name,
        image: imageSkill + champ.spells[0].id + ".png",
        description: champ.spells[0].description.replace(/(<([^>]+)>)/gi, ""),
      },
      {
        name: champ.spells[1].name,
        image: imageSkill + champ.spells[1].id + ".png",
        description: champ.spells[1].description.replace(/(<([^>]+)>)/gi, ""),
      },
      {
        name: champ.spells[2].name,
        image: imageSkill + champ.spells[2].id + ".png",
        description: champ.spells[2].description.replace(/(<([^>]+)>)/gi, ""),
      },
      {
        name: champ.spells[3].name,
        image: imageSkill + champ.spells[3].id + ".png",
        description: champ.spells[3].description.replace(/(<([^>]+)>)/gi, ""),
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
  const [spellTitle, setSpellTitle] = useState("");
  const [spellDescription, setSpellDescription] = useState("");
  const [loading, setLoading] = useState(true);

  Router.events.on("routeChangeStart", () => {
    console.log("loading...");
    setLoading(true);
  });

  Router.events.on("routeChangeComplete", () => {
    console.log("loading done");
    setLoading(false);
  });

  Router.events.on("hashChangeComplete", () => {
    console.log("a");
  });

  return (
    <SimpleGrid>
      <StyledButton
        variant="gradient"
        gradient={{ from: "#84320b", to: "#d6951b", deg: 1 }}
        radius="md"
        size="lg"
        compact
        component="a"
        href="/champions"
      >
        Voltar
      </StyledButton>
      <MediaQuery
        largerThan={1200}
        styles={{ width: "1200px", height: "550px" }}
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
                    <StyledGroup
                      onClick={() => {
                        setSpellDescription(data.passive.description);
                        setSpellTitle(data.passive.name + " (Passive): ");
                      }}
                    >
                      <StyledText>P</StyledText>
                      <Skill props={data.passive} />
                    </StyledGroup>

                    <StyledGroup
                      onClick={() => {
                        setSpellDescription(data.skills[0].description);
                        setSpellTitle(data.skills[0].name + " (Q): ");
                      }}
                    >
                      <StyledText>Q</StyledText>
                      <Skill props={data.skills[0]} />
                    </StyledGroup>

                    <StyledGroup
                      onClick={() => {
                        setSpellDescription(data.skills[1].description);
                        setSpellTitle(data.skills[1].name + " (W): ");
                      }}
                    >
                      <StyledText>W</StyledText>
                      <Skill props={data.skills[1]} />
                    </StyledGroup>

                    <StyledGroup
                      onClick={() => {
                        setSpellDescription(data.skills[2].description);
                        setSpellTitle(data.skills[2].name + " (E):");
                      }}
                    >
                      <StyledText>E</StyledText>
                      <Skill props={data.skills[2]} />
                    </StyledGroup>

                    <StyledGroup
                      onClick={() => {
                        setSpellDescription(data.skills[3].description);
                        setSpellTitle(data.skills[3].name + " (R):");
                      }}
                    >
                      <StyledText>R</StyledText>
                      <Skill props={data.skills[3]} />
                    </StyledGroup>
                  </Group>
                  <Group
                    style={{
                      gap: "0px",
                      padding: "5px",
                      flexDirection: "column",
                      textAlign: "center",
                    }}
                  >
                    <Title
                      order={4}
                      color="white"
                      style={{
                        textShadow: "1px 2px 2px black",
                        fontFamily: "Friz-Regular",
                      }}
                    >
                      {spellTitle}
                    </Title>
                    <SpellDescription color="#c6a756" weight={600}>
                      {spellDescription}
                    </SpellDescription>
                  </Group>
                  <Title
                    order={2}
                    color="#c39031"
                    style={{ fontFamily: "Friz-Regular" }}
                  >
                    Lore:
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

const _SpellDescription = styled(Text)`
  color: #c6a756;
  text-shadow: 1px 1px 1px black;
  font-family: Friz-Regular;
`;

const SpellDescription = createPolymorphicComponent<"text", TextProps>(
  _SpellDescription
);

const StyledGroup = styled(Group)`
  display: flex;
  flex-direction: column;
  gap: 0px;
`;

const _StyledButton = styled(Button)`
  width: 85px;
  font-family: Friz-Regular;
  letter-spacing: 1.2px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
`;

const StyledButton = createPolymorphicComponent<"button", ButtonProps>(
  _StyledButton
);
