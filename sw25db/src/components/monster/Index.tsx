import { Button, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { MyAccordion } from "./indexparts/accordion";
import { useNavigate } from "react-router-dom";
import { race } from "../const/monster";

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
  const createButtonListner = () => {
    navigate('/monster/create')
  }
  useEffect(() => {
    const sortMons = () => {
      setRaceMonsters([])
      let sortedMons = props.monsters
        .sort((a, b) => a.Top.name.localeCompare(b.Top.name))
        .sort((a, b) => a.Top.lv - b.Top.lv)
      props.setMonster(sortedMons)

    }
    const classing = () => {
      let newRaceMonss: RaceMonsType[] = [];
      sortMons()
      race.forEach(r => {
        let rm: RaceMonsType = {
          race: r,
          main: [],
          boss: [],
          origin: []
        }
        props.monsters.forEach(monster => {
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
  }, [props.monsters])

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