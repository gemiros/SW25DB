import { Checkbox, Grid, } from '@mui/material';
import { useEffect, useState } from "react"
import { HabitatList, IntList, LanguageList, PercientList, ReactionList, statusInit } from "../../const/monster"
import MultipleSelectCheckmarks from './checkSelect';
import { FoudationStatus, StatusInput } from './foundationStatus';
import { StatusProps } from './props';
import { handleChange } from '../../utilFunc/utilFunc';

export const Status = (props: StatusProps) => {
  const { status, setStatus, race } = props
  const [int, setInt] = useState('なし');
  const [percient, setPercient] = useState('五感');
  const [reaction, setReaction] = useState('友好的');
  const [imp, setImp] = useState<number>(0)
  const [language, setLanguage] = useState<string[]>([])
  const [habitat, setHabitat] = useState<string[]>([])
  const [popular, setPopular] = useState<number>(0)
  const [weakValue, setWeakValue] = useState<number>(-1)
  const [weak, setWeak] = useState<string>('')
  const [preem, setPreem] = useState<number>(0)
  const [speed, setSpeed] = useState<string>('- / -')
  const [lifeRes, setLifeRes] = useState<number>(0)
  const [mindRes, setMindRes] = useState<number>(0)

  const [isWeak, setIsWeak] = useState<boolean>(true)

  const isWeakChange = () => {
    setIsWeak(!isWeak)
    setWeak('')
  }
  useEffect(() => {
    isWeak ? setWeakValue(0) : setWeakValue(-1)
  }, [isWeak])

  useEffect(() => {
    const tmp = structuredClone(status)
    tmp.int = int
    tmp.perc = percient
    tmp.reac = reaction
    tmp.imp = imp
    tmp.lang = language
    tmp.habi = habitat
    tmp.pop = popular
    tmp.weakValue = weakValue > -1 ? weakValue : undefined
    tmp.weak = weak
    tmp.preem = preem
    tmp.speed = speed
    tmp.life = lifeRes
    tmp.mind = mindRes
    setStatus(tmp)
  }, [int, percient, reaction, imp, language, habitat, popular, weakValue, weak, preem, speed, lifeRes, mindRes])
  useEffect(() => {
    setInt(status.int ?? 'なし')
    setPercient(status.perc ?? '五感')
    setReaction(status.reac ?? '友好的')
    setImp(status.imp ?? 0)
    setLanguage(status.lang ?? [])
    setHabitat(status.habi ?? [])
    setPopular(status.pop ?? 0)
    setWeakValue(status.weakValue ?? -1)
    setWeak(status.weak ?? '')
    setPreem(status.preem ?? 0)
    setSpeed(status.speed ?? '- / -')
    setLifeRes(status.life ?? 0)
    setMindRes(status.mind ?? 0)
  }, [props.paramName])
  return <div>
    {!(race == 'ゴーレム' || race == 'ファミリア') ?
      <>
        <div>
          <FoudationStatus dataName='知能' data={int} useList={IntList} onChange={handleChange(setInt, (value) => value)} />
          <FoudationStatus dataName='知覚' data={percient} useList={PercientList} onChange={handleChange(setPercient, (value) => value)} />
          {!(race == '騎獣') ?
            <FoudationStatus dataName='反応' data={reaction} useList={ReactionList} onChange={handleChange(setReaction, (value) => value)} />
            : null}
        </div>
        <div>
          <StatusInput style={{ width: "6em" }} inputName='穢れ' value={imp} onChange={handleChange(setImp, Number)} />
        </div>
        <div>
          <MultipleSelectCheckmarks useData={LanguageList} tagName='言語' selectData={language} setSelectData={setLanguage} />
          <MultipleSelectCheckmarks useData={HabitatList} tagName='生息地' selectData={habitat} setSelectData={setHabitat} />
        </div>
      </>
      : null}
    {!(race == 'ファミリア') ?
      <div style={{ marginTop: '1em' }}>
        <Grid container alignItems="center">
          弱点あり
          <Checkbox checked={isWeak} value={isWeak} onChange={isWeakChange} />
          <StatusInput style={{ width: "6em" }} inputName='知名度' value={popular} onChange={handleChange(setPopular, Number)} />
          {isWeak ? <>
            /<StatusInput style={{ width: "6em" }} inputName='弱点値' value={weakValue} onChange={handleChange(setWeakValue, Number)} />
            <StatusInput style={{ width: "20em", marginLeft: '1em' }} inputName='弱点' value={weak} onChange={handleChange(setWeak, (value) => value)} />
          </> : null}
        </Grid>
      </div> : null}
    <div style={{ marginTop: '1em' }}>
      <Grid container alignItems={"center"}>
        <StatusInput style={{ width: "6em", marginRight: '1em' }} inputName='先制値' value={preem} onChange={handleChange(setPreem, Number)} />
        <StatusInput style={{ width: "10em", marginRight: '1em' }} inputName='移動速度' value={speed} onChange={handleChange(setSpeed, (value) => value)} />
        {!(race == 'ファミリア') ? <>
          <div style={{ marginRight: '1em' }}>
            <StatusInput style={{ width: "6em" }} inputName='生命抵抗力' value={lifeRes} onChange={handleChange(setLifeRes, Number)} />{`(${lifeRes + 7})`}
          </div>
          <div style={{ marginRight: '1em' }}>
            <StatusInput style={{ width: "6em" }} inputName='精神抵抗力' value={mindRes} onChange={handleChange(setMindRes, Number)} />{`(${mindRes + 7})`}
          </div>
        </> : null}
      </Grid>
    </div>
  </div>
}