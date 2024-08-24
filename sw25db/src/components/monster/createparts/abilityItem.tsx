import { TableRow, Checkbox, styled, TableCell, tableCellClasses, FormControl, FormLabel, Table, TableBody, Box, TextField, Select, MenuItem, SelectChangeEvent } from "@mui/material"
import { StatusInput } from "./foundationStatus"
import React, { useEffect, useState } from "react";
import { handleChange } from "../../utilFunc/utilFunc";
import MultipleSelectCheckmarks from "./checkSelect";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: 'center',
    border: 'none',
  },
}));

const ExplanationTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: 'none'
  },
}));

type Props = {
  idx: number
  Abilitys: monster.abilitys
  setAbilitys: (l: monster.abilitys) => void
  partNameList: string[]
}

export const AbilityItem = (props: Props) => {
  const { idx, Abilitys, setAbilitys, partNameList } = props
  const [item, setItem] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [kind, setKind] = useState<string[]>([])
  const [partName, setPartName] = useState<string[]>([])
  const [useValue, setUseValue] = useState<number>(-1)
  const [magicValue, setMagicValue] = useState<number>(-1)
  const [resistSkill, setResistSkill] = useState<string>('')
  const [resistResult, setResistResult] = useState<string>('')
  const [explanation, setExplanation] = useState<string>('')

  const [isMagic, setIsMagic] = useState<boolean>(false)
  const [isUse, setIsUse] = useState<boolean>(false)

  const changeData = () => {
    const tmp = structuredClone(Abilitys)
    tmp.abilitys[idx].item = item
    tmp.abilitys[idx].kind = kind
    tmp.abilitys[idx].name = name
    const tmpUse = `${useValue >= 0 ? `/${useValue}(${useValue + 7})` : ''}${resistSkill ? `/${resistSkill}` : ''}${resistResult ? `/${resistResult}` : ''}`
    tmp.abilitys[idx].use = tmpUse !== "" ? tmpUse : undefined
    tmp.abilitys[idx].part = partName ? partName : undefined
    setAbilitys(tmp)
  }
  useEffect(() => {
    isUse ? setUseValue(0) : setUseValue(-1)
    isUse && isMagic ? setIsMagic(false) : null
  }, [isUse])
  useEffect(() => {
    isMagic ? setMagicValue(0) : setMagicValue(-1)
    isMagic && isUse ? setIsUse(false) : null
  }, [isMagic])
  useEffect(() => {
    changeData()
  }, [item, name, kind, partName, useValue, resistSkill, resistResult])
  return (<>
    <TableRow key={idx}>
      {partNameList.length > 2 ?
        <StyledTableCell style={{ padding: '0', height: 'auto', width: '30%' }} sx={{ border: 'none' }}>
          <MultipleSelectCheckmarks formSX={{ width: '100%' }} divStyle={{}} disabled={true} useData={partNameList} tagName="部位" selectData={partName} setSelectData={setPartName} />
        </StyledTableCell> : null}
      <StyledTableCell style={{ padding: '0', height: 'auto', width: '35%' }} sx={{ border: 'none' }}>
        <StatusInput inputName="能力名" value={name} onChange={handleChange(setName, (v) => v)} />
      </StyledTableCell>
      <StyledTableCell style={{ padding: '0', height: 'auto', width: '7%' }} sx={{ border: 'none' }}>
        <FormControl>
          <FormLabel>対抗</FormLabel>
          <Checkbox style={{ margin: '-1em' }} checked={isUse} onChange={() => { setIsUse(!isUse) }}></Checkbox>
        </FormControl>
      </StyledTableCell>
      <StyledTableCell style={{ padding: '0', height: 'auto', width: '7%' }} sx={{ border: 'none' }}>
        <FormControl>
          <FormLabel>魔法</FormLabel>
          <Checkbox style={{ margin: '-1em' }} checked={isMagic} onChange={() => { setIsMagic(!isMagic) }}></Checkbox>
        </FormControl>
      </StyledTableCell>
      {isMagic ? <><StyledTableCell style={{ padding: '0', height: 'auto', width: '10%' }}>
        <StatusInput inputName="数値" value={magicValue} onChange={handleChange(setUseValue, Number)} />
      </StyledTableCell><StyledTableCell style={{ padding: '0', height: 'auto', width: '5%' }}>
          {`/ (${magicValue + 7})`}
        </StyledTableCell></>
        : <StyledTableCell style={{ width: '15%' }} sx={{ border: 'none' }}></StyledTableCell>
      }
      {partNameList.length! <= 2 ? <StyledTableCell style={{ width: '30%' }} sx={{ border: 'none' }}></StyledTableCell> : null}
      <StyledTableCell style={{ width: '10%' }} sx={{ border: 'none' }}></StyledTableCell>
    </TableRow>
    {isUse ?
      <TableRow key={`${idx}-use`}>
        <StyledTableCell colSpan={6} sx={{ border: 'none', padding: '0', paddingTop: '1em' }}>
          <StyledTableCell style={{ padding: '0', height: 'auto', width: '10%' }} sx={{ border: 'none' }}><StatusInput inputName="数値" value={useValue} onChange={handleChange(setUseValue, Number)} /></StyledTableCell>
          <StyledTableCell style={{ padding: '0', height: 'auto', width: '6%' }} sx={{ border: 'none' }}>{`/ (${useValue + 7}) `}</StyledTableCell>
          <StyledTableCell style={{ padding: '0', height: 'auto', width: '42%' }} sx={{ border: 'none' }}><StatusInput inputName="対抗基準値" value={resistSkill} onChange={handleChange(setResistSkill, v => v)} /></StyledTableCell>
          <StyledTableCell style={{ padding: '0', height: 'auto', width: '42%' }} sx={{ border: 'none' }}><StatusInput inputName="対抗結果" value={resistResult} onChange={handleChange(setResistResult, v => v)} /></StyledTableCell>
        </StyledTableCell>
      </TableRow>
      : null}
    <TableRow key={`${idx}-exp`}>
      <ExplanationTableCell colSpan={8} sx={{ border: 'none', padding: '0', paddingTop: '1em', paddingBottom: '1em' }}>
        <Box style={{ width: '100%' }}>
          <TextField multiline style={{ width: '50em' }} label="能力詳細" value={explanation} onChange={handleChange(setExplanation, v => v)} />
        </Box></ExplanationTableCell>
    </TableRow>
  </>
  )
}