import { humanRace, race } from '../uniqueAbility/human';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"

type Props = {
  top: monster.top
  hRace: race
  setHRace: (r: race) => void
}
export const MonsterViewTop = (props: Props) => {
  const handleChange = (event: SelectChangeEvent) => {
    const id = Number(event.target.value)
    props.setHRace(humanRace.find((race) => race.raceId === id)!);
  };
  return (
    <h2>
      分類:{props.top.race} Lv.{props.top.lv} {props.top.name}{props.top.subRace ? `(${props.top.subRace})` : null}<br />
      {props.top.race === "人族" ? <FormControl>
        <InputLabel>種族</InputLabel>
        <Select style={{ width: '10em' }} label="レベル" onChange={handleChange} value={props.hRace?.raceId.toString()}>
          {humanRace.map((race, id) => <MenuItem key={id} value={id}>{race.race}</MenuItem>)}
        </Select>
      </FormControl> : null}
    </h2>
  )
}