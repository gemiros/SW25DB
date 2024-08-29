import { TableRow, Checkbox, styled, TableCell, tableCellClasses, FormControl, FormLabel, Table, TableBody, Box, TextField, Select, MenuItem, SelectChangeEvent, FormControlLabel, FormGroup, InputLabel, TableHead, Button, Icon } from "@mui/material"
import { StatusInput } from "./foundationStatus"
import React, { useEffect, useState } from "react";
import { handleChange } from "../../utilFunc/utilFunc";
import MultipleSelectCheckmarks from "./checkSelect";
import { abilityKindList, golemAllSizeItemList, golemItemList } from "../../const/monster";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";


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
  race: string
  idx: number
  Abilitys: monster.abilitys
  setAbilitys: React.Dispatch<React.SetStateAction<monster.abilitys>>
  partNameList: string[]
  paramName: string
  changeFlg: boolean
  setChangeFlg: React.Dispatch<React.SetStateAction<boolean>>
}

export const AbilityItem = (props: Props) => {
  const { idx, Abilitys, setAbilitys, partNameList, race, changeFlg, setChangeFlg } = props
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
    const tmpUse = isUse ?
      `${useValue >= 0 ?
        `/${useValue}(${useValue + 7})` :
        ''}${resistSkill ?
          `/${resistSkill}` :
          ''}${resistResult ?
            `/${resistResult}` :
            ''}` :
      isMagic ? `/${magicValue}(${magicValue + 7})` : ''
    tmp.abilitys[idx].use = tmpUse ?? undefined
    tmp.abilitys[idx].part = partName ?? undefined
    console.log(explanation);

    tmp.abilitys[idx].explain = explanation ?? undefined
    setAbilitys(tmp)
  }
  const checkBoxCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (kind.includes(e.target.value)) {
      let tmp = structuredClone(kind)
      tmp = tmp.filter((t) => t !== e.target.value)
      setKind(tmp)
    } else {
      setKind([...kind, e.target.value])
    }
  }
  const onChangeItem = (event: SelectChangeEvent) => {
    setItem(event.target.value);
  };

  const copyAbility = (id: number) => {
    const tmp = structuredClone(Abilitys)
    tmp.abilitys.push(structuredClone(Abilitys.abilitys[id]))
    setAbilitys(tmp)
  }

  const upMoveAbility = (id: number) => {
    if (id === 0) {
      return
    }
    setAbilitys((prev) => {
      [prev.abilitys[id], prev.abilitys[id - 1]] = [prev.abilitys[id - 1], prev.abilitys[id]]
      return prev
    })
    setChangeFlg(!changeFlg)
  }
  const downMoveAbility = (id: number) => {
    if (id === Abilitys.abilitys.length - 1) {
      return
    }
    setAbilitys((prev) => {
      [prev.abilitys[id], prev.abilitys[id + 1]] = [prev.abilitys[id + 1], prev.abilitys[id]]
      return prev
    })
    setChangeFlg(!changeFlg)
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
  }, [item, name, kind, partName, useValue, resistSkill, resistResult, explanation])
  useEffect(() => {
    setItem(Abilitys.abilitys[idx].item ?? '')
    setName(Abilitys.abilitys[idx].name ?? '')
    setKind(Abilitys.abilitys[idx].kind ?? [])
    setPartName(Abilitys.abilitys[idx].part ?? [])
    if (Abilitys.abilitys[idx].useValue) {
      setIsUse(true)
    }
    if (Abilitys.abilitys[idx].magic) {
      setIsMagic(true)
    }
    setUseValue(Abilitys.abilitys[idx].useValue ?? -1)
    setMagicValue(Abilitys.abilitys[idx].magic ?? -1)
    setResistSkill(Abilitys.abilitys[idx].resistSkill ?? '')
    setResistResult(Abilitys.abilitys[idx].resistResult ?? '')
    setExplanation(Abilitys.abilitys[idx].explain ?? '')
  }, [props.paramName])
  useEffect(() => {
    setItem(Abilitys.abilitys[idx].item ?? '')
    setName(Abilitys.abilitys[idx].name ?? '')
    setKind(Abilitys.abilitys[idx].kind ?? [])
    setPartName(Abilitys.abilitys[idx].part ?? [])
    if (Abilitys.abilitys[idx].useValue) {
      setIsUse(true)
    }
    if (Abilitys.abilitys[idx].magic) {
      setIsMagic(true)
    }
    setUseValue(Abilitys.abilitys[idx].useValue ?? -1)
    setMagicValue(Abilitys.abilitys[idx].magic ?? -1)
    setResistSkill(Abilitys.abilitys[idx].resistSkill ?? '')
    setResistResult(Abilitys.abilitys[idx].resistResult ?? '')
    setExplanation(Abilitys.abilitys[idx].explain ?? '')
  }, [changeFlg])
  return (
    <StyledTableCell style={{ width: '100%' }}>
      <Table style={{ width: '100%' }}>
        <TableHead>
          <TableRow>
            {Array(20).fill(0).map((_c, i) => <StyledTableCell colSpan={1} key={i} style={{ padding: '0', width: '5%' }}>{i}</StyledTableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          <Abi1Row
            kind={kind}
            checkBoxCheck={checkBoxCheck}
            race={race}
            partNameList={partNameList}
            item={item}
            onChangeItem={onChangeItem}
            partName={partName}
            setPartName={setPartName}
            idx={idx}
            copyAbility={copyAbility}
            upMoveAbility={upMoveAbility}
            downMoveAbility={downMoveAbility}
          />
          <Abi2Row idx={idx} race={race}
            item={item} onChangeItem={onChangeItem}
            partNameList={partNameList} name={name}
            setName={setName} partName={partName}
            setPartName={setPartName} isUse={isUse}
            setIsUse={setIsUse} isMagic={isMagic}
            setIsMagic={setIsMagic} magicValue={magicValue}
            setUseValue={setUseValue} useValue={useValue}
            resistSkill={resistSkill} setResistSkill={setResistSkill}
            resistResult={resistResult} setResistResult={setResistResult} />

          <Abi3Row idx={idx} explanation={explanation} setExplanation={setExplanation} />
        </TableBody>
      </Table>
    </StyledTableCell>
  )
}

type abi1RowProps = {
  kind: string[]
  checkBoxCheck: (e: React.ChangeEvent<HTMLInputElement>) => void
  race: string
  partNameList: string[]
  item: string
  onChangeItem: (event: SelectChangeEvent) => void
  partName: string[]
  setPartName: (p: string[]) => void
  idx: number
  copyAbility: (id: number) => void
  upMoveAbility: (id: number) => void
  downMoveAbility: (id: number) => void
}
const Abi1Row = (props: abi1RowProps) => {
  const { kind, checkBoxCheck,
    race, partNameList,
    item, onChangeItem,
    partName, setPartName,
    idx, copyAbility, upMoveAbility, downMoveAbility
  } = props
  const [emptySpan, setEmptySpan] = useState<number>(0)
  const buttonsSpan = 2
  const kindSpan = 6
  const golemSpan = 6
  const partSpan = 5
  const [isGolem, setIsGolem] = useState<boolean>(false)
  const [isPart, setIsPart] = useState<boolean>(false)
  useEffect(() => {
    setIsGolem(race === 'ゴーレム')
  }, [race])
  useEffect(() => {
    setIsPart(partNameList.length > 2)
  }, [partNameList])
  useEffect(() => {
    setEmptySpan(20 - (isGolem ? golemSpan : 0) - (isPart ? partSpan : 0) - kindSpan - buttonsSpan)
  }, [isGolem, isPart])
  return (
    <TableRow>
      <StyledTableCell colSpan={buttonsSpan} style={{ padding: '0' }}>
        <Button style={{ padding: '0' }} onClick={() => { upMoveAbility(idx) }}><ArrowDropUp /></Button>
        <Button style={{ padding: '0' }} onClick={() => { downMoveAbility(idx) }}><ArrowDropDown /></Button>
        <Button style={{ padding: '0' }} onClick={() => { copyAbility(idx) }}>複製</Button>
      </StyledTableCell>
      {isPart ?
        <StyledTableCell colSpan={partSpan} style={{ padding: '0', height: 'auto' }} sx={{ border: 'none' }}>
          <MultipleSelectCheckmarks formSX={{ width: '100%' }} divStyle={{}} disabled={true} useData={partNameList} tagName="部位" selectData={partName} setSelectData={setPartName} />
        </StyledTableCell> : null
      }
      <StyledTableCell colSpan={kindSpan} style={{ padding: '0', height: 'auto', width: '100%' }}>
        {abilityKindList.map((abiKind, id) =>
          <FormControl key={id} >
            <FormGroup row>
              <FormControlLabel
                labelPlacement="top"
                style={{ margin: '0' }}
                value={abiKind}
                control={<Checkbox checked={kind.indexOf(abiKind) !== -1}
                  onChange={checkBoxCheck} />}
                label={abiKind} />
            </FormGroup>
          </FormControl>
        )}
      </StyledTableCell>
      {isGolem ? <Abi2GolemItem span={golemSpan} item={item} onChangeItem={onChangeItem} /> : null}

      <StyledTableCell colSpan={emptySpan} style={{ padding: '0' }}></StyledTableCell>
    </TableRow>
  )
}

type abi2RowProps = {
  idx: number
  race: string
  item: string
  onChangeItem: (event: SelectChangeEvent) => void
  partNameList: string[]
  name: string
  setName: (n: string) => void
  partName: string[]
  setPartName: (p: string[]) => void
  isUse: boolean
  setIsUse: (i: boolean) => void
  isMagic: boolean
  setIsMagic: (i: boolean) => void
  magicValue: number
  setUseValue: (u: number) => void
  useValue: number
  resistSkill: string
  setResistSkill: (rs: string) => void
  resistResult: string
  setResistResult: (rr: string) => void
}

const Abi2Row = (props: abi2RowProps) => {
  const {
    idx, race,
    partNameList, name, setName,
    isUse, setIsUse, isMagic, setIsMagic,
    magicValue, setUseValue,
    useValue,
    resistSkill, setResistSkill,
    resistResult, setResistResult
  } = props
  const [isPart, setIsPart] = useState<boolean>(false)
  const [emptySpan, setEmptySpan] = useState<number>(0)
  const nameSpan = 8
  useEffect(() => {
    setIsPart(partNameList.length > 0)
  }, [partNameList])
  useEffect(() => {
    setEmptySpan(20 - nameSpan - (isUse ? 12 : 0) - (isMagic ? 4 : 0))
  }, [isPart])
  return (<TableRow key={idx}>
    <Abi2Common name={name} isUse={isUse} isMagic={isMagic} setName={setName} setIsMagic={setIsMagic} setIsUse={setIsUse} />
    {isMagic ? // 15%
      <>
        <StyledTableCell colSpan={3} style={{ padding: '0', height: 'auto' }}>
          <StatusInput inputName="数値" value={magicValue} onChange={handleChange(setUseValue, Number)} />
        </StyledTableCell><StyledTableCell style={{ padding: '0', height: 'auto' }}>
          {`/ (${magicValue + 7})`}
        </StyledTableCell>
      </>
      : null
    }
    {isUse ? <>
      <StyledTableCell colSpan={3} style={{ padding: '0', height: 'auto' }} sx={{ border: 'none' }}><StatusInput inputName="数値" value={useValue} onChange={handleChange(setUseValue, Number)} /></StyledTableCell>
      <StyledTableCell colSpan={1} style={{ padding: '0', height: 'auto' }} sx={{ border: 'none' }}>{`/ (${useValue + 7}) `}</StyledTableCell>
      <StyledTableCell colSpan={4} style={{ padding: '0', height: 'auto' }} sx={{ border: 'none' }}><StatusInput inputName="対抗基準値" value={resistSkill} onChange={handleChange(setResistSkill, v => v)} /></StyledTableCell>
      <StyledTableCell colSpan={4} style={{ padding: '0', height: 'auto' }} sx={{ border: 'none' }}><StatusInput inputName="対抗結果" value={resistResult} onChange={handleChange(setResistResult, v => v)} /></StyledTableCell>
    </> : null}
    <StyledTableCell colSpan={emptySpan} sx={{ border: 'none' }} style={{ padding: '0' }}></StyledTableCell>

  </TableRow>)
}
type abi2Common = {
  name: string
  setName: (n: string) => void
  isUse: boolean
  setIsUse: (i: boolean) => void
  isMagic: boolean
  setIsMagic: (i: boolean) => void
}
const Abi2Common = ({ name, isUse, isMagic, setName, setIsMagic, setIsUse }: abi2Common) => {
  return (
    <>
      <StyledTableCell colSpan={6} style={{ padding: '0', height: 'auto' }} sx={{ border: 'none' }}>
        <StatusInput inputName="能力名" value={name} onChange={handleChange(setName, (v) => v)} />
      </StyledTableCell>
      <StyledTableCell colSpan={1} style={{ padding: '0', height: 'auto' }} sx={{ border: 'none' }}>
        <FormControl>
          <FormLabel>対抗</FormLabel>
          <Checkbox style={{ margin: '-1em' }} checked={isUse} onChange={() => { setIsUse(!isUse) }}></Checkbox>
        </FormControl>
      </StyledTableCell>
      <StyledTableCell colSpan={1} style={{ padding: '0', height: 'auto' }} sx={{ border: 'none' }}>
        <FormControl>
          <FormLabel>魔法</FormLabel>
          <Checkbox style={{ margin: '-1em' }} checked={isMagic} onChange={() => { setIsMagic(!isMagic) }}></Checkbox>
        </FormControl>
      </StyledTableCell>
    </>
  )
}
type abi2GolemItemProps = {
  item: string
  onChangeItem: (event: SelectChangeEvent) => void
  span: number
}
const Abi2GolemItem = ({ item, onChangeItem, span }: abi2GolemItemProps) => {
  return (
    <StyledTableCell colSpan={span} style={{ padding: '0', height: 'auto' }} sx={{ border: 'none' }}>
      <FormControl fullWidth >
        <InputLabel>アイテム</InputLabel>
        <Select value={item} onChange={onChangeItem} >
          {golemAllSizeItemList.map((r, id) =>
            <MenuItem key={id} value={r} >{r}</MenuItem>)}
        </Select>
      </FormControl>
    </StyledTableCell>
  )
}
type abi3RowProps = {
  idx: number
  explanation: string
  setExplanation: (e: string) => void
}
const Abi3Row = (props: abi3RowProps) => {
  const { idx, explanation, setExplanation } = props
  return (
    <TableRow key={`${idx}-exp`}>
      <ExplanationTableCell colSpan={20} sx={{ border: 'none', padding: '0', paddingTop: '1em', paddingBottom: '1em' }}>
        <Box style={{ width: '100%' }}>
          <TextField multiline style={{ width: '50em' }} label="能力詳細" value={explanation} onChange={handleChange(setExplanation, v => v)} />
        </Box></ExplanationTableCell>
    </TableRow>
  )
}