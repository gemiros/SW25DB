import { Checkbox } from "@mui/material"
import React from "react"

type Props = {
  abilitys: monster.ability
  id: number
  selectArray: any[]
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
}
export const MonsterViewAbilityItem = (props: Props) => {
  return (
    <div style={{ margin: '1em', padding: '1em', backgroundColor: '#f0f0f0', border: '1px solid #ddd', borderRadius: '1em' }}>
      <h3 style={{ marginBottom: '0em', marginTop: '0em' }}>
        {
          props.abilitys.item ?
            (<>
              <Checkbox value={props.id} checked={props.selectArray.indexOf(props.id.toString()) !== -1} onChange={props.onChange} />{props.abilitys.item}
            </>)
            : null
        }
        {props.abilitys.kind.join("")}{props.abilitys.name}{props.abilitys.use}
      </h3>
      {props.abilitys.explain || props.abilitys.explain == '' ? props.abilitys.explain : null}
    </div>
  )
}
