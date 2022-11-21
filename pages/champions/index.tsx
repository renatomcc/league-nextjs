import Champion from "../../components/ChampionCard";
import { imageChampion, riotAPI } from "../../config/riotapi";
import getNewName from "../../config/getName";
import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import Head from "next/head";

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
    <>
      <Head>
        <title>Champions</title>
      </Head>
      <StyledGroup>
        <StyledInput
          initial={{ opacity: 0, translateX: 80 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BiSearchAlt2 size={20} fill="white" />
          <input
            placeholder="Search Champion"
            onChange={(e) => setSerachChampions(e.target.value)}
          ></input>
        </StyledInput>
        <StyledFlex>
          {search.map((champion: any, index) => (
            <motion.div
              key={champion}
              initial={{ opacity: 0, translateY: -20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.2, delay: index * 0.07 }}
            >
              <Champion key={champion.id} props={champion} />
            </motion.div>
          ))}
        </StyledFlex>
      </StyledGroup>
    </>
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

const StyledGroup = styled(motion.div)`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const StyledInput = styled(motion.div)`
  background-color: #111111;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 8px;
  gap: 5px;
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.4);
  opacity: 0.75;
  input {
    background-color: transparent;
    border: none;
    color: white;
    font-family: Friz-Medium;
    font-size: 15px;
    font-style: italic;
    outline: none;
  }
`;

const StyledFlex = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
`;
