import React from "react"
import { ExplanationProps } from "./props"
import TextField from "@mui/material/TextField/TextField"
import { handleChange } from "../../utilFunc/utilFunc"

export const Explanation = (props: ExplanationProps) => {
  const { explanation, setExplanation } = props
  return <div>
    <hr></hr>
    <h4>解説</h4>
    <hr></hr>
    <TextField multiline style={{ width: '50em' }} value={explanation} onChange={handleChange(setExplanation, v => v)} />
  </div>
}