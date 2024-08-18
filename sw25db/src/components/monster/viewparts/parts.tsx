import React, { useEffect, useState } from "react"
import { MonsterViewPartItem } from "./partItem"
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

type Props = {
  parts: monster.level[]
  useLevelId: number
  setUseLevelId(id: number): void
  core: string
  setCore(core: string): void
}

export const MonsterViewParts = (props: Props) => {
  const handleChange = (event: SelectChangeEvent) => {
    const id = Number(event.target.value)
    props.setUseLevelId(id);
  };
  useEffect(() => {
    const coreArr = props.parts[props.useLevelId].parts.map((v) => { if (v.core) { return v.name } })
    props.setCore(coreArr.join('、'))
  }, [props, props.useLevelId])
  return (
    <React.Fragment>
      {'lv' in props.parts[0] ?
        <FormControl>
          <InputLabel>レベル</InputLabel>
          <Select style={{ width: '10em' }} label="レベル" value={props.useLevelId.toString()} onChange={handleChange}>
            {props.parts.map((level, id) => <MenuItem key={id} value={id}>{level.lv}</MenuItem>)}
          </Select>
        </FormControl>
        : null}
      <MonsterViewPartItem parts={props.parts[props.useLevelId].parts} />
      コア部位：{props.core ? props.core : 'なし'}
    </React.Fragment>
  )
}