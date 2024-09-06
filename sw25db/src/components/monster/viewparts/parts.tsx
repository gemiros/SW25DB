import React, { useEffect } from "react"
import { MonsterViewPartItem } from "./partItem"
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { race } from "../uniqueAbility/human";

type Props = {
  parts: monster.level[]
  useLevelId: number
  setUseLevelId(id: number): void
  core: string[]
  setCore(core: string[]): void
  hRace: race
}

export const MonsterViewParts = (props: Props) => {
  const handleChange = (event: SelectChangeEvent) => {
    const id = Number(event.target.value)
    props.setUseLevelId(id);
  };
  useEffect(() => {
    const coreArr = props.parts[props.useLevelId].parts.filter(part => part.core).map(part => part.name)
    props.setCore(coreArr)
  }, [props.useLevelId])
  return (
    <React.Fragment>
      {'lv' in props.parts[0] && props.parts.length > 1 ?
        <FormControl>
          <InputLabel>レベル</InputLabel>
          <Select style={{ width: '10em' }} label="レベル" value={props.useLevelId.toString()} onChange={handleChange}>
            {props.parts.map((level, id) => <MenuItem key={id} value={id}>{level.lv}</MenuItem>)}
          </Select>
        </FormControl>
        : null}
      <MonsterViewPartItem parts={props.parts[props.useLevelId].parts} hRace={props.hRace} />
      コア部位：{props.core.length ? props.core.join("、") : 'なし'}
    </React.Fragment>
  )
}