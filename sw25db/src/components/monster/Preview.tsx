import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MonsterViewTop } from './viewparts/top';
import { MonsterViewStatus } from './viewparts/status';
import { MonsterViewParts } from './viewparts/parts';
import { MonsterViewAbilitys } from './viewparts/abilitys';
import { MonsterViewBootys } from './viewparts/bootys';
import React from 'react';
import { CopyMonsterPiece } from './viewparts/copyPiece';
import { humanRace, race } from './uniqueAbility/human';
import { magicMonsterUnique } from './uniqueAbility/magicMonster';
import { undeadUnique } from './uniqueAbility/undead';
import { golemUnique, golemUniqueStatus } from './uniqueAbility/golem';
import { ancientFairyUnique, commonFairyUnique } from './uniqueAbility/fairy';
import { familia2Unique, familiaUnique, familiaUniqueStatus1, familiaUniqueStatus2 } from './uniqueAbility/familia';
import { Button } from '@mui/material';

type Props = {
  monsters: monster.monster[]
}

const MonsterView = (props: Props) => {
  const [mons, setMons] = useState<monster.monster | undefined>()
  const [useLevelId, setUseLevelId] = useState(0)
  const [core, setCore] = useState<string[]>([])
  const [selectArray, setSelectArray] = useState<string[]>([])
  const [unique, setUnique] = useState<monster.ability[] | null>(null)
  const [hRace, setHRace] = useState<race>(humanRace[0])
  const [fixedStatus, setFixedStatus] = useState<monster.fixedStatus>({})
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);

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

  const navigate = useNavigate()
  const duplicate = () => {
    navigate(`/monster/duplicate/${name}`)
  }
  const edit = () => {
    navigate(`/monster/edit/${name}`)
  }

  useEffect(() => {
    for (let i = 0; i < props.monsters.length; i++) {
      if (!props.monsters[i].Top) {
        continue
      }
      if (props.monsters[i].Top.name === name) {
        setMons(props.monsters[i])
        console.log(props.monsters[i]);
        return
      }
    }
  }, [props.monsters])

  useEffect(() => {
    setUnique(null)
    setFixedStatus({})
    switch (mons?.Top.race) {
      case "人族":
        setFixedStatus({ perc: hRace.fixPerc ?? undefined })
        if (mons.Top.lv < 6) {
          setUnique(hRace?.raceUnique1 ? hRace.raceUnique1 : null)
        } else if (mons.Top.lv < 11) {
          setUnique(hRace?.raceUnique6 ? hRace.raceUnique6 : null)
        } else {
          setUnique(hRace?.raceUnique11 ? hRace.raceUnique11 : null)
        }
        break;
      case "魔法生物":
        setUnique(magicMonsterUnique)
        break;
      case "魔動機":
        setUnique(magicMonsterUnique)
        break
      case "アンデッド":
        setUnique(undeadUnique)
        break;
      case "ゴーレム":
        setFixedStatus(golemUniqueStatus)
        setUnique(golemUnique)
        break;
      case "妖精":
        if (mons.Top.subRace! === "通常種") {
          setUnique(commonFairyUnique)
        } else {
          setUnique(ancientFairyUnique)
        }
        break;
      case "ファミリア":
        if (mons.Top.lv >= 7) {
          setFixedStatus(familiaUniqueStatus1)
          setUnique(familia2Unique)
        } else {
          setFixedStatus(familiaUniqueStatus2)
          setUnique(familiaUnique)
        }
        break;
      case '騎獣':
        if (mons.Top.subRace) {
          if (mons.Top.subRace == '魔動機') {
            setUnique(magicMonsterUnique)
          }
        }
        break
      default:
        break;
    }
  }, [mons, hRace])

  return (
    <div>
      {mons ? (
        <React.Fragment>
          <CopyMonsterPiece monster={mons} levelId={useLevelId} hRace={hRace} />
          <div>
            <Button style={{ margin: '1em' }} variant='contained' onClick={edit}>編集</Button>
            <Button style={{ margin: '1em' }} variant='contained' onClick={duplicate}>複製</Button>
          </div>
          <MonsterViewTop top={mons.Top} hRace={hRace} setHRace={setHRace} />
          <MonsterViewStatus fixedStatus={fixedStatus} status={mons.Status} hRace={hRace} top={mons.Top} />
          <MonsterViewParts parts={mons.Parts} useLevelId={useLevelId} setUseLevelId={setUseLevelId} core={core} setCore={setCore} hRace={hRace} />
          <hr />
          <h2>特殊能力 {mons.Abilitys.max ? <>最大値={mons.Abilitys.max}</> : null}</h2>
          <hr />
          <MonsterViewAbilitys unique={unique} abilitys={mons.Abilitys} selectArray={selectArray} handleChange={handleChange} />
          {mons.Bootys && mons.Bootys.length != 0 ? <React.Fragment>
            <hr />
            <h2>戦利品</h2>
            <MonsterViewBootys bootys={mons.Bootys} />
          </React.Fragment> : <></>}
          <hr />
          <h3>解説</h3>
          <hr />
          {mons.Explanation}
        </React.Fragment>
      ) : (
        <p>データ読み込み中</p>
      )}
    </div>
  );
};

export default MonsterView;
