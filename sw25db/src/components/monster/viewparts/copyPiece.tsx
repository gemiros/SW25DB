import { Accordion, AccordionDetails, AccordionSummary, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, styled, Switch, Typography, useFormControl } from "@mui/material"
import React, { useState } from "react"
import { create } from "./createPieceFunc"
import { race } from "../uniqueAbility/human"

type Props = {
  monster: monster.monster
  levelId: number
  hRace: race
}

type createBool = {
  decision: number
  secret: boolean
  invisible: boolean
  hide: boolean
}

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&::before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&::after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));
export const CopyMonsterPiece = (props: Props) => {
  const [expanded, setExpanded] = useState(false)
  const toggleAccordion = () => {
    setExpanded(!expanded)
  }
  const [decision, setDicision] = useState(0)
  const onDecisionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDicision(Number((event.target as HTMLInputElement).value))
  }
  const [statusSecret, setStatusSecret] = useState(true)
  const onSecretChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatusSecret(!statusSecret)
  }
  const [statusInvisible, setStatusInvisible] = useState(true)
  const onInvisibleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatusInvisible(!statusInvisible)
  }
  const [statusHide, setStatusHide] = useState(true)
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
    <Accordion expanded={expanded} onChange={toggleAccordion} style={{ width: '22em', border: '2px #000000 solid' }}>
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
            <FormControlLabel
              control={<Android12Switch value={statusSecret} onChange={onSecretChange} defaultChecked />}
              label="ステータス非公開"
            />
            <FormControlLabel
              control={<Android12Switch value={statusInvisible} onChange={onInvisibleChange} defaultChecked />}
              label="発言時キャラクター非表示"
            />
            <FormControlLabel
              control={<Android12Switch value={statusHide} onChange={onHideChange} defaultChecked />}
              label="盤面キャラクター一覧非表示"
            />
            <Button type="submit">駒作成</Button>
          </FormControl>
        </form>
      </AccordionDetails>
    </Accordion>

  )
}