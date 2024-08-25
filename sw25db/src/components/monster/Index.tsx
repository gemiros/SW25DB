import { Button, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { MyAccordion } from "./indexparts/accordion";
import { useNavigate } from "react-router-dom";
import { raceList } from "../const/monster";

type RaceMonsType = {
  race: string,
  main: monster.monster[],
  boss: monster.monster[],
  origin: monster.monster[]
}

type Props = {
  monsters: monster.monster[]
  setMonster: (mons: monster.monster[]) => void
};

export const MonsterIndex = (props: Props) => {
  const navigate = useNavigate()
  const [raceMonsters, setRaceMonsters] = useState<RaceMonsType[]>([])
  const [sortMons, setSortMons] = useState<monster.monster[]>([])
  const createButtonListner = () => {
    navigate('/monster/create')
  }
  useEffect(() => {
    const sortMons = () => {
      setRaceMonsters([])
      console.log(props.monsters);
      let sortedMons = props.monsters.filter((data) => data.Top)
      console.log(sortedMons);
      console.log(props.monsters.filter((data) => !data.Top));

      try {
        sortedMons = props.monsters
          .sort((a, b) => { return a.Top.name.localeCompare(b.Top.name) })
          .sort((a, b) => a.Top.lv - b.Top.lv)
        props.setMonster(sortedMons)
      } catch (error) {
        console.log(error);
      }
      setSortMons(sortedMons)
    }
    sortMons()
  }, [props.monsters])

  useEffect(() => {
    const classing = () => {
      let newRaceMonss: RaceMonsType[] = [];
      raceList.forEach(r => {
        let rm: RaceMonsType = {
          race: r,
          main: [],
          boss: [],
          origin: []
        }
        sortMons.forEach(monster => {
          if (r == monster.Top.race) {
            if (monster.Tags.find(item => item === 'main')) rm.main.push(monster);
            if (monster.Tags.find(item => item === 'boss')) rm.boss.push(monster);
            if (monster.Tags.find(item => item === 'original')) rm.origin.push(monster);
          }
        })
        newRaceMonss.push(rm)
      })
      setRaceMonsters(newRaceMonss)
    }
    classing();
  }, [sortMons])

  return (
    <div>
      <div style={{ paddingBottom: "1em" }}>
        <h2 style={{ marginBottom: "0" }}>モンスター一覧</h2>
        <Button variant="contained" onClick={createButtonListner}>作成</Button>
      </div>
      {raceMonsters.map((group, id) => (
        <MyAccordion key={id} monster={group} />
      ))}
    </div>
  );
};