import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MonsterViewTop } from './viewparts/top';
import { MonsterViewStatus } from './viewparts/status';
import { MonsterViewParts } from './viewparts/parts';
import { MonsterViewAbilitys } from './viewparts/abilitys';
import { MonsterViewBootys } from './viewparts/bootys';
import React from 'react';
import { CopyMonsterPiece } from './viewparts/copyPiece';

type Props = {
  monsters: monster.monster[]
}

const MonsterView = (props: Props) => {
  const [monster, setMonster] = useState<monster.monster | undefined>()
  const [useLevelId, setUseLevelId] = useState(0)
  const [core, setCore] = useState('')
  const [selectArray, setSelectArray] = useState<any[]>([])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectArray.includes(e.target.value)) {
      setSelectArray(
        selectArray.filter((selectedValue) => selectedValue !== e.target.value)
      )
    } else {
      setSelectArray([...selectArray, e.target.value])
    }
  }
  const params = useParams()
  const name = params.name

  useEffect(() => {
    for (let i = 0; i < props.monsters.length; i++) {
      if (props.monsters[i].Top.name === name) {
        setMonster(props.monsters[i])
        console.log(props.monsters[i]);

        return
      }
    }
  }, [props.monsters])

  return (
    <div>
      {monster ? (
        <React.Fragment>
          <CopyMonsterPiece monster={monster} levelId={useLevelId} />
          <MonsterViewTop top={monster.Top} />
          <MonsterViewStatus status={monster.Status} />
          <MonsterViewParts parts={monster.Parts} useLevelId={useLevelId} setUseLevelId={setUseLevelId} core={core} setCore={setCore} />
          <hr />
          <h2>特殊能力 {monster.Abilitys.max ? <>最大値={monster.Abilitys.max}</> : null}</h2>
          <hr />
          <MonsterViewAbilitys abilitys={monster.Abilitys} selectArray={selectArray} handleChange={handleChange} />
          {monster.Bootys ? <React.Fragment>
            <hr />
            <h2>戦利品</h2>
            <MonsterViewBootys bootys={monster.Bootys} />
          </React.Fragment> : <></>}
          <hr />
          <h3>解説</h3>
          <hr />
          {monster.Explanation}
        </React.Fragment>
      ) : (
        <p>データ読み込み中</p>
      )}
    </div>
  );
};

export default MonsterView;
