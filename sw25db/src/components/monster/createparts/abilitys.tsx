import { useEffect, useState } from "react"
import { AbilitysProps } from "./props"
import { StatusInput } from "./foundationStatus"
import { handleChange } from "../../utilFunc/utilFunc"
import { Accordion, AccordionDetails, AccordionSummary, Button, Table, TableBody, Typography } from "@mui/material"
import { AbilityItem } from "./abilityItem"
import { abilityInit } from "../../const/monster"
import { AddCircle, KeyboardArrowDown, KeyboardArrowUp, RemoveCircle, } from "@mui/icons-material"
import CachedIcon from '@mui/icons-material/Cached';
import { humanRace } from "../uniqueAbility/human"
import { commonFairyUnique, ancientFairyUnique } from "../uniqueAbility/fairy"
import { familia2Unique, familiaUnique } from "../uniqueAbility/familia"
import { golemUnique } from "../uniqueAbility/golem"
import { magicMonsterUnique } from "../uniqueAbility/magicMonster"
import { undeadUnique } from "../uniqueAbility/undead"
import { UniqueAccordion } from "../viewparts/abilitys"

export const Abilitys = (props: AbilitysProps) => {
  const { partNameList, top, abilitys, setAbilitys } = props
  const [max, setMax] = useState<number>(0)
  const [expanded, setExpanded] = useState(false)
  const [unique, setUnique] = useState<monster.ability[] | null>(null)
  useEffect(() => {
    setUnique(null)
    switch (top.race) {
      case "人族":
        if (top.lv < 6) {
          setUnique(humanRace[0].raceUnique1!)
        } else if (top.lv < 11) {
          setUnique(humanRace[0].raceUnique6!)
        } else {
          setUnique(humanRace[0].raceUnique11!)
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
        setUnique(golemUnique)
        break;
      case "妖精":
        if (top.subRace! === "通常種") {
          setUnique(commonFairyUnique)
        } else {
          setUnique(ancientFairyUnique)
        }
        break;
      case "ファミリア":
        if (top.lv >= 7) {
          setUnique(familia2Unique)
        } else {
          setUnique(familiaUnique)
        }
        break;
      case '騎獣':
        if (top.subRace) {
          if (top.subRace == '魔動機') {
            setUnique(magicMonsterUnique)
          }
        }
        break
      default:
        break;
    }
  }, [top])
  const partsPlus = () => {
    if (abilitys.abilitys.length !== 0) {
      const tmpAbilitys = structuredClone(abilitys)
      tmpAbilitys.abilitys.push(structuredClone(abilityInit))
      setAbilitys(tmpAbilitys)

    } else {
      const tmpAbilitys: monster.abilitys = { abilitys: [structuredClone(abilityInit)] }
      setAbilitys(tmpAbilitys)
    }
  }
  const partsMinus = () => {
    if (abilitys.abilitys.length !== 0) {
      const tmpAbilitys = structuredClone(abilitys)
      tmpAbilitys.abilitys.pop()
      setAbilitys(tmpAbilitys)
    }
  }
  const allClear = () => {
    setAbilitys({ abilitys: [] })
  }

  useEffect(() => {
    const tmp = structuredClone(abilitys)
    tmp.max = max >= 1 ? max : undefined
    setAbilitys(tmp)
  }, [max])
  useEffect(() => {
    setMax(abilitys.max ?? 0)
  }, [props.paramName])
  return <div style={{ marginTop: '1em' }}>
    <hr></hr>
    <h3>特殊能力</h3>
    {top.race == 'ゴーレム' ? <StatusInput style={{ width: '6em' }} inputName={"最大値"} value={max} onChange={handleChange(setMax, Number)} ></StatusInput> : null}
    <div>
      {unique ? <Accordion style={{ margin: '1em', padding: '0em', backgroundColor: '#f0f0f0', border: '1px solid #ddd', borderRadius: '1em' }}>
        <AccordionSummary expandIcon={expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>分類所持特殊能力</Typography>
        </AccordionSummary>
        <AccordionDetails>{unique.map((item, id) =>
          <UniqueAccordion key={id} kind={item.kind} name={item.name} explain={item.explain} />
        )}
        </AccordionDetails>
      </Accordion> : null}
    </div>
    <div style={{ paddingBottom: '1em', justifyItems: 'center' }}>
      <Button variant="contained" onClick={partsPlus}>能力追加<AddCircle /></Button>
      <Button variant="contained" onClick={partsMinus}>能力削除<RemoveCircle /></Button>
      <Button variant="contained" onClick={allClear}>クリア<CachedIcon /></Button>
    </div>
    <Table style={{ width: '716px' }} sx={{ border: 'none' }}>
      <TableBody>
        {abilitys.abilitys.map((_abi, idx) =>
          <AbilityItem paramName={props.paramName} race={top.race} key={idx} idx={idx} Abilitys={abilitys} setAbilitys={setAbilitys} partNameList={partNameList}></AbilityItem>)}
      </TableBody>
    </Table>
  </div>
}