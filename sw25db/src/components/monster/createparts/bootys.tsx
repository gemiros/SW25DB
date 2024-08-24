import { AddCircle, RemoveCircle } from "@mui/icons-material"
import Button from "@mui/material/Button/Button"
import CachedIcon from '@mui/icons-material/Cached';
import { useEffect, useState } from "react";
import { bootysInit } from "../../const/monster";
import { Table, TableBody } from "@mui/material";
import { BootyItem } from "./bootyItem";
import { BootysProps } from "./props";

export const Bootys = (props: BootysProps) => {
  const { bootys, setBootys } = props
  const bootyPlus = () => {
    setBootys([...bootys, bootysInit])
  }
  const boootyMinus = () => {
    const tmp = structuredClone(bootys)
    tmp.pop()
    setBootys(tmp)
  }
  const allClear = () => {
    setBootys([])
  }
  useEffect(() => {
    console.log(bootys);

  }, [bootys])
  return <div>
    <hr></hr>
    <h3>戦利品</h3>
    <div style={{ paddingBottom: '1em', justifyItems: 'center' }}>
      <Button variant="contained" onClick={bootyPlus}>戦利品追加<AddCircle /></Button>
      <Button variant="contained" onClick={boootyMinus}>戦利品削除<RemoveCircle /></Button>
      <Button variant="contained" onClick={allClear}>クリア<CachedIcon /></Button>
    </div>
    <Table>
      <TableBody>
        {bootys.map((_booty, id) => <BootyItem key={id} id={id} bootys={bootys} setBootys={setBootys} />)}
      </TableBody>
    </Table>
  </div>
}