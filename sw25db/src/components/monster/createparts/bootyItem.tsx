import styled from "@emotion/styled";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import { TableCell, tableCellClasses, TableRow, Button, OutlinedInput, InputAdornment, Checkbox, TextField, SxProps, Theme, FormControl, InputLabel, ListItemText, MenuItem, Select } from "@mui/material";
import { useState, useEffect } from "react";
import { cardKindList } from "../../const/monster";
import { MultipleSelectCheckmarks } from "../../utilComponent/select";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: 'center',
    border: 'none',
  },
}));

type BootyItemProps = {
  row: monster.booty;
  index: number
  totalRows: number
  onMoveRow: (index: number, direction: "up" | "down") => void
  onInputChange: (index: number, field: keyof monster.booty, value: any) => void
};

export const BootyItem = (props: BootyItemProps) => {
  const { row, index, totalRows, onMoveRow, onInputChange } = props
  const [isCard, setIsCard] = useState<boolean>(row.isCard ?? true);

  const buttonsSpan = 1
  const diceSpan = 3
  const itemSpan = 5
  const gamelSpan = 3
  const isCardSpan = 1
  const cardKindSpan = 4
  const cardRankSpan = 1
  const [emptySpan, setEmptySpan] = useState<number>(0)

  useEffect(() => {
    setEmptySpan(
      20
      - buttonsSpan
      - diceSpan
      - itemSpan
      - gamelSpan
      - isCardSpan
      - (cardKindSpan + cardRankSpan)
    )
  }, [isCard])

  useEffect(() => {
    if (isCard) {
      let setRank = ''
      if (row.gamel < 100) {
        setRank = 'B'
      } else if (row.gamel < 1000) {
        setRank = 'A'
      } else if (row.gamel < 10000) {
        setRank = 'S'
      } else {
        setRank = 'SS'
      }
      onInputChange(index, 'cardRank', setRank)
    } else {
      onInputChange(index, 'cardRank', '')
    }
  }, [row.gamel, isCard])
  useEffect(() => {
    onInputChange(index, 'isCard', isCard)
  }, [isCard])
  return (
    <TableRow>
      <StyledTableCell style={{ padding: '0', width: `${5 * buttonsSpan}%` }}>
        <Button style={{ padding: '0' }} onClick={() => onMoveRow(index, "up")} disabled={index === 0}><ArrowDropUp /></Button>
        <Button style={{ padding: '0' }} onClick={() => onMoveRow(index, "down")} disabled={index === totalRows - 1}><ArrowDropDown /></Button>
      </StyledTableCell>

      <StyledTableCell style={{ padding: '0', height: 'auto', width: `${5 * diceSpan}%` }}>
        <TextField
          label="出目"
          value={row.dice}
          onChange={(e) => onInputChange(index, 'dice', e.target.value)}
        />
      </StyledTableCell>
      <StyledTableCell style={{ padding: '0', height: 'auto', width: `${5 * itemSpan}%` }}>
        <TextField label="アイテム" value={row.item} onChange={(e) => onInputChange(index, 'item', e.target.value)} />
      </StyledTableCell>
      <StyledTableCell style={{ padding: '0', height: 'auto', width: `${5 * gamelSpan}%` }}>
        <OutlinedInput inputProps={{
          min: 0
        }} type="number" value={row.gamel} onChange={(e) => onInputChange(index, 'gamel', e.target.value)} endAdornment={<InputAdornment position="end">G</InputAdornment>}></OutlinedInput>
      </StyledTableCell>
      <StyledTableCell style={{ padding: '0', height: 'auto', width: `${5 * isCardSpan}%` }}>
        <Checkbox checked={isCard} value={row.isCard} onChange={() => { setIsCard(!isCard) }} />
      </StyledTableCell>
      {isCard ? <>
        <StyledTableCell style={{ padding: '0', height: 'auto', width: `${5 * cardKindSpan}%` }}>
          <MultipleSelectCheckmarks formSX={{ width: '100%' }} divStyle={{}} useData={cardKindList} tagName="カード種類" selectData={row.cardKind ?? []} index={index} onInputChange={onInputChange} />
        </StyledTableCell>
        <StyledTableCell style={{ padding: '0', height: 'auto', width: `${5 * cardRankSpan}%` }}>
          {row.cardRank}
        </StyledTableCell></> :
        <StyledTableCell colSpan={2} style={{ padding: '0', height: 'auto', width: `${5 * (cardKindSpan + cardRankSpan)}%` }}>
        </StyledTableCell>
      }
      <StyledTableCell style={{ padding: '0', height: 'auto', width: `${5 * emptySpan}%` }}></StyledTableCell>
    </TableRow>
  )
}


