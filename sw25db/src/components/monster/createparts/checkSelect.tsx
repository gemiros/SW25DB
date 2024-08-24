import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Padding } from '@mui/icons-material';
import { Button, SxProps, Theme } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;


type Props = {
  tagName: string
  selectData: string[]
  setSelectData: (s: string[]) => void
  useData: string[]
  disabled?: boolean
  divStyle?: React.CSSProperties
  formSX?: SxProps<Theme>
}

export default function MultipleSelectCheckmarks(props: Props) {
  const handleChange = (event: SelectChangeEvent<typeof props.selectData>) => {
    const {
      target: { value },
    } = event;
    props.setSelectData(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const clearHandle = () => {
    props.setSelectData([])
  }

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
      {!props.disabled ? <Button variant="contained" style={{ marginBottom: '1em' }} onClick={clearHandle}>クリア</Button>
        : null
      }
      <FormControl sx={sx}>
        <InputLabel id="demo-multiple-checkbox-label">{props.tagName}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={props.selectData}
          onChange={handleChange}
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
