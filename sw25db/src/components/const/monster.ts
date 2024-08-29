export const raceList = [
  "蛮族",
  "動物",
  "植物",
  "アンデッド",
  "魔法生物",
  "魔動機",
  "幻獣",
  "妖精",
  "魔神",
  "人族",
  "ゴーレム",
  "ファミリア",
  "騎獣",
];

export const subRaceList = ["動物", "幻獣", "魔動機"];

export const IntList = [
  "なし",
  "動物並み",
  "低い",
  "人間並み",
  "高い",
  "命令を聞く",
];
export const PercientList = [
  "五感",
  "五感（暗視）",
  "五感（聴覚）",
  "五感（嗅覚）",
  "魔法",
  "機械",
];
export const ReactionList = [
  "友好的",
  "中立",
  "敵対的",
  "腹具合による",
  "命令による",
];

export const LanguageList = [
  "交易共通語",
  "地方語",
  "エルフ語",
  "魔動機文明語",
  "ドワーフ語",
  "グラスランナー語",
  "シャドウ語",
  "ミアキス語",
  "ソレイユ語",
  "リカント語",
  "神紀文明語",
  "魔法文明語",
  "妖精語",
  "魔神語",
  "ドラゴン語",
  "汎用蛮族語",
  "巨人語",
  "ドレイク語",
  "バルカン語",
  "ライカンスロープ語",
  "バジリスク語",
  "リザードマン語",
  "ケンタウロス語",
  "妖魔語",
  "ギルマン語",
  "オーガ語",
  "アンドロスコーピオン語",
  "マーマン語",
  "ミノタウロス語",
  "翼人語",
  "海獣語",
  "ノスフェラトゥ語",
  "ヴァルグ語",
  "生前のものを継承",
  "すべて",
  "さまざま",
  "特殊",
  "なし",
];

export const HabitatList = [
  // 特殊
  "さまざま",
  "不明",
  "不定",
  // 自然１
  "森",
  "森林",
  "草原",
  "平原",
  // 自然２
  "荒野",
  "砂漠",
  "高地",
  "丘陵",
  "洞窟",
  "洞穴",
  // 自然３
  "山",
  "山岳",
  "高山",
  "火山",
  // 自然４
  "雪原",
  "寒冷地",
  "雪山",
  // 自然５
  "水辺",
  "川",
  "川辺",
  "河口",
  "河川",
  // 自然６
  "湿地",
  "沼",
  "池",
  "温泉",
  "湖",
  "湖岸",
  // 自然７
  "海",
  "海岸",
  "海洋",
  // 特殊地域
  "秘境",
  "奈落",
  "魔域",
  "地下迷宮",
  "浮遊大陸",
  // 人工物
  "人里",
  "人里近く",
  "墳墓",
  "墓地",
  "廃墟",
  "遺跡",
  "戦場跡",
];

export const abilityKindList = ["〇", "▶", "▶︎▶︎", "△", "💬"];
export const golemItemList = [
  "猫目石の鋲",
  "猫目石の金鋲",
  "虎目石の鋲",
  "虎目石の金鋲",
  "黒玉の印",
  "太陽石の輝き",
  "尖晶石の角",
  "孔雀石の羽根",
  "瑠璃の錘",
  "玻璃の増錘",
  "紅蓮の紅玉",
  "紫電の紫水晶",
  "青蓮の青玉",
  "方解石の複眼",
  "黒曜石の盾",
  "鋼玉の守護",
  "琥珀の目",
  "珊瑚の枝",
  "柘榴石の活力",
  "柘榴石の生命力",
  "縞瑪瑙の揺らぎ",
  "血肉の赤鉄",
  "石火の黄鉄",
  "異方の菫青石",
  "月長石の安らぎ",
  "石英の途絶",
];
const size = (): string[] => {
  const list: string[] = [];
  golemItemList.forEach((item) => {
    ["小", "中", "大"].forEach((size) => {
      list.push(`${item}(${size})`);
    });
  });
  return list;
};
export const golemAllSizeItemList = size();
export const cardKindList = ["赤", "緑", "黒", "白", "金"];
export const cardLankList = ["B", "A", "S", "SS"];

export const foundationTextInit: monster.foundation = {
  kind: "character",
  data: {
    name: "",
    memo: "",
    status: [],
    params: [],
    active: true,
    secret: true,
    invisible: true,
    hideStatus: true,
    commands: "",
  },
};

export const tooInit: monster.top = {
  race: "蛮族",
  lv: 0,
  name: "",
  page: "",
};

export const statusInit: monster.status = {
  habi: [],
  imp: 0,
  int: "なし",
  lang: [],
  life: 0,
  mind: 0,
  perc: "五感",
  pop: 0,
  reac: "友好的",
  speed: "- / -",
  weak: "",
  weakValue: 0,
};

export const partInit: monster.part = {
  core: false,
  name: "",
  hit: 0,
  damage: 0,
  avoid: 0,
  protect: 0,
  hp: 0,
  mp: "",
};

export const levelInit: monster.level = {
  parts: [],
};

export const abilitysInit: monster.abilitys = {
  abilitys: [],
};

export const abilityInit: monster.ability = {
  kind: [],
  name: "",
};

export const bootysInit: monster.booty = {
  dice: "",
  item: "",
  gamel: 0,
};
