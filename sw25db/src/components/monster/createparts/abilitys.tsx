import { StatusInput } from "./foundationStatus";
import { handleChange } from "../../utilFunc/utilFunc";
import { Accordion, AccordionDetails, AccordionSummary, Button, Table, TableBody, TableRow, Typography } from "@mui/material";
import { AbilityItem } from "./abilityItem";
import { AddCircle, KeyboardArrowDown, KeyboardArrowUp, RemoveCircle } from "@mui/icons-material";
import CachedIcon from '@mui/icons-material/Cached';
import { UniqueAccordion } from "../viewparts/abilitys";
import { abilityInit } from "../../const/monster";
import { useEffect, useState } from "react";
import { commonFairyUnique, ancientFairyUnique } from "../uniqueAbility/fairy";
import { familia2Unique, familiaUnique } from "../uniqueAbility/familia";
import { golemUnique } from "../uniqueAbility/golem";
import { humanRace } from "../uniqueAbility/human";
import { magicMonsterUnique } from "../uniqueAbility/magicMonster";
import { undeadUnique } from "../uniqueAbility/undead";

type AbilitysProps = {
  top: monster.top;
  partNameList: string[];
  max: number
  setMax: React.Dispatch<React.SetStateAction<number>>
  abilitys: monster.ability[];
  setAbilitys: React.Dispatch<React.SetStateAction<monster.ability[]>>;
  paramName: string;
};

export const Abilitys = (props: AbilitysProps) => {
  const { top, partNameList, max, setMax, abilitys, setAbilitys } = props
  const [unique, setUnique] = useState<monster.ability[] | null>(null);
  const [expanded, setExpanded] = useState(false);

  const modifyBootys = (modifier: (abilitys: monster.ability[]) => typeof abilitys) => {
    setAbilitys(modifier([...abilitys]));
  };

  const abilitysPlus = () => modifyBootys((abilitys) => [...abilitys, abilityInit]);
  const abilitysMinus = () => modifyBootys((abilitys) => abilitys.slice(0, -1));
  const allClear = () => { setAbilitys([]) };
  const moveRow = (index: number, direction: 'up' | 'down') => {
    const newRows = structuredClone(abilitys)
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= newRows.length) return
    [newRows[index], newRows[targetIndex]] = [newRows[targetIndex], newRows[index]]
    setAbilitys(newRows)
  }
  const copyRow = (index: number) => {
    const newRow = structuredClone(abilitys[index])
    setAbilitys([...abilitys, newRow])
  }
  const handleInputChange = (index: number, field: keyof monster.ability, value: any) => {
    const newRows = structuredClone(abilitys);
    newRows[index] = { ...newRows[index], [field]: value };
    setAbilitys(newRows);
  };

  useEffect(() => {
    setUnique(null);
    switch (top.race) {
      case "人族":
        if (top.lv < 6) {
          setUnique(humanRace[0].raceUnique1!);
        } else if (top.lv < 11) {
          setUnique(humanRace[0].raceUnique6!);
        } else {
          setUnique(humanRace[0].raceUnique11!);
        }
        break;
      case "魔法生物":
      case "魔動機":
        setUnique(magicMonsterUnique);
        break;
      case "アンデッド":
        setUnique(undeadUnique);
        break;
      case "ゴーレム":
        setUnique(golemUnique);
        break;
      case "妖精":
        if (top.subRace === "通常種") {
          setUnique(commonFairyUnique);
        } else {
          setUnique(ancientFairyUnique);
        }
        break;
      case "ファミリア":
        setUnique(top.lv >= 7 ? familia2Unique : familiaUnique);
        break;
      case "騎獣":
        if (top.subRace === "魔動機") {
          setUnique(magicMonsterUnique);
        }
        break;
      default:
        break;
    }
  }, [top]);

  return (
    <div style={{ marginTop: '1em' }}>
      <hr />
      <h3>特殊能力</h3>
      {top.race === 'ゴーレム' && (
        <StatusInput style={{ width: '6em' }} inputName={"最大値"} value={max} onChange={handleChange(setMax, Number)} />
      )}
      <div>
        {unique && (
          <Accordion style={{ margin: '1em', padding: '0em', backgroundColor: '#f0f0f0', border: '1px solid #ddd', borderRadius: '1em' }}>
            <AccordionSummary expandIcon={expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}>
              <Typography variant="h6" style={{ fontWeight: "bold" }}>分類所持特殊能力</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {unique.map((item, id) => (
                <UniqueAccordion key={id} kind={item.kind} name={item.name} explain={item.explain} use={""} />
              ))}
            </AccordionDetails>
          </Accordion>
        )}
      </div>
      <div style={{ paddingBottom: '1em', justifyItems: 'center' }}>
        <Button variant="contained" onClick={abilitysPlus}>能力追加<AddCircle /></Button>
        <Button variant="contained" onClick={abilitysMinus}>能力削除<RemoveCircle /></Button>
        <Button variant="contained" onClick={allClear}>クリア<CachedIcon /></Button>
      </div>
      <Table sx={{ border: 'none' }}>
        <TableBody>
          {abilitys.map((abi, idx) => (
            <TableRow key={idx}>
              <AbilityItem
                copyRow={copyRow}
                paramName={props.paramName}
                race={top.race}
                idx={idx}
                partNameList={partNameList}
                row={abi}
                totalRows={abilitys.length}
                onMoveRow={moveRow}
                onInputChange={handleInputChange} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
