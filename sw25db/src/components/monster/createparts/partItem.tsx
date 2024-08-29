import { TableRow, Checkbox, styled, TableCell, tableCellClasses } from "@mui/material";
import { StatusInput } from "./foundationStatus";
import { useEffect, useState, useCallback } from "react";
import { handleChange } from "../../utilFunc/utilFunc";
import { PartsDetailProps } from "./props";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: 'center',
    border: '1px #aaaaaa solid',
  },
}));

export const PartItem = ({ idx, part, race, levels, setLevels, levelId, setOneParts, paramName }: PartsDetailProps) => {

  const [state, setState] = useState({
    core: part.core ?? false,
    name: part.name ?? '',
    hit: part.hit ?? 0,
    damage: part.damage ?? 0,
    avoid: part.avoid ?? 0,
    protect: part.protect ?? 0,
    hp: part.hp ?? 0,
    mp: Number(part.mp) ?? 0,
    life: part.lifeRes ?? 0,
    mind: part.mindRes ?? 0,
  });

  const [isMP, setIsMP] = useState(true);
  const [isOne, setIsOne] = useState(levelId === 0);

  const updateState = useCallback(() => {
    const updatedPart = { ...part, ...state, mp: isMP ? String(state.mp) : '0' };
    if (race === '騎獣') {
      updatedPart.lifeRes = state.life;
      updatedPart.mindRes = state.mind;
    }
    const updatedLevels = structuredClone(levels);
    updatedLevels[levelId].parts[idx] = updatedPart;
    setLevels(updatedLevels);
    if (isOne) {
      setOneParts(prev => {
        const newParts = structuredClone(prev);
        newParts[idx] = updatedPart;
        return newParts;
      });
    }
  }, [state, isMP, race, part, levels, idx, levelId, setLevels, setOneParts, isOne]);

  useEffect(() => {
    updateState();
  }, [state, isMP]);

  useEffect(() => {
    setState({
      core: part.core ?? false,
      name: part.name ?? '',
      hit: part.hit ?? 0,
      damage: part.damage ?? 0,
      avoid: part.avoid ?? 0,
      protect: part.protect ?? 0,
      hp: part.hp ?? 0,
      mp: Number(part.mp) ?? 0,
      life: part.lifeRes ?? 0,
      mind: part.mindRes ?? 0,
    });
  }, [paramName, part]);

  return (
    <TableRow key={idx}>
      <StyledTableCell style={{ padding: '0', height: 'auto', width: '1%' }}>
        <Checkbox disabled={!isOne} checked={state.core} onChange={() => setState(prev => ({ ...prev, core: !prev.core }))} />
      </StyledTableCell>
      <StyledTableCell style={{ padding: '0', height: 'auto', width: '19%' }}>
        <StatusInput disabled={!isOne} inputName="攻撃方法" value={state.name} onChange={handleChange(value => setState(prev => ({ ...prev, name: value })), String)} />
      </StyledTableCell>
      <StyledTableCell style={{ padding: '0', height: 'auto', width: '10%' }}>
        <StatusInput inputName="命中力" value={state.hit} onChange={handleChange(value => setState(prev => ({ ...prev, hit: value })), Number)} />
      </StyledTableCell>
      <StyledTableCell style={{ padding: '0', height: 'auto', width: '10%' }}>
        <StatusInput inputName="打撃点" value={state.damage} onChange={handleChange(value => setState(prev => ({ ...prev, damage: value })), Number)} />
      </StyledTableCell>
      <StyledTableCell style={{ padding: '0', height: 'auto', width: '10%' }}>
        <StatusInput inputName="回避力" value={state.avoid} onChange={handleChange(value => setState(prev => ({ ...prev, avoid: value })), Number)} />
      </StyledTableCell>
      <StyledTableCell style={{ padding: '0', height: 'auto', width: '10%' }}>
        <StatusInput inputName="防護点" value={state.protect} onChange={handleChange(value => setState(prev => ({ ...prev, protect: value })), Number)} />
      </StyledTableCell>
      <StyledTableCell style={{ padding: '0', height: 'auto', width: '10%' }}>
        <StatusInput inputName="HP" value={state.hp} onChange={handleChange(value => setState(prev => ({ ...prev, hp: value })), Number)} />
      </StyledTableCell>
      <StyledTableCell style={{ padding: '0', height: 'auto', width: '1%' }}>
        <Checkbox checked={isMP} onChange={() => setIsMP(prev => !prev)} />
      </StyledTableCell>
      {isMP ? (
        <StyledTableCell style={{ padding: '0', height: 'auto', width: '10%' }}>
          <StatusInput inputName="MP" value={state.mp} onChange={handleChange(value => setState(prev => ({ ...prev, mp: value })), Number)} />
        </StyledTableCell>
      ) : (
        <StyledTableCell style={{ border: 'none', padding: '0', height: 'auto', width: '10%' }} />
      )}
      {race === '騎獣' && (
        <>
          <StyledTableCell style={{ padding: '0', height: 'auto', width: '10%' }}>
            <StatusInput inputName="生命抵抗" value={state.life} onChange={handleChange(value => setState(prev => ({ ...prev, life: value })), Number)} />
          </StyledTableCell>
          <StyledTableCell style={{ padding: '0', height: 'auto', width: '10%' }}>
            <StatusInput inputName="精神抵抗" value={state.mind} onChange={handleChange(value => setState(prev => ({ ...prev, mind: value })), Number)} />
          </StyledTableCell>
        </>
      )}
    </TableRow>
  );
};
