import { Theme } from "@emotion/react";
import { SxProps, FormControl, InputLabel, Select, OutlinedInput, MenuItem, Checkbox, ListItemText } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
type Props = {
  tagName: string
  selectData: string[]
  onInputChange: (index: number, field: keyof monster.booty, value: any) => void
  useData: string[]
  index: number
  divStyle?: React.CSSProperties
  formSX?: SxProps<Theme>
}

export function MultipleSelectCheckmarks(props: Props) {
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const divStyle = !props.divStyle ? { marginTop: '2em' } : props.divStyle

  const sx = !props.formSX ? { width: "45em" } : props.formSX

  return (
    <div style={divStyle}>
      <FormControl sx={sx}>
        <InputLabel id="demo-multiple-checkbox-label">{props.tagName}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={props.selectData}
          onChange={(e) => props.onInputChange(props.index, 'cardKind', e.target.value)}
          input={<OutlinedInput label={props.tagName} />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {props.useData.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={props.selectData.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

type Props2 = {
  tagName: string
  selectData: string[]
  onInputChange: (index: number, field: keyof monster.ability, value: any) => void
  useData: string[]
  index: number
  divStyle?: React.CSSProperties
  formSX?: SxProps<Theme>
}

export function MultipleSelectCheckmarksAbilitys(props: Props2) {
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const divStyle = !props.divStyle ? { marginTop: '2em' } : props.divStyle

  const sx = !props.formSX ? { width: "45em" } : props.formSX

  return (
    <div style={divStyle}>
      <FormControl sx={sx}>
        <InputLabel id="demo-multiple-checkbox-label">{props.tagName}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={props.selectData}
          onChange={(e) => props.onInputChange(props.index, 'part', e.target.value)}
          input={<OutlinedInput label={props.tagName} />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {props.useData.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={props.selectData.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}