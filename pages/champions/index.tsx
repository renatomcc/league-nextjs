import { Flex, Group, keyframes, TextInput } from "@mantine/core";
import Champion from "../../components/ChampionCard";
import { imageChampion, riotAPI } from "../../config/riotapi";
import getNewName from "../../config/getName";
import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import styled from "@emotion/styled";
import Router from "next/router";

export async function getStaticProps() {
  var championsStorage: IChampion[] = [];
  const res = await fetch(riotAPI);
  const data = await res.json();

  Object.values(data.data).map((champ: any) => {
    let newName = getNewName(champ.name);

    var newChamp: IChampion = {
      name: champ.name,
      image: imageChampion + newName + "_0.jpg",
      description: champ.blurb,
      title: champ.title[0].toUpperCase() + champ.title.slice(1),
      tags: [`${champ.tags[0]}`, `${champ.tags[1] ? champ.tags[1] : null}`],
      passive: null,
      skills: [],
    };
    championsStorage.push(newChamp);
  });

  return {
    props: {
      data: championsStorage,
    },
  };
}

const Home = ({ data }: any) => {
  const [searchChampions, setSerachChampions] = useState("");
  var search: IChampion[] =
    searchChampions.length > 0
      ? data.filter((champ: any) =>
          champ.name
            .replaceAll("'", "")
            .toLocaleLowerCase()
            .includes(searchChampions.replaceAll("'", "").toLowerCase())
        )
      : (search = data);

  return (
    <StyledGroup
      style={{ marginTop: "30px", display: "flex", flexDirection: "column" }}
      position="center"
      spacing="xl"
    >
      <StyledInput
        icon={<BiSearchAlt2 size={20} />}
        placeholder="Search Champion"
        onChange={(e) => {
          setSerachChampions(e.target.value);
        }}
      />
      <Flex gap="xl" justify="center" direction="row" wrap="wrap">
        {search.map((champion: any) => (
          <Champion key={champion.id} props={champion} />
        ))}
      </Flex>
    </StyledGroup>
  );
};

export interface IChampion {
  name: string;
  image: string;
  description: string;
  title: string;
  tags: string[] | null[];
  passive: ISkill | null;
  skills: ISkill[];
}

export interface ISkill {
  name: string;
  image: string;
  description: string;
}

export default Home;

const StyledInput = styled(TextInput)`
  border-radius: 5px;
  input {
    background-color: #111111;
    border: none;
    border-radius: 5px;
    color: white;
    font-family: Friz-Medium;
    font-size: 15px;
    font-style: italic;
    opacity: 0.8;
  }
`;

const appear = keyframes`
0%{
  opacity: 0;
}
80%{
  opacity: 0;
}
100{
  opacity 1;
}
`;

const StyledGroup = styled(Group)`
  animation: ${appear} 0.3s ease-in-out forwards;
`;