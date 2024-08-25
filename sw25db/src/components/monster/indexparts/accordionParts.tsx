import { Link } from "react-router-dom"
import React from "react"
import { monsterViewDetail } from "../../../App"

type Props = {
  monsters: monster.monster[]
  tagName?: string
}
export const AccordionParts = (props: Props) => {
  return (
    <>
      {props.tagName !== undefined ?
        (<>
          <h5>{props.tagName}</h5>
          <hr />
        </>) :
        (<></>)
      }
      {props.monsters.map((monster, idx) => (
        <React.Fragment key={`${idx}-${props.tagName}`}><Link to={`${monsterViewDetail}/${monster.Top.name}`}>Lv.{monster.Top.lv} {monster.Top.name}</Link><br /></React.Fragment>
      ))}
    </>
  )
}