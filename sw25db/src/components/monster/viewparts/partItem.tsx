import { styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material"
import React from "react"

type Props = {
  parts: monster.part[]
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
              <StyledTableCell>{row.hit}{`(${row.hit + 7})`}</StyledTableCell>
              <StyledTableCell>2d+{row.damage}</StyledTableCell>
              <StyledTableCell>{row.avoid}{`(${row.avoid + 7})`}</StyledTableCell>
              <StyledTableCell>{row.protect}</StyledTableCell>
              <StyledTableCell>{row.hp}</StyledTableCell>
              <StyledTableCell>{row.mp}</StyledTableCell>
              {props.parts[idx].lifeRes ? <StyledTableCell>{row.lifeRes}{`(${row.lifeRes! + 7})`}</StyledTableCell> : (<></>)}
              {props.parts[idx].mindRes ? <StyledTableCell>{row.mindRes}{`(${row.mindRes! + 7})`}</StyledTableCell> : (<></>)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}