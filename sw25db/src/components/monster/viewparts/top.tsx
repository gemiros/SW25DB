import React from "react"

type Props = {
  top: monster.top
}
export const MonsterViewTop = (props: Props) => {
  return (
    <h2>
      分類:{props.top.race} Lv.{props.top.lv} {props.top.name}
    </h2>
  )
}