export const golemUniqueStatus: monster.fixedStatus = {
  int: "命令を聞く",
  perc: "魔法",
  reac: "命令による",
  lang: ["なし"],
  habi: ["さまざま"],
};
export const golemUnique: monster.ability[] = [
  {
    name: "毒・病気・精神効果属性無効",
    kind: ["○"],
    explain:
      "魔法生物であるゴーレムは、これらの属性のダメージや効果をいっさいうけません。",
    useData: {
      isMagic: false,
      magic: 0,
      isUse: false,
      useValue: 0,
    },
    part: [],
  },
  {
    name: "感知される",
    kind: ["○"],
    explain:
      "魔法生物であるゴーレムは、【センス・マジック】など、魔力を感知する魔法や効果によって感知されます。",
    useData: {
      isMagic: false,
      magic: 0,
      isUse: false,
      useValue: 0,
    },
    part: [],
  },
  {
    name: "人工の生命",
    kind: ["○"],
    explain:
      "一部のHPを回復させる効果は、ゴーレムには影響しません。魔法生物のHPを回復させる効果をゴーレムは受けます。",
    useData: {
      isMagic: false,
      magic: 0,
      isUse: false,
      useValue: 0,
    },
    part: [],
  },
  {
    name: "正体露見＝コンジャラー技能",
    kind: ["○"],
    explain:
      "コンジャラー技能を持つものは、ゴーレムに対する魔物知識判定に自動的に成功します。弱点を知るには、セージ技能の習得と本来の達成値が必要です",
    useData: {
      isMagic: false,
      magic: 0,
      isUse: false,
      useValue: 0,
    },
    part: [],
  },
];
