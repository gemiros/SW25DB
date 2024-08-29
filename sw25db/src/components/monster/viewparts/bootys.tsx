import { styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material"

type Props = {
  bootys: monster.booty[]
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
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
export const MonsterViewBootys = (props: Props) => {
  return (
    <TableContainer>
      <Table aria-label="customized table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell sx={{ maxWidth: 100 }}>出目</StyledTableCell>
            <StyledTableCell>アイテム</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {props.bootys.map((booty, id) => (
            <StyledTableRow key={id}>
              <StyledTableCell sx={{ maxWidth: 100 }} align="left">{booty.dice}</StyledTableCell>
              <StyledTableCell align="left">{booty.item}{booty.gamel ? `(${booty.gamel}G / ${booty.cardKind?.join('')}${booty.cardRank})` : null}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}