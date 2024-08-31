import { race } from "../uniqueAbility/human";

export type StatusProps = {
  status: monster.status;
  setStatus: (s: monster.status) => void;
  race: string;
  paramName: string;
};

export type TopProps = {
  top: monster.top;
  setTop: (t: monster.top) => void;
  tags: string[];
  setTags: (t: string[]) => void;
  paramName: string;
};

export type PartsProps = {
  levels: monster.level[];
  setLevels: React.Dispatch<React.SetStateAction<monster.level[]>>;
  race: string;
  lv: number;
  paramName: string;
};

export type PartsDetailProps = {
  levelId: number;
  idx: number;
  part: monster.part;
  levels: monster.level[];
  setLevels: React.Dispatch<React.SetStateAction<monster.level[]>>;
  race: string;
  paramName: string;
  oneParts: monster.part[];
  setOneParts: React.Dispatch<React.SetStateAction<monster.part[]>>;
};

export type AbilitysProps = {
  top: monster.top;
  partNameList: string[];
  abilitys: monster.abilitys;
  setAbilitys: React.Dispatch<React.SetStateAction<monster.abilitys>>;
  paramName: string;
};

export type AbilityDetailProps = {
  isUse: boolean;
  useValue: number;
  setUseValue: (u: number) => void;
  resistSkill: string;
  setResistSkill: (r: string) => void;
  resistResult: string;
  setResistResult: (r: string) => void;
  explanation: string;
  setExplanation: (e: string) => void;
};

export type BootysProps = {
  bootys: monster.booty[];
  setBootys: React.Dispatch<React.SetStateAction<monster.booty[]>>;
  moveItem: (index: number, direction: "up" | "down") => void;
  paramName: string;
};

export type BootyItemProps = {
  bootys: monster.booty[];
  setBootys: React.Dispatch<React.SetStateAction<monster.booty[]>>;
  onMoveUp: () => void;
  onMoveDown: () => void;
  id: number;
  paramName: string;
};

export type ExplanationProps = {
  explanation: string;
  setExplanation: (e: string) => void;
  paramName: string;
};
