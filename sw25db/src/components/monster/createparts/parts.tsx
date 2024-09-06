import React, { useEffect, useState, useCallback } from "react";
// import { PartsProps } from "./props";
import CachedIcon from '@mui/icons-material/Cached';
import { Button, Checkbox, styled, Table, TableBody, TableCell, tableCellClasses, TableHead, TableRow, TextField } from "@mui/material";
import { levelInit, partInit } from "../../const/monster";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { PartItem } from "./partItem";
import { StatusInput } from "./foundationStatus";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: '0', height: 'auto',
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: 'center',
    border: '1px #aaaaaa solid',
  },
}));

export type PartsProps = {
  levels: monster.level[];
  setLevels: React.Dispatch<React.SetStateAction<monster.level[]>>;
  race: string;
  lv: number;
  paramName: string;
};

export const Parts: React.FC<PartsProps> = ({ levels, setLevels, race, lv, paramName }) => {
  const [cores, setCores] = useState<string[]>([]);
  const [isRider, setIsRider] = useState<boolean>(race == '騎獣');
  // const [oneParts, setOneParts] = useState<monster.part[]>([]);

  const updateLevels = useCallback(
    (updateFn: (levels: monster.level[]) => monster.level[]) => {
      setLevels((prev) => updateFn(structuredClone(prev)));
    },
    [setLevels]
  );

  const lvPlus = useCallback(() => {
    updateLevels((prevLevels) => {
      const newLevel: monster.level = {
        ...structuredClone(levelInit),
        lv: lv + prevLevels.length,
        parts: prevLevels.length > 0 ? structuredClone(prevLevels[0].parts) : [structuredClone(partInit)],
      };
      return [...prevLevels, newLevel];
    });
  }, [lv, updateLevels]);

  const lvMinus = useCallback(() => {
    updateLevels((prevLevels) => prevLevels.slice(0, -1));
  }, [updateLevels]);

  const partsPlus = useCallback(() => {
    updateLevels((prevLevels) => {
      const newPart = structuredClone(partInit);
      if (prevLevels.length === 0) {
        return [{ lv, parts: [newPart] }];
      }
      // if (race == '騎獣') {
      //   return [{ lv, parts: [newPart] }];
      // }
      console.log(prevLevels.length);
      return prevLevels.map((level) => ({
        ...level,
        parts: [...level.parts, newPart],
      }));
    });
  }, [lv, race, updateLevels]);

  const partsMinus = useCallback(() => {
    updateLevels((prevLevels) =>
      prevLevels
        .map((level) => ({
          ...level,
          parts: level.parts.slice(0, -1),
        }))
        .filter((level) => level.parts.length > 0)
    );
  }, [updateLevels]);

  const allClear = () => setLevels([]);

  useEffect(() => {
    setIsRider(race == '騎獣')
  }, [race])
  useEffect(() => {
    setCores(levels[0] ? levels[0].parts ? levels[0].parts.filter((p) => p.core).map(p => p.name) : [] : [])
  }, [levels])

  useEffect(() => {
    const tmp = structuredClone(levels)
    tmp.forEach((l, i) => {
      l.lv = lv + i
    });
    setLevels(tmp)
  }, [lv])

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
      <LevelTable levels={levels} setLevels={setLevels} race={race} />
      コア部位：{cores.length ? cores.join('、') : 'なし'}
    </div>
  );
};

interface LevelTableProps {
  levels: monster.level[];
  setLevels: React.Dispatch<React.SetStateAction<monster.level[]>>;
  race: string
}

const LevelTable: React.FC<LevelTableProps> = ({ levels, setLevels, race }) => {
  const handleCoreNameChange = useCallback(
    (index: number, updatedPart: Partial<monster.part>) => {
      const newLevels = structuredClone(levels);

      // levels[0]のparts[index]を更新
      newLevels[0].parts[index] = { ...newLevels[0].parts[index], ...updatedPart };

      // 他のlevelsにも同様の更新を適用（isCoreとnameのみ）
      for (let i = 1; i < newLevels.length; i++) {
        newLevels[i].parts[index].core = newLevels[0].parts[index].core;
        newLevels[i].parts[index].name = newLevels[0].parts[index].name;
      }

      setLevels(newLevels);
    },
    [levels, setLevels]
  );

  const handlePartChange = useCallback(
    (levelIndex: number, partIndex: number, updatedPart: Partial<monster.part>) => {
      console.log(levelIndex, partIndex, updatedPart);

      const newLevels = structuredClone(levels);
      newLevels[levelIndex].parts[partIndex] = {
        ...newLevels[levelIndex].parts[partIndex],
        ...updatedPart,
      };
      console.log(newLevels);

      setLevels(newLevels);
    },
    [levels, setLevels]
  );

  return (
    <div>
      {levels.map((level, levelIndex) => (
        <Table key={`level-${levelIndex}`} style={{ marginBottom: '20px' }}>
          {levels.length > 1 && (
            <TableHead>
              <TableRow>
                <StyledTableCell colSpan={11}>Lv. {level.lv}</StyledTableCell>
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {level.parts.map((part, partIndex) => (
              <PartTable
                key={`part-${partIndex}`}
                part={part}
                onCoreNameChange={(updatedPart) => handleCoreNameChange(partIndex, updatedPart)}
                onPartChange={(updatedPart) => handlePartChange(levelIndex, partIndex, updatedPart)}
                isEditable={levelIndex === 0}
                race={race}// levels[0]だけのisCoreとnameを編集可能にする
              />
            ))}
          </TableBody>
        </Table>
      ))}
    </div>
  );
};

interface PartTableProps {
  part: monster.part;
  onCoreNameChange: (updatedPart: Partial<monster.part>) => void;
  onPartChange: (updatedPart: Partial<monster.part>) => void;
  isEditable: boolean;
  race: string
}

const PartTable = ({ part, onCoreNameChange, onPartChange, isEditable, race }: PartTableProps) => {
  const [isMP, setIsMP] = useState<boolean>(true)
  return (
    <TableRow>
      <StyledTableCell style={{ padding: '0', height: 'auto', width: '1%' }}>
        <Checkbox
          disabled={!isEditable}
          checked={part.core}
          onChange={(e) => onCoreNameChange({ core: e.target.checked })} />
      </StyledTableCell>
      <StyledTableCell style={{ padding: '0', height: 'auto', width: '19%' }}>
        <StatusInput
          disabled={!isEditable}
          inputName="攻撃方法" value={part.name}
          onChange={(e) => onCoreNameChange({ name: e.target.value })}
        />
      </StyledTableCell>
      <StyledTableCell style={{ padding: '0', height: 'auto', width: '10%' }}>
        <StatusInput inputName="命中力" value={part.hit} onChange={(e) => onPartChange({ hit: Number(e.target.value) })} />
      </StyledTableCell>
      <StyledTableCell style={{ padding: '0', height: 'auto', width: '10%' }}>
        <StatusInput inputName="打撃点" value={part.damage} onChange={(e) => onPartChange({ damage: Number(e.target.value) })} />
      </StyledTableCell>
      <StyledTableCell style={{ padding: '0', height: 'auto', width: '10%' }}>
        <StatusInput inputName="回避力" value={part.avoid} onChange={(e) => onPartChange({ avoid: Number(e.target.value) })} />
      </StyledTableCell>
      <StyledTableCell style={{ padding: '0', height: 'auto', width: '10%' }}>
        <StatusInput inputName="防護点" value={part.protect} onChange={(e) => onPartChange({ protect: Number(e.target.value) })} />
      </StyledTableCell>
      <StyledTableCell style={{ padding: '0', height: 'auto', width: '10%' }}>
        <StatusInput inputName="HP" value={part.hp} onChange={(e) => onPartChange({ hp: Number(e.target.value) })} />
      </StyledTableCell>
      <StyledTableCell style={{ padding: '0', height: 'auto', width: '1%' }}>
        <Checkbox checked={isMP} onChange={() => setIsMP(prev => !prev)} />
      </StyledTableCell>
      {isMP ? (
        <StyledTableCell style={{ padding: '0', height: 'auto', width: '10%' }}>
          <StatusInput type="number" inputName="MP" value={part.mp ?? 0} onChange={(e) => onPartChange({ mp: e.target.value })} />
        </StyledTableCell>
      ) : (
        <StyledTableCell style={{ border: 'none', padding: '0', height: 'auto', width: '10%' }} />
      )}
      {race === '騎獣' && (
        <>
          <StyledTableCell style={{ padding: '0', height: 'auto', width: '10%' }}>
            <StatusInput inputName="生命抵抗" value={part.lifeRes ?? 0} onChange={(e) => onPartChange({ lifeRes: Number(e.target.value) })} />
          </StyledTableCell>
          <StyledTableCell style={{ padding: '0', height: 'auto', width: '10%' }}>
            <StatusInput inputName="精神抵抗" value={part.mindRes ?? 0} onChange={(e) => onPartChange({ mindRes: Number(e.target.value) })} />
          </StyledTableCell>
        </>
      )}
    </TableRow>
  );
}