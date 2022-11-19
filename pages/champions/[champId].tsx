import {
  Button,
  ButtonProps,
  Card,
  createPolymorphicComponent,
  Flex,
  Group,
  MediaQuery,
  SimpleGrid,
  Text,
  TextProps,
  Title,
  Tooltip,
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
import { motion } from "framer-motion";
import Head from "next/head";

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
  const [showDescription, setShowDescription] = useState(false);
  const [currentSpell, setCurrentSpell] = useState("");
  return (
    <>
      <Head>
        <title>{data.name}</title>
      </Head>
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
          <StyledCard
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <MediaQuery smallerThan={780} styles={{ flexWrap: "wrap" }}>
              <StyledFlex>
                <motion.div
                  initial={{ opacity: 0, translateX: -30 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Image
                    src={data.image}
                    alt={data.name}
                    width={250}
                    height={465}
                  />
                </motion.div>
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
                          setShowDescription(true);
                          setSpellDescription(data.passive.description);
                          setSpellTitle(data.passive.name + " (Passive): ");
                        }}
                        initial={{ translateY: -20, opacity: 0 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <Tooltip
                          label={data.passive.name}
                          color="#b96400"
                          position="top"
                          withArrow
                          arrowSize={10}
                        >
                          <div>
                            <StyledText>P</StyledText>
                            <Skill props={data.passive} />
                          </div>
                        </Tooltip>
                      </StyledGroup>

                      <StyledGroup
                        onClick={() => {
                          setShowDescription(true);
                          setSpellDescription(data.skills[0].description);
                          setSpellTitle(data.skills[0].name + " (Q): ");
                        }}
                        initial={{ translateY: -20, opacity: 0 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        <Tooltip
                          label={data.skills[0].name}
                          color="#b96400"
                          position="top"
                          withArrow
                          arrowSize={10}
                        >
                          <div>
                            <StyledText>Q</StyledText>
                            <Skill props={data.skills[0]} />
                          </div>
                        </Tooltip>
                      </StyledGroup>

                      <StyledGroup
                        onClick={() => {
                          setShowDescription(true);
                          setSpellDescription(data.skills[1].description);
                          setSpellTitle(data.skills[1].name + " (W): ");
                        }}
                        initial={{ translateY: -20, opacity: 0 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                      >
                        <Tooltip
                          label={data.skills[1].name}
                          color="#b96400"
                          position="top"
                          withArrow
                          arrowSize={10}
                        >
                          <div>
                            <StyledText>W</StyledText>
                            <Skill props={data.skills[1]} />
                          </div>
                        </Tooltip>
                      </StyledGroup>

                      <StyledGroup
                        onClick={() => {
                          setShowDescription(true);
                          setSpellDescription(data.skills[2].description);
                          setSpellTitle(data.skills[2].name + " (E):");
                        }}
                        initial={{ translateY: -20, opacity: 0 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                      >
                        <Tooltip
                          label={data.skills[2].name}
                          color="#b96400"
                          position="top"
                          withArrow
                          arrowSize={10}
                        >
                          <div>
                            <StyledText>E</StyledText>
                            <Skill props={data.skills[2]} />
                          </div>
                        </Tooltip>
                      </StyledGroup>

                      <StyledGroup
                        onClick={() => {
                          setShowDescription(true);
                          setSpellDescription(data.skills[3].description);
                          setSpellTitle(data.skills[3].name + " (R):");
                        }}
                        initial={{ translateY: -20, opacity: 0 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                      >
                        <Tooltip
                          label={data.skills[3].name}
                          color="#b96400"
                          position="top"
                          withArrow
                          arrowSize={10}
                        >
                          <div>
                            <StyledText>R</StyledText>
                            <Skill props={data.skills[3]} />
                          </div>
                        </Tooltip>
                      </StyledGroup>
                    </Group>
                    {showDescription && (
                      <StyledSpell
                        initial={{ opacity: 0, translateX: 320 }}
                        animate={{ opacity: 1, translateX: 0 }}
                        transition={{ duration: 0.5 }}
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
                        <SpellDescription>{spellDescription}</SpellDescription>
                      </StyledSpell>
                    )}
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
          </StyledCard>
        </MediaQuery>
      </SimpleGrid>
    </>
  );
}

const StyledSpell = styled(motion.div)`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledCard = styled(motion.div)`
  border: 1px solid rgba(0, 0, 0, 0.4);
  background-color: rgba(0, 0, 0, 0.65);
  padding: 10px;
  display: flex;
  align-items: center;
`;

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
  text-shadow: 1px 1px 1px black;
  font-family: Friz-Regular;
  color: #c6a756;
  font-weight: 600;
  padding-top: 8px;
`;

const SpellDescription = createPolymorphicComponent<"text", TextProps>(
  _SpellDescription
);

const StyledGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0px;
  text-align: center;
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
