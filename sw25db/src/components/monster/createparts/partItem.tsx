import { TableRow, Checkbox, styled, TableCell, tableCellClasses } from "@mui/material"
import { StatusInput } from "./foundationStatus"
import { useEffect, useState } from "react";
import { partInit } from "../../const/monster";
import { handleChange } from "../../utilFunc/utilFunc";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center',
    // border: '1px #ffffff solid'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: 'center',
    border: '1px #aaaaaa solid'
  },
}));

type Props = {
  levelId: number
  idx: number
  part: monster.part
  levels: monster.level[]
  setLevels: (l: monster.level[]) => void
}

export const PartItem = (props: Props) => {
  const { idx, part } = props
  const [core, setCore] = useState<boolean>(false)
  const [isMP, setIsMP] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [hit, setHit] = useState<number>(0)
  const [damage, setDamage] = useState<number>(0)
  const [avoid, setAvoid] = useState<number>(0)
  const [protect, setProtect] = useState<number>(0)
  const [hp, setHP] = useState<number>(0)
  const [mp, setMP] = useState<number>(-1)

  const changeIsMP = () => {
    setIsMP(!isMP)
    setMP(0)
  }
  const changeCore = () => {
    setCore(!core)
  }
  const changeData = () => {
    const tmp = structuredClone(part)
    tmp.core = core
    tmp.avoid = avoid
    tmp.name = name
    tmp.hit = hit
    tmp.damage = damage
    tmp.avoid = avoid
    tmp.protect = protect
    tmp.hp = hp
    tmp.mp = mp < 0 ? '-' : String(mp)
    const tmp2 = structuredClone(props.levels)
    tmp2[props.levelId].parts[idx] = tmp
    props.setLevels(tmp2)
  }
  useEffect(() => {
    changeData()
  }, [avoid, name, hit, damage, avoid, protect, hp, mp, core])
  return <TableRow key={idx}>
    <StyledTableCell style={{ padding: '0', height: 'auto', width: '1em' }}><Checkbox checked={core} onChange={changeCore}></Checkbox></StyledTableCell>
    <StyledTableCell style={{ padding: '0', height: 'auto', width: '10em' }}><StatusInput inputName="攻撃方法" value={name} onChange={handleChange(setName, (v) => v)} /></StyledTableCell>
    <StyledTableCell style={{ padding: '0', height: 'auto', width: '6em' }}><StatusInput inputName="命中力" value={hit} onChange={handleChange(setHit, Number)} /></StyledTableCell>
    <StyledTableCell style={{ padding: '0', height: 'auto', width: '6em' }}><StatusInput inputName="打撃点" value={damage} onChange={handleChange(setDamage, Number)} /></StyledTableCell>
    <StyledTableCell style={{ padding: '0', height: 'auto', width: '6em' }}><StatusInput inputName="回避力" value={avoid} onChange={handleChange(setAvoid, Number)} /></StyledTableCell>
    <StyledTableCell style={{ padding: '0', height: 'auto', width: '6em' }}><StatusInput inputName="防護点" value={protect} onChange={handleChange(setProtect, Number)} /></StyledTableCell>
    <StyledTableCell style={{ padding: '0', height: 'auto', width: '4em' }}><StatusInput inputName="HP" value={hp} onChange={handleChange(setHP, Number)} /></StyledTableCell>
    <StyledTableCell style={{ padding: '0', height: 'auto', width: '1em' }}><Checkbox checked={isMP} onChange={changeIsMP}></Checkbox></StyledTableCell>
    {isMP ? <StyledTableCell style={{ padding: '0', height: 'auto', width: '4em' }}><StatusInput inputName="MP" value={mp} onChange={handleChange(setMP, Number)} /></StyledTableCell> : null}
  </TableRow>
}