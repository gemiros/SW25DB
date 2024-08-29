import React, { useEffect, useState } from "react"
import { PartsProps } from "./props"
import CachedIcon from '@mui/icons-material/Cached';
import { Button, styled, Table, TableBody, TableCell, tableCellClasses, TableRow } from "@mui/material";
import { levelInit, partInit } from "../../const/monster";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { PartItem } from "./partItem";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: 'center',
    border: '1px #aaaaaa solid'
  },
}));

export const Parts = (props: PartsProps) => {
  const { levels, setLevels, race, lv } = props
  const [cores, setCores] = useState<string[]>([])
  const [isRider, setIsRider] = useState<boolean>(false)
  const [oneParts, setOneParts] = useState<monster.part[]>([])
  const lvPlus = () => {
    const tmpLevels: monster.level[] = structuredClone(levels)
    tmpLevels.length == 0 ?
      tmpLevels.push({
        lv: lv + levels.length,
        parts: [structuredClone(partInit)]
      })
      :
      tmpLevels.push({
        lv: lv + levels.length,
        parts: structuredClone(levels[0].parts)
      })
    setLevels(tmpLevels)
  }
  const lvMinus = () => {
    if (levels.length !== 0) {
      const tmpLevels = structuredClone(levels)
      tmpLevels.pop()
      setLevels(tmpLevels)
    }
  }
  const partsPlus = () => {
    if (race === '騎獣') {
      if (levels.length == 0) {
        lvPlus()
      } else {
        const tmp = structuredClone(levels)
        tmp.forEach(tmpLevel => {
          tmpLevel.parts.push(structuredClone(partInit))
        });
        setLevels(tmp)
      }
    } else {
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
  }
  const partsMinus = () => {
    let tmp = structuredClone(levels)
    tmp.forEach((levels) => {
      levels.parts.pop()
    });
    tmp = tmp.filter((t) => t.parts.length)
    setLevels(tmp)
  }
  const allClear = () => {
    setLevels([])
  }


  useEffect(() => {
    if (levels.length) {
      if (levels[0].parts.length) {
        setCores(levels[0].parts.filter((part) => part.core).map((part) => part.name))
      }
      setOneParts(levels[0].parts)
    } else {
      setCores([])
    }
  }, [levels])
  useEffect(() => {
    if (!oneParts.length) {
      return
    }
    setLevels(prev => {
      const tmp = structuredClone(prev)
      if (!prev.length) {
        return prev
      }
      for (let i = 0; i < tmp.length; i++) {
        tmp[i].parts.forEach((p, id) => {
          p.core = oneParts[id].core
          p.name = oneParts[id].name
        })
      }
      return tmp
    })
  }, [oneParts])
  useEffect(() => {
    if (levels.length) {
      if (levels[0].parts.length) {
        setCores(levels[0].parts.filter((part) => part.core).map((part) => part.name))
      }
      setOneParts(levels[0].parts)
    } else {
      setCores([])
    }
  }, [props.paramName])
  useEffect(() => {
    setIsRider(race === '騎獣')
  }, [race])
  useEffect(() => {
    setLevels((prevs) => {
      const newData = structuredClone(prevs)
      prevs.forEach((prev, id) => {
        prev.lv = lv + id
      });
      return newData
    })
  }, [lv])


  return (
    <div style={{ marginTop: '1em' }}>
      {isRider ? <>
        <Button variant="contained" style={{ marginBottom: '1em' }} onClick={lvPlus}>Lv追加<AddCircle /></Button>
        <Button variant="contained" style={{ marginBottom: '1em' }} onClick={lvMinus}>Lv削除<RemoveCircle /></Button>
      </> : null}
      <Button variant="contained" style={{ marginBottom: '1em' }} onClick={partsPlus}>部位追加<AddCircle /></Button>
      <Button variant="contained" style={{ marginBottom: '1em' }} onClick={partsMinus}>部位削除<RemoveCircle /></Button>
      <Button variant="contained" style={{ marginBottom: '1em' }} onClick={allClear}>クリア<CachedIcon /></Button>
      {isRider
        ? <RiderParts oneParts={oneParts} setOneParts={setOneParts} levels={levels} setLevels={setLevels} race={race} paramName={props.paramName} />
        : <ElseParts oneParts={oneParts} setOneParts={setOneParts} levels={levels} setLevels={setLevels} race={race} paramName={props.paramName} />}
      コア部位：{cores.length ? cores.join('、') : 'なし'}
    </div>
  )
}

type riderPartsProps = {
  levels: monster.level[]
  setLevels: React.Dispatch<React.SetStateAction<monster.level[]>>
  race: string
  paramName: string
  oneParts: monster.part[];
  setOneParts: React.Dispatch<React.SetStateAction<monster.part[]>>;
}
const RiderParts = ({ levels, setLevels, race, paramName, oneParts, setOneParts }: riderPartsProps) => {
  return (
    <Table>
      <TableBody>
        {levels.length ? levels.map((level, id) => <React.Fragment key={id}>
          <TableRow>
            <StyledTableCell style={{ padding: '0', height: 'auto' }}>Lv.{level.lv}</StyledTableCell>
          </TableRow>
          {
            level.parts.map((part, idx) =>
              <PartItem oneParts={oneParts} setOneParts={setOneParts} key={idx} levelId={id} idx={idx} part={part} levels={levels} setLevels={setLevels} race={race} paramName={paramName} />)
          }
        </React.Fragment>) : null}
      </TableBody>
    </Table>
  )
}

const ElseParts = ({ levels, setLevels, race, paramName, oneParts, setOneParts }: riderPartsProps) => {
  return (
    <Table>
      <TableBody>
        {
          levels.length
            ? levels[0].parts.map((part, idx) =>
              <PartItem oneParts={oneParts} setOneParts={setOneParts} key={idx} levelId={0} idx={idx} part={part} levels={levels} setLevels={setLevels} race={race} paramName={paramName} />)
            : null
        }
      </TableBody>
    </Table>
  )
}