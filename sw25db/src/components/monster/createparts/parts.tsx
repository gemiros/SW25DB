import { useEffect, useState } from "react"
import { PartsProps } from "./props"
import CachedIcon from '@mui/icons-material/Cached';
import { Button, Table, TableBody } from "@mui/material";
import { levelInit, partInit } from "../../const/monster";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { PartItem } from "./partItem";

export const Parts = (props: PartsProps) => {
  const { levels, setLevels } = props
  // const [levels, setLevels] = useState<monster.level[]>([])
  const [cores, setCores] = useState<string[]>([])
  const partsPlus = () => {
    if (levels.length !== 0) {
      const tmpLevels = structuredClone(levels)
      tmpLevels.forEach((level, id) => {
        const tmpLevel = structuredClone(level)
        tmpLevel.parts.push(structuredClone(partInit))
        tmpLevels[id] = tmpLevel
      });
      setLevels(tmpLevels)
    } else {
      const tmpLevel: monster.level[] = [structuredClone(levelInit)]
      tmpLevel[0].parts.push(structuredClone(partInit))
      setLevels(tmpLevel)
    }
  }
  const partsMinus = () => {
    if (levels.length !== 0) {
      const tmpLevels = structuredClone(levels)
      tmpLevels[0].parts.pop()
      setLevels(tmpLevels)
    }
  }
  const allClear = () => {
    setLevels([])
  }
  useEffect(() => {
    if (levels.length) {
      if (levels[0].parts.length) {
        setCores(levels[0].parts.filter((part) => part.core).map((part) => part.name))
      }
    } else {
      setCores([])
    }
  }, [levels])
  return <div style={{ marginTop: '1em' }}>
    <Button variant="contained" style={{ marginBottom: '1em' }} onClick={partsPlus}>部位追加<AddCircle /></Button>
    <Button variant="contained" style={{ marginBottom: '1em' }} onClick={partsMinus}>部位削除<RemoveCircle /></Button>
    <Button variant="contained" style={{ marginBottom: '1em' }} onClick={allClear}>クリア<CachedIcon /></Button>
    <Table>
      <TableBody>
        {levels.length ? levels[0].parts.map((part, idx) => <PartItem key={idx} levelId={0} idx={idx} part={part} levels={levels} setLevels={setLevels} />) : null}
      </TableBody>
    </Table>
    コア部位：{cores.length ? cores.join('、') : 'なし'}
  </div>
}