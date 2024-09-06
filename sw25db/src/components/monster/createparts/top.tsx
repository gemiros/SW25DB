import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { raceList, subRaceFList, subRaceList } from "../../const/monster"
import { TopProps } from "./props"
import { handleChange } from "../../utilFunc/utilFunc"

export const Top = (props: TopProps) => {
  const { top, setTop, tags, setTags } = props
  const [race, setRace] = useState('蛮族')
  const [name, setName] = useState('');
  const [lv, setLv] = useState(0)
  const [page, setPage] = useState('')
  const [subRace, setSubRace] = useState('')
  const handle = (event: SelectChangeEvent) => {
    setRace(event.target.value);
  };
  const handle2 = (event: SelectChangeEvent) => {
    setSubRace(event.target.value);
  };
  const checkBoxCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (tags.includes(e.target.value)) {
      let tmp = structuredClone(tags)
      tmp = tmp.filter((t) => t !== e.target.value)
      setTags(tmp)
    } else {
      setTags([...tags, e.target.value])
    }
  }

  useEffect(() => {
    if (race !== '騎獣') {
      setSubRace('')
    }
  }, [race])

  useEffect(() => {
    const tmp = structuredClone(top)
    tmp.name = name
    tmp.lv = lv
    tmp.race = race
    tmp.page = page
    tmp.subRace = subRace ?? ''
    setTop(tmp)
  }, [race, name, lv, subRace, page])

  useEffect(() => {
    setName(top.name ?? '')
    setLv(top.lv ?? 0)
    setRace(top.race ?? '')
    setPage(top.page ?? '')
    setSubRace(top.subRace ?? '')
  }, [props.paramName])
  return (<div style={{ padding: '0em', paddingBottom: '1em' }}>
    <div style={{ paddingTop: '1em' }}>
      <FormControl style={{ paddingRight: '1em' }}>
        <InputLabel>種族</InputLabel>
        <Select style={{ width: '10em' }} label="種族" onChange={handle} value={race}>
          {raceList.map((r, id) => <MenuItem key={id} value={r}>{r}</MenuItem>)}
        </Select>
      </FormControl>
      <TextField style={{ width: "6em" }}
        label="Lv"
        value={lv}
        onChange={handleChange(setLv, Number)}
        type="number"
        InputProps={{
          inputProps: {
            min: 0
          }
        }}
      />
      <FormControl style={{ marginLeft: '1em' }}>
        <FormGroup row>
          <FormControlLabel value={'main'} control={<Checkbox checked={tags.indexOf('main') !== -1} onChange={checkBoxCheck} />} label={"ルルブ"} />
          <FormControlLabel value={'boss'} control={<Checkbox checked={tags.indexOf('boss') !== -1} onChange={checkBoxCheck} />} label={"ボス"} />
          <FormControlLabel value={'original'} control={<Checkbox checked={tags.indexOf('original') !== -1} onChange={checkBoxCheck} />} label={"オリジナル"} />
        </FormGroup>
      </FormControl>
      <TextField style={{ width: "10em", marginLeft: '1em' }}
        label="ページ"
        value={page}
        onChange={handleChange(setPage, v => v)}
        InputProps={{
          inputProps: {
            min: 0
          }
        }}
      />
    </div>
    <div>
      {race == '騎獣' ? <FormControl style={{ marginTop: '1em', paddingRight: '1em' }}>
        <InputLabel>サブ種族</InputLabel>
        <Select style={{ width: '10em' }} label="サブ種族" onChange={handle2} value={subRace}>
          {subRaceList.map((r, id) => <MenuItem key={id} value={r}>{r}</MenuItem>)}
        </Select>
      </FormControl> : null}
      {race == '妖精' ? <FormControl style={{ marginTop: '1em', paddingRight: '1em' }}>
        <InputLabel>サブ種族</InputLabel>
        <Select style={{ width: '10em' }} label="サブ種族" onChange={handle2} value={subRace}>
          {subRaceFList.map((r, id) => <MenuItem key={id} value={r}>{r}</MenuItem>)}
        </Select>
      </FormControl> : null}
    </div>
    <div style={{ paddingTop: '1em' }}>
      <TextField style={{ width: "40em" }}
        label="モンスター名"
        value={name}
        onChange={handleChange(setName, (v) => v)} />
    </div>
  </div>)
}
