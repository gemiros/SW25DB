import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"

type Props = {
  abilitys: monster.abilitys,
  unique: monster.ability[] | null,
  selectArray: any[],
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void
}

type partsAbilitys = {
  partName: string
  abilitys: monster.ability[]
}

export const MonsterViewAbilitys = (props: Props) => {
  const [expanded, setExpanded] = useState(false)
  const [partAbilitys, setPartAbilitys] = useState<string[]>([])
  const [partsAbilitys, setPartsAbilitys] = useState<partsAbilitys[]>([])
  useEffect(() => {
    const parts = ["全身"]
    props.abilitys.abilitys ? props.abilitys.abilitys.forEach((ability) => {
      ability.part ? parts.push(...ability.part) : null
    }) : null
    setPartAbilitys(Array.from(new Set(parts)))

    console.log(props.abilitys.abilitys);
    const useParts = Array.from(new Set(parts))
    if (useParts.length == 1) {
      setPartsAbilitys([
        {
          partName: '1部位',
          abilitys: props.abilitys.abilitys
        }
      ])
      return
    }
    const tmpArray: partsAbilitys[] = []
    useParts.forEach(p => {
      const tmp: partsAbilitys = {
        partName: p,
        abilitys: props.abilitys.abilitys.filter(a => (p == '全身' && !a.part.length) || a.part.includes(p))
      }
      tmpArray.push(tmp)
    });
    console.log(tmpArray);
    setPartsAbilitys(tmpArray)
  }, [props])

  return (
    <div style={{ paddingTop: '0em', paddingBottom: '0em' }}>
      {
        props.unique ? <Accordion style={{ margin: '1em', padding: '0em', backgroundColor: '#f0f0f0', border: '1px solid #ddd', borderRadius: '1em' }}>
          <AccordionSummary expandIcon={expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>分類所持特殊能力</Typography>
          </AccordionSummary>
          <AccordionDetails>{props.unique.map((item, id) =>
            <UniqueAccordion key={id} kind={item.kind} name={item.name} explain={item.explain} use={""} />
          )}
          </AccordionDetails>
        </Accordion> : null
      }
      {
        partsAbilitys.map((part, id) => <React.Fragment key={id}>
          {partAbilitys.length > 1 ? <h3>{part.partName}</h3> : null}
          {part.abilitys.map((abi, idx) =>
            <MonsterViewAbilityItem key={idx} abilitys={abi} id={id} selectArray={props.selectArray} onChange={props.handleChange} />)}
        </React.Fragment>)
      }
      {/* {
        partAbilitys.map((part, id) => <React.Fragment key={id}>
          {partAbilitys.length > 1 ? <h3>{part}</h3> : null}
          {
            part === '全身'
              // 全身である
              ? props.abilitys.abilitys
                // アビリティが存在する
                ? props.abilitys.abilitys
                  .filter((abi) => (!abi.part || !abi.part.length))
                  .map((abi, id) => <MonsterViewAbilityItem key={id} abilitys={abi} id={id} selectArray={props.selectArray} onChange={props.handleChange} />)
                : null
              // 全身でない
              : props.abilitys.abilitys
                // アビリティが存在する
                ? props.abilitys.abilitys
                  .filter((abi) => abi.part
                    ? abi.part.includes(part)
                    : false)
                  .map((abi, id) => <MonsterViewAbilityItem key={id} abilitys={abi} id={id} selectArray={props.selectArray} onChange={props.handleChange} />)
                : null
          }
        </React.Fragment>)
      } */}
      {props.abilitys?.abilitys?.length === 0 ? <h5>なし</h5> : null}
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
        {props.abilitys.kind.join('')}{props.abilitys.name}
        {
          !props.abilitys.useData
            ? null
            : <>
              {props.abilitys.useData.isMagic ? `/ 魔力${props.abilitys.useData.magic} (${Number(props.abilitys.useData.magic) + 7})` : null}
              {props.abilitys.useData.isUse
                ? <>
                  /{props.abilitys.useData.useValue} ({Number(props.abilitys.useData.useValue) + 7})
                  {props.abilitys.useData.resistSkill ? `/${props.abilitys.useData.resistSkill}` : null}
                  {props.abilitys.useData.resistResult ? `/${props.abilitys.useData.resistResult}` : null}
                </>
                : null}
            </>
        }
      </h3>
      {props.abilitys.explain || props.abilitys.explain == '' ? props.abilitys.explain : null}
    </div>
  )
}

type uniqueProps = {
  kind: string[]
  name: string
  use: string
  explain?: string
}

export const UniqueAccordion = (unique: uniqueProps) => {
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