import { TableRow, TableCell, OutlinedInput, InputAdornment, Checkbox, Select, FormControl, InputLabel, MenuItem, SelectChangeEvent, styled, tableCellClasses } from "@mui/material"
import { handleChange } from "../../utilFunc/utilFunc"
import { StatusInput } from "./foundationStatus"
import { useEffect, useState } from "react"
import { cardKindList, cardLankList } from "../../const/monster"
import MultipleSelectCheckmarks from "./checkSelect"
import { BootysProps } from "./props"


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: 'center',
    border: 'none',
  },
}));

export const BootyItem = (props: BootysProps) => {
  const { bootys, setBootys, id } = props
  const [dice, setDice] = useState<string>("")
  const [item, setItem] = useState<string>("")
  const [gamel, setGamel] = useState<number>(0)
  const [isCard, setIsCard] = useState<boolean>(true)
  const [cardRank, setCardRank] = useState<string>("B")
  const [cardKind, setCardKind] = useState<string[]>([])

  const handle = (event: SelectChangeEvent) => {
    setCardRank(event.target.value);
  };
  useEffect(() => {
    setCardRank('B')
    setCardKind([])
  }, [isCard])
  useEffect(() => {
    const booty: monster.booty = {
      dice: dice,
      item: item,
      gamel: gamel
    }
    if (isCard) {
      booty.cardKind = cardKind
      booty.cardRank = cardRank
    }
    const tmp = structuredClone(bootys)
    tmp[id!] = booty
    setBootys(tmp)
  }, [dice, item, gamel, isCard, cardRank, cardKind])
  useEffect(() => {
    if (!id) {
      return
    }
    setDice(bootys[id].dice ?? '')
    setItem(bootys[id].item ?? '')
    setCardRank(bootys[id].cardRank ?? 'B')
    setGamel(bootys[id].gamel ?? 0)
    setCardKind(bootys[id].cardKind ?? [])
  }, [props.paramName])
  useEffect(() => {
    if (!isCard) {
      setCardRank('')
    }
    if (gamel < 100) {
      setCardRank('B')
    } else if (gamel < 1000) {
      setCardRank('A')
    } else if (gamel < 10000) {
      setCardRank('S')
    } else {
      setCardRank('SS')
    }
  }, [gamel])
  return (
    <TableRow>
      <StyledTableCell style={{ padding: '0', height: 'auto', width: '15%' }}>
        <StatusInput inputName="出目" value={dice} onChange={handleChange(setDice, (v) => v)} />
      </StyledTableCell>
      <StyledTableCell style={{ padding: '0', height: 'auto', width: '25%' }}>
        <StatusInput inputName="アイテム" value={item} onChange={handleChange(setItem, (v) => v)} />
      </StyledTableCell>
      <StyledTableCell style={{ padding: '0', height: 'auto', width: '20%' }}>
        <OutlinedInput inputProps={{
          min: 0
        }} type="number" value={gamel} onChange={handleChange(setGamel, Number)} endAdornment={<InputAdornment position="end">G</InputAdornment>}></OutlinedInput>
      </StyledTableCell>
      <StyledTableCell style={{ padding: '0', height: 'auto', width: '5%' }}>
        <Checkbox checked={isCard} value={isCard} onChange={() => { setIsCard(!isCard) }} />
      </StyledTableCell>
      {isCard ? <>
        <StyledTableCell style={{ padding: '0', height: 'auto', width: '20%' }}>
          <MultipleSelectCheckmarks formSX={{ width: '100%' }} divStyle={{}} disabled={true} useData={cardKindList} tagName="カード種類" selectData={cardKind} setSelectData={setCardKind} />
        </StyledTableCell>
        <StyledTableCell style={{ padding: '0', height: 'auto', width: '15%' }}>
          {cardRank}
          {/* <FormControl fullWidth>
            <InputLabel>カードランク</InputLabel>
            <Select fullWidth value={cardRank} onChange={handle}>
              {cardLankList.map((r, id) => <MenuItem key={id} value={r}>{r}</MenuItem>)}
            </Select>
          </FormControl> */}
        </StyledTableCell></> : <><StyledTableCell style={{ padding: '0', height: 'auto', width: '20%' }}></StyledTableCell><StyledTableCell style={{ padding: '0', height: 'auto', width: '15%' }}></StyledTableCell></>}
    </TableRow>
  )
}