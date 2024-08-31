import { TableRow, Checkbox, styled, TableCell, tableCellClasses, FormControl, FormLabel, Table, TableBody, Box, TextField, Select, MenuItem, SelectChangeEvent, FormControlLabel, FormGroup, InputLabel, TableHead, Button, Icon } from "@mui/material"
import { StatusInput } from "./foundationStatus"
import { MultipleSelectCheckmarksAbilitys } from "../../utilComponent/select";
import { abilityKindList, golemAllSizeItemList } from "../../const/monster";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { useState, useEffect } from "react";


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
  row: monster.ability
  totalRows: number
  partNameList: string[]
  paramName: string
  onMoveRow: (index: number, direction: "up" | "down") => void
  onInputChange: (index: number, field: keyof monster.ability, value: any) => void
  copyRow: (index: number) => void
}

export const AbilityItem = (props: Props) => {
  const { idx, partNameList, race, row, totalRows, paramName, onInputChange, onMoveRow, copyRow } = props
  // row1
  const [emptySpan, setEmptySpan] = useState<number>(0)
  const buttonsSpan = 2
  const kindSpan = 6
  const golemSpan = 6
  const partSpan = 5
  const [kind, setKind] = useState<string[]>(row.kind)
  const [emptySpan2, setEmptySpan2] = useState<number>(0)

  const [isGolem, setIsGolem] = useState<boolean>(false)
  const [isPart, setIsPart] = useState<boolean>(false)
  const [isMagic, setIsMagic] = useState<boolean>(row.useData ? row.useData.isMagic ?? false : false)
  const [isUse, setIsUse] = useState<boolean>(row.useData ? row.useData.isUse ?? false : false)
  useEffect(() => {
    setIsGolem(race === 'ゴーレム')
  }, [race])
  useEffect(() => {
    setIsPart(partNameList.length > 2)
  }, [partNameList])
  useEffect(() => {
    setEmptySpan(20 - (isGolem ? golemSpan : 0) - (isPart ? partSpan : 0) - kindSpan - buttonsSpan)
  }, [isGolem, isPart])

  const nameSpan = 8
  useEffect(() => {
    setEmptySpan2(20 - nameSpan - (isUse ? 12 : 0) - (isMagic ? 4 : 0))
  }, [isPart])
  const checkBoxCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (kind.includes(e.target.value)) {
      let tmp = structuredClone(kind)
      tmp = tmp.filter((t) => t !== e.target.value)
      setKind(tmp)
    } else {
      setKind([...kind, e.target.value])
    }
  }

  const handleMagicChange = () => {
    const newIsMagic = !isMagic;
    if (newIsMagic) {
      // MagicをONにする場合、UseはOFFにする
      setIsMagic(true);
      setIsUse(false);
      const tmp = structuredClone(row.useData)
      tmp.isMagic = true
      tmp.isUse = false
      tmp.useValue = 0
      onInputChange(idx, 'useData', tmp);
    } else {
      // MagicをOFFにする場合
      setIsMagic(false);
      const tmp = structuredClone(row.useData)
      tmp.isMagic = false
      tmp.magic = 0
      onInputChange(idx, 'useData', tmp);
    }
  };

  const handleUseChange = () => {
    const newIsUse = !isUse;
    if (newIsUse) {
      // UseをONにする場合、MagicはOFFにする
      setIsUse(true);
      setIsMagic(false);
      const tmp = structuredClone(row.useData)
      tmp.isUse = true
      tmp.isMagic = false
      tmp.magic = 0
      onInputChange(idx, 'useData', tmp);
    } else {
      // UseをOFFにする場合
      setIsUse(false);
      const tmp = structuredClone(row.useData)
      tmp.isUse = false
      tmp.useValue = 0
      onInputChange(idx, 'useData', tmp);
    }
  };
  const changeData = (field: keyof monster.abilitysUseData, value: any) => {
    let newData = structuredClone(row.useData);
    newData = { ...newData, [field]: value };
    onInputChange(idx, 'useData', newData)
  };

  useEffect(() => {
    onInputChange(idx, 'kind', kind)
  }, [kind])
  useEffect(() => {
    setIsUse(row.useData?.isUse)
    setIsMagic(row.useData?.isMagic)
  }, [row.useData])
  return (
    <StyledTableCell style={{ width: '100%' }}>
      <Table style={{ width: '100%' }}>
        <TableHead>
          <TableRow>
            {Array(20).fill(0).map((_c, i) => <StyledTableCell colSpan={1} key={i} style={{ padding: '0', width: '5%' }}></StyledTableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <StyledTableCell colSpan={buttonsSpan} style={{ padding: '0' }}>
              <Button style={{ padding: '0' }} onClick={() => { onMoveRow(idx, 'up') }} disabled={idx === 0}><ArrowDropUp /></Button>
              <Button style={{ padding: '0' }} onClick={() => { onMoveRow(idx, 'down') }} disabled={idx === totalRows - 1}><ArrowDropDown /></Button>
              <Button style={{ padding: '0' }} onClick={() => { copyRow(idx) }}>複製</Button>
            </StyledTableCell>
            {isPart ?
              <StyledTableCell colSpan={partSpan} style={{ padding: '0', height: 'auto' }} sx={{ border: 'none' }}>
                <MultipleSelectCheckmarksAbilitys formSX={{ width: '100%' }} divStyle={{}} useData={partNameList} tagName="部位" selectData={row.part ?? []} onInputChange={onInputChange} index={idx} />
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
                      control={
                        <Checkbox
                          checked={row.kind.indexOf(abiKind) !== -1}
                          onChange={checkBoxCheck}
                        />
                      }
                      label={abiKind} />
                  </FormGroup>
                </FormControl>
              )}
            </StyledTableCell>
            {isGolem ?
              <StyledTableCell colSpan={golemSpan} style={{ padding: '0', height: 'auto' }} sx={{ border: 'none' }}>
                <FormControl fullWidth >
                  <InputLabel>アイテム</InputLabel>
                  <Select value={row.item} onChange={(e) => onInputChange(idx, 'item', e.target.value)} >
                    {golemAllSizeItemList.map((r, id) =>
                      <MenuItem key={id} value={r} >{r}</MenuItem>)}
                  </Select>
                </FormControl>
              </StyledTableCell>
              : null}
            <StyledTableCell colSpan={emptySpan} style={{ padding: '0' }}></StyledTableCell>
          </TableRow>

          <TableRow key={idx}>
            <StyledTableCell colSpan={6} style={{ padding: '0', height: 'auto' }} sx={{ border: 'none' }}>
              <StatusInput inputName="能力名" value={row.name} onChange={(e) => onInputChange(idx, 'name', e.target.value)} />
            </StyledTableCell>
            <StyledTableCell colSpan={1} style={{ padding: '0', height: 'auto' }} sx={{ border: 'none' }}>
              <FormControl>
                <FormLabel>対抗</FormLabel>
                <Checkbox style={{ margin: '-1em' }} checked={isUse ?? false} value={row.useData?.isUse ?? false} onChange={handleUseChange}></Checkbox>
              </FormControl>
            </StyledTableCell>
            <StyledTableCell colSpan={1} style={{ padding: '0', height: 'auto' }} sx={{ border: 'none' }}>
              <FormControl>
                <FormLabel>魔法</FormLabel>
                <Checkbox style={{ margin: '-1em' }} checked={isMagic ?? false} value={row.useData?.isMagic ?? false} onChange={handleMagicChange}></Checkbox>
              </FormControl>
            </StyledTableCell>
            {isMagic ?? false ? // 15%
              <>
                <StyledTableCell colSpan={3} style={{ padding: '0', height: 'auto' }}>
                  <StatusInput type={'number'} inputName="数値" value={row.useData?.magic ?? 0} onChange={(e) => changeData('magic', e.target.value)} />
                </StyledTableCell><StyledTableCell style={{ padding: '0', height: 'auto' }}>
                  {`/ (${Number(row.useData?.magic ?? 0) + 7})`}
                </StyledTableCell>
              </>
              : null
            }
            {isUse ?? false ? <>
              <StyledTableCell colSpan={3} style={{ padding: '0', height: 'auto' }} sx={{ border: 'none' }}><StatusInput type={'number'} inputName="数値" value={row.useData?.useValue ?? 0} onChange={(e) => changeData('useValue', e.target.value)} /></StyledTableCell>
              <StyledTableCell colSpan={1} style={{ padding: '0', height: 'auto' }} sx={{ border: 'none' }}>{`/ (${Number(row.useData?.useValue ?? 0) + 7}) `}</StyledTableCell>
              <StyledTableCell colSpan={4} style={{ padding: '0', height: 'auto' }} sx={{ border: 'none' }}><StatusInput inputName="対抗基準値" value={row.useData?.resistSkill ?? ''} onChange={(e) => changeData('resistSkill', e.target.value)} /></StyledTableCell>
              <StyledTableCell colSpan={4} style={{ padding: '0', height: 'auto' }} sx={{ border: 'none' }}><StatusInput inputName="対抗結果" value={row.useData?.resistResult ?? ''} onChange={(e) => changeData('resistResult', e.target.value)} /></StyledTableCell>
            </> : null}
            <StyledTableCell colSpan={emptySpan} sx={{ border: 'none' }} style={{ padding: '0' }}></StyledTableCell>
          </TableRow>


          <TableRow key={`${idx}-exp`}>
            <ExplanationTableCell colSpan={20} sx={{ border: 'none', padding: '0', paddingTop: '1em', paddingBottom: '1em' }}>
              <Box style={{ width: '100%' }}>
                <TextField multiline style={{ width: '50em' }} label="能力詳細" value={row.explain ?? ''} onChange={(e) => onInputChange(idx, 'explain', e.target.value)} />
              </Box></ExplanationTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </StyledTableCell>
  )
}