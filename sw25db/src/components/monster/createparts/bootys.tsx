import { AddCircle, RemoveCircle } from "@mui/icons-material";
import CachedIcon from "@mui/icons-material/Cached";
import { Button, Table, TableBody } from "@mui/material";
import { BootyItem } from "./bootyItem";
import styled from "@emotion/styled";
import { bootysInit } from "../../const/monster";

const ActionButtons = styled("div")({
  paddingBottom: '1em',
  display: 'flex',
  // gap: '1em',
});

type BootysProps = {
  bootys: monster.booty[];
  setBootys: React.Dispatch<React.SetStateAction<monster.booty[]>>;
  paramName: string;
};

export const Bootys = (props: BootysProps) => {
  const { bootys, setBootys } = props;

  const modifyBootys = (modifier: (bootys: monster.booty[]) => typeof bootys) => {
    setBootys(modifier([...bootys]));
  };

  const bootyPlus = () => modifyBootys((bootys) => [...bootys, bootysInit]);
  const bootyMinus = () => modifyBootys((bootys) => bootys.slice(0, -1));
  const allClear = () => setBootys([]);
  const moveRow = (index: number, direction: 'up' | 'down') => {
    const newRows = structuredClone(bootys)
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= newRows.length) return
    [newRows[index], newRows[targetIndex]] = [newRows[targetIndex], newRows[index]]
    setBootys(newRows)
  }

  const handleInputChange = (index: number, field: keyof monster.booty, value: string) => {
    const newRows = structuredClone(bootys);
    newRows[index] = { ...newRows[index], [field]: value };
    setBootys(newRows);
  };

  return (
    <div>
      <hr />
      <h3>戦利品</h3>
      <ActionButtons>
        <Button variant="contained" onClick={bootyPlus}>
          戦利品追加 <AddCircle />
        </Button>
        <Button variant="contained" onClick={bootyMinus}>
          戦利品削除 <RemoveCircle />
        </Button>
        <Button variant="contained" onClick={allClear}>
          クリア <CachedIcon />
        </Button>
      </ActionButtons>
      <Table>
        <TableBody>
          {bootys.map((booty, index) =>
            <BootyItem
              key={index}
              row={booty}
              index={index}
              totalRows={bootys.length}
              onMoveRow={moveRow}
              onInputChange={handleInputChange} />)}
        </TableBody>
      </Table>
    </div>
  );
};
