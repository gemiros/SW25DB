import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material"

type Props = {
  dataName: string
  data: string
  useList: string[]
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const FoudationStatus = (props: Props) => {
  const { dataName, data, useList, onChange } = props
  return <FormControl>
    <Grid container alignItems="center">
      {dataName}：
      <RadioGroup row onChange={onChange} value={data}>
        {useList.map((i, id) => <FormControlLabel key={id} value={i} control={<Radio />} label={i} />)}
      </RadioGroup>
    </Grid>
  </FormControl>
}

type Props2 = {
  inputName: string
  value: number | string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  style?: React.CSSProperties | undefined
  endAdornment?: null
  readonly?: boolean
}

export const StatusInput = (props: Props2) => {
  const { inputName, value, onChange, style } = props
  return <TextField fullWidth style={style}
    aria-readonly={props.readonly}
    label={inputName}
    value={value}
    onChange={onChange}
    type={typeof value == 'number' ? 'number' : 'text'}
    InputProps={{
      inputProps: {
        min: 0
      }
    }}
  />
}