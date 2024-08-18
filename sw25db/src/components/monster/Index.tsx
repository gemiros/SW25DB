import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { MyAccordion } from "./indexparts/accordion";

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
const race = ["蛮族", "動物", "植物", "アンデッド", "魔法生物", "魔動機", "幻獣", "妖精", "魔神", "人族", "ゴーレム", "ファミリア", "騎獣"]

export const MonsterIndex = (props: Props) => {
  const [raceMonsters, setRaceMonsters] = useState<RaceMonsType[]>([])
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
      <h2>モンスター一覧</h2>
      {raceMonsters.map((group, id) => (
        <MyAccordion key={id} monster={group} />
      ))}
    </div>
  );
};