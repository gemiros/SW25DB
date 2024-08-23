import { styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material"
import React, { useEffect, useState } from "react"
import { race } from "../uniqueAbility/human"

type Props = {
  parts: monster.part[]
  hRace: race
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center',
    border: '1px #ffffff solid'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: 'center',
    border: '1px #aaaaaa solid'
  },
}));

export const MonsterViewPartItem = (props: Props) => {
  const [fixHit, setFixHit] = useState(0)
  const [fixDamage, setFixDamage] = useState(0)
  const [fixAvoid, setFixAvoid] = useState(0)
  const [fixProtect, setFixProtect] = useState(0)
  const [fixHP, setFixHP] = useState(0)
  const [fixMP, setFixMP] = useState(0)
  useEffect(() => {
    setFixHit(props.hRace.fixPart.hit)
    setFixDamage(props.hRace.fixPart.damage)
    setFixAvoid(props.hRace.fixPart.avoid)
    setFixProtect(props.hRace.fixPart.protect)
    setFixHP(props.hRace.fixPart.hp)
    setFixMP(Number(props.hRace.fixPart.mp))
  }, [props.hRace])
  return (
    <TableContainer >
      <Table style={{ border: '1px #000000 solid' }}>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>攻撃方法</StyledTableCell>
            <StyledTableCell>命中力</StyledTableCell>
            <StyledTableCell>打撃点</StyledTableCell>
            <StyledTableCell>回避力</StyledTableCell>
            <StyledTableCell>防護点</StyledTableCell>
            <StyledTableCell>HP</StyledTableCell>
            <StyledTableCell>MP</StyledTableCell>
            {props.parts[0].lifeRes ? <StyledTableCell>生命抵抗力</StyledTableCell> : (<></>)}
            {props.parts[0].mindRes ? <StyledTableCell>精神抵抗力</StyledTableCell> : (<></>)}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {props.parts.map((row, idx) => (
            <TableRow key={idx}>
              <StyledTableCell >{row.name}</StyledTableCell>
              <StyledTableCell>{row.hit + (idx === 0 ? fixHit : 0)}{`(${row.hit + (idx === 0 ? fixHit : 0) + 7})`}</StyledTableCell>
              <StyledTableCell>2d{(row.damage + (idx === 0 ? fixDamage : 0)) >= 0 ? `+${row.damage + (idx === 0 ? fixDamage : 0)}` : `-${row.damage + (idx === 0 ? fixDamage : 0)}`}</StyledTableCell>
              <StyledTableCell>{row.avoid + (idx === 0 ? fixAvoid : 0)}{`(${row.avoid + (idx === 0 ? fixAvoid : 0) + 7})`}</StyledTableCell>
              <StyledTableCell>{row.protect + (idx === 0 ? fixProtect : 0)}</StyledTableCell>
              <StyledTableCell>{row.hp + (idx === 0 ? fixHP : 0)}</StyledTableCell>
              <StyledTableCell>{(idx === 0 ? fixMP : 0) ? Number(row.mp) + (idx === 0 ? fixMP : 0) : row.mp}</StyledTableCell>
              {props.parts[idx].lifeRes ? <StyledTableCell>{row.lifeRes}{`(${row.lifeRes! + 7})`}</StyledTableCell> : (<></>)}
              {props.parts[idx].mindRes ? <StyledTableCell>{row.mindRes}{`(${row.mindRes! + 7})`}</StyledTableCell> : (<></>)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}