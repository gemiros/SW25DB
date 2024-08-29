import { TableRow, Checkbox, styled, TableCell, tableCellClasses } from "@mui/material"
import { StatusInput } from "./foundationStatus"
import { useEffect, useState } from "react";
import { partInit } from "../../const/monster";
import { handleChange } from "../../utilFunc/utilFunc";
import { PartsDetailProps } from "./props";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: 'center',
    border: '1px #aaaaaa solid'
  },
}));

export const PartItem = (props: PartsDetailProps) => {
  const { idx, part, race } = props
  const [core, setCore] = useState<boolean>(false)
  const [isMP, setIsMP] = useState<boolean>(true)
  const [name, setName] = useState<string>('')
  const [hit, setHit] = useState<number>(0)
  const [damage, setDamage] = useState<number>(0)
  const [avoid, setAvoid] = useState<number>(0)
  const [protect, setProtect] = useState<number>(0)
  const [hp, setHP] = useState<number>(0)
  const [mp, setMP] = useState<number>(0)
  const [mind, setMind] = useState<number>(0)
  const [life, setLife] = useState<number>(0)

  const [isOne, setIsOne] = useState<boolean>(true)

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
    tmp.lifeRes = race == '騎獣' ? life : undefined
    tmp.mindRes = race == '騎獣' ? mind : undefined
    const tmp2 = structuredClone(props.levels)
    tmp2[props.levelId].parts[idx] = tmp
    props.setLevels(tmp2)
  }
  useEffect(() => {
    changeData()
    if (isOne) {
      props.setOneParts(prev => {
        const newData = structuredClone(prev)
        if (isOne) {
          const tmp: monster.part = {
            core: core,
            name: name,
            hit: hit,
            damage: damage,
            avoid: avoid,
            protect: protect,
            hp: hp,
            mp: String(mp),
            lifeRes: life,
            mindRes: mind
          }
          newData[idx] = tmp
        }
        return newData
      })
    }
  }, [avoid, name, hit, damage, avoid, protect, hp, mp, core, life, mind])
  useEffect(() => {
    setAvoid(part.avoid ?? 0)
    setName(part.name ?? 0)
    setHit(part.hit ?? 0)
    setDamage(part.damage ?? 0)
    setAvoid(part.avoid ?? 0)
    setProtect(part.protect ?? 0)
    setHP(part.hp ?? 0)
    setMP(Number(part.mp) ?? 0)
    setCore(part.core ?? false)
    setLife(part.lifeRes ?? 0)
    setMind(part.mindRes ?? 0)
  }, [props.paramName, part])
  useEffect(() => {
    if (props.levelId !== 0) {
      setIsOne(false)
    } else {
      setIsOne(true)
    }
  }, [props.levelId])
  useEffect(() => {
    if (isOne) {
      setName(part.name ?? 0)
      setCore(part.core ?? false)
    }
  }, [props.levels])
  return <TableRow key={idx}>
    <StyledTableCell style={{ padding: '0', height: 'auto', width: '1%' }}><Checkbox disabled={!isOne} checked={core} onChange={changeCore}></Checkbox></StyledTableCell>
    <StyledTableCell style={{ padding: '0', height: 'auto', width: '19%' }}><StatusInput disabled={!isOne} inputName="攻撃方法" value={name} onChange={handleChange(setName, (v) => v)} /></StyledTableCell>
    <StyledTableCell style={{ padding: '0', height: 'auto', width: '10%' }}><StatusInput inputName="命中力" value={hit} onChange={handleChange(setHit, Number)} /></StyledTableCell>
    <StyledTableCell style={{ padding: '0', height: 'auto', width: '10%' }}><StatusInput inputName="打撃点" value={damage} onChange={handleChange(setDamage, Number)} /></StyledTableCell>
    <StyledTableCell style={{ padding: '0', height: 'auto', width: '10%' }}><StatusInput inputName="回避力" value={avoid} onChange={handleChange(setAvoid, Number)} /></StyledTableCell>
    <StyledTableCell style={{ padding: '0', height: 'auto', width: '10%' }}><StatusInput inputName="防護点" value={protect} onChange={handleChange(setProtect, Number)} /></StyledTableCell>
    <StyledTableCell style={{ padding: '0', height: 'auto', width: '10%' }}><StatusInput inputName="HP" value={hp} onChange={handleChange(setHP, Number)} /></StyledTableCell>
    <StyledTableCell style={{ padding: '0', height: 'auto', width: '1%' }}><Checkbox checked={isMP} onChange={changeIsMP}></Checkbox></StyledTableCell>
    {isMP ? <StyledTableCell style={{ padding: '0', height: 'auto', width: '10%' }}><StatusInput inputName="MP" value={mp} onChange={handleChange(setMP, Number)} /></StyledTableCell>
      : <StyledTableCell style={{ border: 'none', padding: '0', height: 'auto', width: '10%' }}></StyledTableCell>}
    {race == '騎獣' ? <>
      <StyledTableCell style={{ padding: '0', height: 'auto', width: '10%' }}><StatusInput inputName="生命抵抗" value={life} onChange={handleChange(setLife, Number)} /></StyledTableCell>
      <StyledTableCell style={{ padding: '0', height: 'auto', width: '10%' }}><StatusInput inputName="精神抵抗" value={mind} onChange={handleChange(setMind, Number)} /></StyledTableCell>
    </> : null}
  </TableRow>
}