import { Button, Flex, SimpleGrid } from "@mantine/core";
import Card from "../../components/ChampionCard";
import { imageChampion, riotAPI } from "../../config/riotapi";
import getNewName from "../../config/getName";

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
      tags: [],
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
  return (
      <Flex gap="xl" justify="center" direction="row" wrap="wrap">
        {data.map((champion: any) => (
          <Card key={champion.id} props={champion} />
        ))}
      </Flex>
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
