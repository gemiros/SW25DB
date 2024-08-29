import React, { useEffect, useState, useCallback } from "react";
import { PartsProps } from "./props";
import CachedIcon from '@mui/icons-material/Cached';
import { Button, styled, Table, TableBody, TableCell, tableCellClasses, TableRow } from "@mui/material";
import { levelInit, partInit } from "../../const/monster";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { PartItem } from "./partItem";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: 'center',
    border: '1px #aaaaaa solid',
  },
}));

export const Parts: React.FC<PartsProps> = ({ levels, setLevels, race, lv, paramName }) => {
  const [cores, setCores] = useState<string[]>([]);
  const [isRider, setIsRider] = useState<boolean>(false);
  const [oneParts, setOneParts] = useState<monster.part[]>([]);

  const updateLevels = useCallback((updateFn: (levels: monster.level[]) => monster.level[]) => {
    setLevels(prev => updateFn(structuredClone(prev)));
  }, [setLevels]);

  const lvPlus = useCallback(() => {
    updateLevels(prevLevels => {
      const newLevel = structuredClone(levelInit);
      newLevel.lv = lv + prevLevels.length;
      newLevel.parts = prevLevels.length > 0 ? structuredClone(prevLevels[0].parts) : [structuredClone(partInit)];
      return [...prevLevels, newLevel];
    });
  }, [lv, updateLevels]);

  const lvMinus = useCallback(() => {
    updateLevels(prevLevels => prevLevels.slice(0, -1));
  }, [updateLevels]);

  const partsPlus = useCallback(() => {
    updateLevels(prevLevels => {
      if (race === '騎獣') {
        return prevLevels.map(level => ({
          ...level,
          parts: [...level.parts, structuredClone(partInit)]
        }));
      } else if (prevLevels.length === 0) {
        return [{
          lv,
          parts: [structuredClone(partInit)]
        }];
      } else {
        return prevLevels.map(level => ({
          ...level,
          parts: [...level.parts, structuredClone(partInit)]
        }));
      }
    });
  }, [lv, race, updateLevels]);

  const partsMinus = useCallback(() => {
    updateLevels(prevLevels => prevLevels.map(level => ({
      ...level,
      parts: level.parts.slice(0, -1)
    })).filter(level => level.parts.length > 0));
  }, [updateLevels]);

  const allClear = useCallback(() => {
    setLevels([]);
  }, [setLevels]);

  useEffect(() => {
    if (levels.length > 0 && levels[0].parts.length > 0) {
      setCores(levels[0].parts.filter(part => part.core).map(part => part.name));
      setOneParts(levels[0].parts);
    } else {
      setCores([]);
      setOneParts([]);
    }
  }, [levels]);

  useEffect(() => {
    if (oneParts.length > 0) {
      updateLevels(prevLevels => prevLevels.map(level => ({
        ...level,
        parts: level.parts.map((part, idx) => ({
          ...part,
          core: oneParts[idx]?.core ?? part.core,
          name: oneParts[idx]?.name ?? part.name,
        }))
      })));
    }
  }, [oneParts, updateLevels]);

  useEffect(() => {
    setIsRider(race === '騎獣');
  }, [race]);

  useEffect(() => {
    updateLevels(prevLevels => prevLevels.map((level, idx) => ({
      ...level,
      lv: lv + idx,
    })));
  }, [lv, updateLevels]);

  return (
    <div style={{ marginTop: '1em' }}>
      {isRider && (
        <>
          <Button variant="contained" style={{ marginBottom: '1em' }} onClick={lvPlus}>
            Lv追加<AddCircle />
          </Button>
          <Button variant="contained" style={{ marginBottom: '1em' }} onClick={lvMinus}>
            Lv削除<RemoveCircle />
          </Button>
        </>
      )}
      <Button variant="contained" style={{ marginBottom: '1em' }} onClick={partsPlus}>
        部位追加<AddCircle />
      </Button>
      <Button variant="contained" style={{ marginBottom: '1em' }} onClick={partsMinus}>
        部位削除<RemoveCircle />
      </Button>
      <Button variant="contained" style={{ marginBottom: '1em' }} onClick={allClear}>
        クリア<CachedIcon />
      </Button>
      {isRider ? (
        <RiderParts
          oneParts={oneParts}
          setOneParts={setOneParts}
          levels={levels}
          setLevels={setLevels}
          race={race}
          paramName={paramName}
        />
      ) : (
        <ElseParts
          oneParts={oneParts}
          setOneParts={setOneParts}
          levels={levels}
          setLevels={setLevels}
          race={race}
          paramName={paramName}
        />
      )}
      コア部位：{cores.length ? cores.join('、') : 'なし'}
    </div>
  );
};

type RiderPartsProps = {
  levels: monster.level[];
  setLevels: React.Dispatch<React.SetStateAction<monster.level[]>>;
  race: string;
  paramName: string;
  oneParts: monster.part[];
  setOneParts: React.Dispatch<React.SetStateAction<monster.part[]>>;
};

const RiderParts: React.FC<RiderPartsProps> = ({ levels, oneParts, setOneParts, setLevels, race, paramName }) => (
  <Table>
    <TableBody>
      {levels.map((level, id) => (
        <React.Fragment key={id}>
          <TableRow>
            <StyledTableCell style={{ padding: '0', height: 'auto' }}>Lv.{level.lv}</StyledTableCell>
          </TableRow>
          {level.parts.map((part, idx) => (
            <PartItem
              key={idx}
              levelId={id}
              idx={idx}
              part={part}
              levels={levels}
              setLevels={setLevels}
              oneParts={oneParts}
              setOneParts={setOneParts}
              race={race}
              paramName={paramName}
            />
          ))}
        </React.Fragment>
      ))}
    </TableBody>
  </Table>
);

const ElseParts: React.FC<RiderPartsProps> = ({ levels, oneParts, setOneParts, setLevels, race, paramName }) => (
  <Table>
    <TableBody>
      {levels[0]?.parts.map((part, idx) => (
        <PartItem
          key={idx}
          levelId={0}
          idx={idx}
          part={part}
          levels={levels}
          setLevels={setLevels}
          oneParts={oneParts}
          setOneParts={setOneParts}
          race={race}
          paramName={paramName}
        />
      ))}
    </TableBody>
  </Table>
);
