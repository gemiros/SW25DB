import { Accordion, AccordionDetails, AccordionSummary, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography, useFormControl } from "@mui/material"
import React, { useState } from "react"
import { create } from "./createPieceFunc"

type Props = {
  monster: monster.monster
  levelId: number
}

type createBool = {
  decision: number
  secret: boolean
  invisible: boolean
  hide: boolean
}
export const CopyMonsterPiece = (props: Props) => {
  const [expanded, setExpanded] = useState(false)
  const toggleAccordion = () => {
    setExpanded(!expanded)
  }
  const [decision, setDicision] = useState(0)
  const onDecisionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDicision(Number((event.target as HTMLInputElement).value))
  }
  const [statusSecret, setStatusSecret] = useState(false)
  const onSecretChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatusSecret(!statusSecret)
  }
  const [statusInvisible, setStatusInvisible] = useState(false)
  const onInvisibleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatusInvisible(!statusInvisible)
  }
  const [statusHide, setStatusHide] = useState(false)
  const onHideChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatusHide(!statusHide)
  }


  const createPiece = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(decision, statusSecret, statusInvisible, statusHide);
    const boo: createBool = {
      decision: decision,
      secret: statusSecret,
      invisible: statusInvisible,
      hide: statusHide
    }
    create(props, boo)
  }

  return (
    <Accordion expanded={expanded} onChange={toggleAccordion} style={{ width: '20em', border: '2px #000000 solid' }}>
      <AccordionSummary>
        <Typography>ココフォリア駒作成</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={createPiece}>
          <FormControl>
            <FormLabel>判定方法</FormLabel>
            <RadioGroup row value={decision} onChange={onDecisionChange}>
              <FormControlLabel value={0} control={<Radio />} label={"固定値"} />
              <FormControlLabel value={1} control={<Radio />} label={"ダイス"} />
              <FormControlLabel value={2} control={<Radio />} label={"両方"} />
            </RadioGroup>
            <FormLabel>ステータス公開</FormLabel>
            <RadioGroup row value={statusSecret} onChange={onSecretChange}>
              <FormControlLabel value={false} control={<Radio />} label={"公開"} />
              <FormControlLabel value={true} control={<Radio />} label={"非公開"} />
            </RadioGroup>
            <FormLabel>発言時キャラクター表示</FormLabel>
            <RadioGroup row value={statusInvisible} onChange={onInvisibleChange}>
              <FormControlLabel value={false} control={<Radio />} label={"表示"} />
              <FormControlLabel value={true} control={<Radio />} label={"非表示"} />
            </RadioGroup>
            <FormLabel>盤面キャラクター一覧表示</FormLabel>
            <RadioGroup row value={statusHide} onChange={onHideChange}>
              <FormControlLabel value={false} control={<Radio />} label={"表示"} />
              <FormControlLabel value={true} control={<Radio />} label={"非表示"} />
            </RadioGroup>
            <Button type="submit">駒作成</Button>
          </FormControl>
        </form>
      </AccordionDetails>
    </Accordion>

  )
}