import { MonsterViewStatusParts } from "./statusParts"
import { race } from "../uniqueAbility/human"
import { useEffect, useState } from "react"

type Props = {
  status: monster.status
  hRace: race,
  top: monster.top
  fixedStatus: monster.fixedStatus
}
export const MonsterViewStatus = (props: Props) => {
  const { status, top, fixedStatus } = props
  const pStyle = { marginTop: '0em', marginBottom: '0em' }
  const [fixed, setFixed] = useState(status)
  // let fixed = structuredClone(status)
  const fix = () => {
    const tmp = structuredClone(status)
    tmp.habi = fixedStatus.habi ?? tmp.habi;
    tmp.imp = fixedStatus.imp ?? tmp.imp;
    tmp.int = fixedStatus.int ?? tmp.int;
    tmp.lang = fixedStatus.lang ?? tmp.lang;
    tmp.life = fixedStatus.life ?? tmp.life;
    tmp.mind = fixedStatus.mind ?? tmp.mind;
    tmp.perc = fixedStatus.perc ?? tmp.perc;
    console.log(tmp.perc);
    console.log(tmp);


    tmp.pop = fixedStatus.pop ?? tmp.pop;
    tmp.preem = fixedStatus.preem ?? tmp.preem;
    tmp.reac = fixedStatus.reac ?? tmp.reac;
    tmp.speed = fixedStatus.speed ?? tmp.speed;
    tmp.weak = fixedStatus.weak ?? tmp.weak;
    tmp.weakValue = fixedStatus.weakValue ?? tmp.weakValue;
    tmp.value = fixedStatus.value ?? tmp.value;
    setFixed(tmp)

  };
  useEffect(() => {
    fix()
  }, [fixedStatus])


  return (
    <h4>
      <MonsterViewStatusParts label="価格" data={fixed.value} />
      <p style={pStyle}>
        <MonsterViewStatusParts label="知能" data={fixed.int} />
        <MonsterViewStatusParts label="知覚" data={fixed.perc} />
        <MonsterViewStatusParts label="反応" data={fixed.reac} />
        <MonsterViewStatusParts label="穢れ" data={fixed.imp} />
      </p>
      <p style={pStyle}>
        <MonsterViewStatusParts label="言語" data={fixed.lang?.join('、')} />
      </p>
      <p style={pStyle}>
        <MonsterViewStatusParts label="生息地" data={fixed.habi?.join('、')} />
      </p>
      <p style={pStyle}>
        <MonsterViewStatusParts label="知名度/弱点" data={fixed.pop} data2={fixed.weakValue ?? '-'} />
        <MonsterViewStatusParts label="弱点" data={fixed.weak} />
      </p>
      <p style={pStyle}>
        <MonsterViewStatusParts label="先制値" data={fixed.preem} />
        <MonsterViewStatusParts label="移動速度" data={fixed.speed} />
      </p>
      <p style={pStyle}>
        <MonsterViewStatusParts label="生命抵抗力" data={fixed.life} hRace={props.hRace.fixPart.lifeRes} data3={true} />
        <MonsterViewStatusParts label="精神抵抗力" data={fixed.mind} hRace={props.hRace.fixPart.mindRes} data3={true} />
      </p>
    </h4>
  )
}