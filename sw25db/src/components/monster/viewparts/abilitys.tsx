import React from "react"
import { MonsterViewAbilityItem } from "./abilityItem"

type Props = {
  abilitys: monster.abilitys,
  selectArray: any[],
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void
}

export const MonsterViewAbilitys = (props: Props) => {
  return (
    <div style={{ paddingTop: '1em', paddingBottom: '1em' }}>
      {
        props.abilitys.abilitys.map((item, id) =>
          <MonsterViewAbilityItem key={id} abilitys={item} id={id} selectArray={props.selectArray} onChange={props.handleChange} />
        )
      }
    </div>
  )
}