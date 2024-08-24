import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"

type Props = {
  abilitys: monster.abilitys,
  unique: monster.ability[] | null,
  selectArray: any[],
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void
}

type PartAbility = {
  part: string
  abilitys: monster.ability[]
}

export const MonsterViewAbilitys = (props: Props) => {
  const [expanded, setExpanded] = useState(false)
  const [partAbilitys, setPartAbilitys] = useState<string[]>([])
  useEffect(() => {
    const parts = ["全身"]
    parts.push(...props.abilitys.abilitys.map((obj) => obj.part ? obj.part : "全身"))
    setPartAbilitys(Array.from(new Set(parts)))
  }, [props])

  return (
    <div style={{ paddingTop: '0em', paddingBottom: '0em' }}>
      {
        props.unique ? <Accordion style={{ margin: '1em', padding: '0em', backgroundColor: '#f0f0f0', border: '1px solid #ddd', borderRadius: '1em' }}>
          <AccordionSummary expandIcon={expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>分類所持特殊能力</Typography>
          </AccordionSummary>
          <AccordionDetails>{props.unique.map((item, id) =>
            <UniqueAccordion key={id} kind={item.kind} name={item.name} explain={item.explain} />
          )}
          </AccordionDetails>
        </Accordion> : null
      }
      {
        partAbilitys.map((part, id) => <React.Fragment key={id}>
          {
            props.abilitys.abilitys.filter((abi) => !abi.part || part == "全身").map((item, ids) => <MonsterViewAbilityItem key={ids} abilitys={item} id={ids} selectArray={props.selectArray} onChange={props.handleChange} />)
          }
          {
            props.abilitys.abilitys.filter((abi) => abi.part == part).map((item, ids) => <MonsterViewAbilityItem key={ids} abilitys={item} id={ids} selectArray={props.selectArray} onChange={props.handleChange} />)
          }
        </React.Fragment>)
      }
    </div>
  )
}

type Props2 = {
  abilitys: monster.ability
  id: number
  selectArray: any[]
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
}

const MonsterViewAbilityItem = (props: Props2) => {
  return (
    <div style={{ margin: '1em', padding: '1em', backgroundColor: '#f0f0f0', border: '1px solid #ddd', borderRadius: '1em' }}>
      <h3 style={{ marginBottom: '0em', marginTop: '0em' }}>
        {
          props.abilitys.item ?
            (<>
              <Checkbox value={props.abilitys.name} checked={props.selectArray.indexOf(props.abilitys.name) !== -1} onChange={props.onChange} />{props.abilitys.item}
            </>)
            : null
        }
        {props.abilitys.kind.join("")}{props.abilitys.name}{props.abilitys.use}
      </h3>
      {props.abilitys.explain || props.abilitys.explain == '' ? props.abilitys.explain : null}
    </div>
  )
}

export const UniqueAccordion = (unique: monster.ability) => {
  const [expanded, setExpanded] = useState(false)
  const toggleAccordion = () => {
    setExpanded(!expanded)
  }
  return (
    <Accordion style={{ margin: '1em', padding: '0em', backgroundColor: '#f0f0f0', border: '1px solid #ddd', borderRadius: '1em' }} expanded={expanded} onChange={toggleAccordion}>
      <AccordionSummary expandIcon={expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}>
        <Typography variant="h6" style={{ fontWeight: "bold" }}> {unique.kind.join("")}{unique.name}{unique.use}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {unique.explain}
      </AccordionDetails>
    </Accordion>
  )
}