import { MonsterViewStatusParts } from "./statusParts"
import { race } from "../uniqueAbility/human"

type Props = {
  status: monster.status
  hRace: race
}
export const MonsterViewStatus = (props: Props) => {
  const status = props.status
  const pStyle = { marginTop: '0em', marginBottom: '0em' }
  return (
    <h4>
      <MonsterViewStatusParts label="価格" data={status.value} />
      <p style={pStyle}>
        <MonsterViewStatusParts label="知能" data={status.int} />
        <MonsterViewStatusParts label="知覚" data={status.perc} />
        <MonsterViewStatusParts label="反応" data={status.reac} />
        <MonsterViewStatusParts label="穢れ" data={status.imp} />
      </p>
      <p style={pStyle}>
        <MonsterViewStatusParts label="言語" data={status.lang?.join('、')} />
      </p>
      <p style={pStyle}>
        <MonsterViewStatusParts label="生息地" data={status.habi?.join('、')} />
      </p>
      <p style={pStyle}>
        <MonsterViewStatusParts label="知名度/弱点" data={status.pop} data2={status.weakValue} />
        <MonsterViewStatusParts label="弱点" data={status.weak} />
      </p>
      <p style={pStyle}>
        <MonsterViewStatusParts label="先制値" data={status.preem} />
        <MonsterViewStatusParts label="移動速度" data={status.speed} />
      </p>
      <p style={pStyle}>
        <MonsterViewStatusParts label="生命抵抗力" data={status.life} hRace={props.hRace.fixPart.lifeRes} data3={true} />
        <MonsterViewStatusParts label="精神抵抗力" data={status.mind} hRace={props.hRace.fixPart.mindRes} data3={true} />
      </p>
    </h4>
  )
}