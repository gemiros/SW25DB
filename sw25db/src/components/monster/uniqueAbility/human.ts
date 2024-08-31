// 人間
const humanFix: monster.part = {
  core: false,
  name: "",
  hit: 0,
  damage: 0,
  avoid: 0,
  protect: 0,
  hp: 0,
  mp: "0",
  lifeRes: 0,
  mindRes: 0,
};
const humanUnique: monster.ability[] = [
  {
    name: "剣の加護／運命変転",
    kind: ["○"],
    explain:
      "行為判定や打撃点決定で2dを振ったとき、直後にその出目をひっくり返します。この能力は1日に1回だけ使えます。",
    use: "",
    useData: {
      isMagic: false,
      magic: 0,
      isUse: false,
      useValue: 0,
    },
    part: [],
  },
];
// Lv1
const humanUniqueLv1: monster.ability[] = structuredClone(humanUnique);
// Lv6
const humanUniqueLv6: monster.ability[] = structuredClone(humanUnique);
humanUniqueLv6[0].explain =
  "行為判定や打撃点決定で2dを振ったとき、直後にその出目をひっくり返し、それに+1します。この能力は1日に1回だけ使えます。";
// Lv11
const humanUniqueLv11: monster.ability[] = structuredClone(humanUnique);
humanUniqueLv11[0].explain =
  "行為判定や打撃点決定で2dを振ったとき、直後にその出目をひっくり返し、それに+2します。この能力は1日に1回だけ使えます。";

// エルフ
const elfPerc = "五感(暗視)";
const elfFix: monster.part = {
  core: false,
  name: "",
  hit: 0,
  damage: -1,
  avoid: 0,
  protect: 0,
  hp: -5,
  mp: "5",
  lifeRes: 0,
  mindRes: 0,
};
const elfUnique: monster.ability[] = [
  {
    name: "剣の加護／優しき水",
    kind: ["○"],
    explain:
      "水中で呼吸、発声ができ、不利な効果を受けません。また、毒・病気属性に対する生命抵抗力・精神抵抗力判定に+2のボーナス修正を得ます。",
    use: "",
    useData: {
      isMagic: false,
      magic: 0,
      isUse: false,
      useValue: 0,
    },
    part: [],
  },
  {
    name: "種族変更／エルフ",
    kind: ["○"],
    explain: "魔力+1",
    use: "",
    useData: {
      isMagic: false,
      magic: 0,
      isUse: false,
      useValue: 0,
    },
    part: [],
  },
];
// Lv1
const elfUniqueLv1: monster.ability[] = structuredClone(elfUnique);
// Lv6
const elfUniqueLv6: monster.ability[] = structuredClone(elfUnique);
elfUniqueLv6[0].explain =
  "水中で呼吸、発声ができ、不利な効果を受けません。また、毒・病気属性に対する生命抵抗力・精神抵抗力判定に+2のボーナス修正を得ます。前記能力を位置（エリア、座標）を同じくする1体にも与えることができます。";
// Lv11
const elfUniqueLv11: monster.ability[] = structuredClone(elfUnique);
elfUniqueLv11[0].explain =
  "水中で呼吸、発声ができ、不利な効果を受けません。また、毒・病気属性に対する生命抵抗力・精神抵抗力判定に+2のボーナス修正を得ます。前記能力を位置（エリア、座標）を同じくする1体にも与えることができます。";

// ドワーフ
const dwarfPerc = "五感(暗視)";
const dwarfFix: monster.part = {
  core: false,
  name: "",
  hit: 1,
  damage: 1,
  avoid: -2,
  protect: 2,
  hp: 0,
  mp: "0",
  lifeRes: 1,
  mindRes: 1,
};
const dwarfUnique: monster.ability[] = [
  {
    name: "剣の加護／炎心",
    kind: ["○"],
    explain: "炎属性によるダメージや不利な効果を受けません。",
    use: "",
    useData: {
      isMagic: false,
      magic: 0,
      isUse: false,
      useValue: 0,
    },
    part: [],
  },
];
// Lv1
const dwarfUniqueLv1: monster.ability[] = structuredClone(dwarfUnique);
// Lv6
const dwarfUniqueLv6: monster.ability[] = structuredClone(dwarfUnique);
dwarfUniqueLv6[0].explain =
  "炎属性によるダメージや不利な効果を受けません。前記能力を位置（エリア、座標）を同じくする1体にも与えることができます。";
// Lv11
const dwarfUniqueLv11: monster.ability[] = structuredClone(dwarfUnique);
dwarfUniqueLv11[0].explain =
  "炎属性によるダメージや不利な効果を受けません。前記能力を位置（エリア、座標）を同じくする1体にも与えることができます。純エネルギー属性のダメージを被るとき、自動的にその算出ダメージを半減します。純エネルギー属性で「抵抗：半減」の効果を「抵抗：消滅」として受けます。";

// タビット

const tabbitFix: monster.part = {
  core: false,
  name: "",
  hit: -2,
  damage: 0,
  avoid: -2,
  protect: 0,
  hp: 0,
  mp: "5",
  lifeRes: 0,
  mindRes: 0,
};
const tabbitUnique: monster.ability[] = [
  {
    name: "種族変更／タビット",
    kind: ["○"],
    explain: "魔力+2、神聖魔法の使用はできない。",
    use: "",
    useData: {
      isMagic: false,
      magic: 0,
      isUse: false,
      useValue: 0,
    },
    part: [],
  },
];
// Lv1
const tabbitUniqueLv1: monster.ability[] = structuredClone(tabbitUnique);
// Lv6
const tabbitUniqueLv6: monster.ability[] = structuredClone(tabbitUnique);
// Lv11
const tabbitUniqueLv11: monster.ability[] = structuredClone(tabbitUnique);

// ルーンフォーク

const runeforkPerc = "五感(暗視)";
const runeforkFix: monster.part = {
  core: false,
  name: "",
  hit: 1,
  damage: 1,
  avoid: 0,
  protect: 0,
  hp: 5,
  mp: "5",
  lifeRes: 0,
  mindRes: 0,
};
const runeforkUnique: monster.ability[] = [
  {
    name: "HP変換",
    kind: ["▶"],
    explain:
      "任意の値だけHPの現在地を現象させ、同じ値だけ、MPを回復させます。この効果は1日に1回だけ使えます。",
    use: "",
    useData: {
      isMagic: false,
      magic: 0,
      isUse: false,
      useValue: 0,
    },
    part: [],
  },
  {
    name: "種族変更／ルーンフォーク",
    kind: ["○"],
    explain:
      "魔力+2。神聖魔法、妖精魔法、森羅魔法の使用はできない。妖精を知覚できない。",
    use: "",
    useData: {
      isMagic: false,
      magic: 0,
      isUse: false,
      useValue: 0,
    },
    part: [],
  },
];
// Lv1
const runeforkUniqueLv1: monster.ability[] = structuredClone(runeforkUnique);
// Lv6
const runeforkUniqueLv6: monster.ability[] = structuredClone(runeforkUnique);
runeforkUniqueLv6[0].explain =
  "任意の値だけHPの現在地を現象させ、同じ値だけ、MPを回復させます。この効果は1日に1回だけ使えます。前記能力が補助動作または戦闘準備で行えるようになります。";
// Lv11
const runeforkUniqueLv11: monster.ability[] = structuredClone(runeforkUnique);
runeforkUniqueLv6[0].explain =
  "任意の値だけHPの現在地を現象させ、同じ値だけ、MPを回復させます。この効果は1日に2回だけ使えます。前記能力が補助動作または戦闘準備で行えるようになります。";

// ナイトメア

const nightmareFix: monster.part = {
  core: false,
  name: "",
  hit: 1,
  damage: 1,
  avoid: 0,
  protect: 0,
  hp: 5,
  mp: "5",
  lifeRes: 0,
  mindRes: 0,
};
const nightmareUnique: monster.ability[] = [
  {
    name: "弱点",
    kind: ["○"],
    explain:
      "銀の武器に加え、「炎」「水・氷」「土」「風」の任意の1属性（作成時にGMが決定）から受ける物理ダメージ・魔法ダメージが+2点されます。",
    use: "",
    useData: {
      isMagic: false,
      magic: 0,
      isUse: false,
      useValue: 0,
    },
    part: [],
  },
  {
    name: "異貌",
    kind: ["○"],
    explain: "その魔物が魔法を使うものの場合、防護点を「+2」します",
    use: "",
    useData: {
      isMagic: false,
      magic: 0,
      isUse: false,
      useValue: 0,
    },
    part: [],
  },
  {
    name: "種族変更／ナイトメア",
    kind: ["○"],
    explain: "魔力+1",
    use: "",
    useData: {
      isMagic: false,
      magic: 0,
      isUse: false,
      useValue: 0,
    },
    part: [],
  },
];
// Lv1
const nightmareUniqueLv1: monster.ability[] = structuredClone(nightmareUnique);
// Lv6
const nightmareUniqueLv6: monster.ability[] = structuredClone(nightmareUnique);
nightmareUniqueLv6[1].explain =
  "その魔物が魔法を使うものの場合、防護点を「+2」します。打撃点+1";
// Lv11
const nightmareUniqueLv11: monster.ability[] =
  structuredClone(nightmareUniqueLv6);
nightmareUniqueLv11[2].explain = "魔力+2";

// リカント

const licantFix: monster.part = {
  core: false,
  name: "",
  hit: 1,
  damage: 1,
  avoid: 0,
  protect: 0,
  hp: -5,
  mp: "-5",
  lifeRes: -1,
  mindRes: -1,
};
const licantUnique: monster.ability[] = [
  {
    name: "獣変貌",
    kind: ["▶"],
    explain: "「知覚：五感（暗視）」となり、打撃点が+2点されます。",
    use: "",
    useData: {
      isMagic: false,
      magic: 0,
      isUse: false,
      useValue: 0,
    },
    part: [],
  },
  {
    name: "種族変更／リカント",
    kind: ["○"],
    explain:
      "リカントのキャラクターは、「▶獣変貌」状態では、神聖魔法、妖精魔法、森羅魔法以外の魔法を行使できません。",
    use: "",
    useData: {
      isMagic: false,
      magic: 0,
      isUse: false,
      useValue: 0,
    },
    part: [],
  },
];
// Lv1
const licantUniqueLv1: monster.ability[] = structuredClone(licantUnique);
// Lv6
const licantUniqueLv6: monster.ability[] = structuredClone(licantUnique);
licantUniqueLv6[0].explain =
  "「知覚：五感（暗視）」となり、打撃点が+2点されます。打撃点+1";
// Lv11
const licantUniqueLv11: monster.ability[] = structuredClone(licantUnique);
licantUniqueLv11[0].explain =
  "「知覚：五感（暗視）」となり、打撃点が+2点されます。打撃点+1。命中力+1、魔力+1";

// リルドラケン

const lildracantFix: monster.part = {
  core: false,
  name: "",
  hit: 0,
  damage: 1,
  avoid: -2,
  protect: 2,
  hp: 10,
  mp: "0",
  lifeRes: 2,
  mindRes: 0,
};
const lildracantUnique: monster.ability[] = [
  {
    name: "剣の加護／風の翼",
    kind: ["○"],
    explain:
      "10秒（1ラウンド）の間、近接攻撃の命中力・回避力判定に+1のボーナス修正を得ます。この効果は1日に6回（累計6ラウンド）まで使用可能です。",
    use: "",
    useData: {
      isMagic: false,
      magic: 0,
      isUse: false,
      useValue: 0,
    },
    part: [],
  },
  {
    name: "種族変更／リルドラケン",
    kind: ["○"],
    explain: "魔力-1",
    use: "",
    useData: {
      isMagic: false,
      magic: 0,
      isUse: false,
      useValue: 0,
    },
    part: [],
  },
];
// Lv1
const lildracantUniqueLv1: monster.ability[] =
  structuredClone(lildracantUnique);
// Lv6
const lildracantUniqueLv6: monster.ability[] =
  structuredClone(lildracantUnique);
// Lv11
const lildracantUniqueLv11: monster.ability[] =
  structuredClone(lildracantUnique);
lildracantUniqueLv11[0].explain =
  "10秒（1ラウンド）の間、近接攻撃の命中力・回避力判定に+1のボーナス修正を得ます。この効果は1日に12回（累計12ラウンド）まで使用可能です。";

// グラスランナー

const grassrunnerFix: monster.part = {
  core: false,
  name: "",
  hit: 1,
  damage: -4,
  avoid: 2,
  protect: -4,
  hp: 0,
  mp: "",
  lifeRes: 0,
  mindRes: 2,
};
const grassrunnerUnique: monster.ability[] = [
  {
    name: "マナ不干渉",
    kind: ["○"],
    explain:
      "精神抵抗力判定で対抗する魔法や効果が与えられるとき、すべて「抵抗：消滅」として扱います。",
    use: "",
    useData: {
      isMagic: false,
      magic: 0,
      isUse: false,
      useValue: 0,
    },
    part: [],
  },
  {
    name: "種族変更／グラスランナー",
    kind: ["○"],
    explain: "MPを持ちません。",
    use: "",
    useData: {
      isMagic: false,
      magic: 0,
      isUse: false,
      useValue: 0,
    },
    part: [],
  },
];
// Lv1
const grassrunnerUniqueLv1: monster.ability[] =
  structuredClone(grassrunnerUnique);
// Lv6
const grassrunnerUniqueLv6: monster.ability[] =
  structuredClone(grassrunnerUnique);
grassrunnerUniqueLv6[0].explain =
  "精神抵抗力判定で対抗する魔法や効果が与えられるとき、すべて「抵抗：消滅」として扱います。1日に1回、「射程：接触」「対象：魔法1つ」を解除することを試みることができます。基準値に精神抵抗力を用い、達成値の比べ合いで判定します。";
// Lv11
const grassrunnerUniqueLv11: monster.ability[] =
  structuredClone(grassrunnerUniqueLv6);

// メリア
const meliaFix: monster.part = {
  core: false,
  name: "",
  hit: 0,
  damage: 0,
  avoid: -1,
  protect: 0,
  hp: 10,
  mp: "5",
  lifeRes: 2,
  mindRes: 1,
};
const meliaUnique: monster.ability[] = [
  {
    name: "種族変更／メリア",
    kind: ["○"],
    explain: "魔力+1",
    use: "",
    useData: {
      isMagic: false,
      magic: 0,
      isUse: false,
      useValue: 0,
    },
    part: [],
  },
];
// Lv1
const meliaUniqueLv1: monster.ability[] = structuredClone(meliaUnique);
// Lv6
const meliaUniqueLv6: monster.ability[] = structuredClone(meliaUnique);
// Lv11
const meliaUniqueLv11: monster.ability[] = structuredClone(meliaUnique);

// ティエンス
const tienceFix: monster.part = {
  core: false,
  name: "",
  hit: 0,
  damage: 1,
  avoid: 0,
  protect: 0,
  hp: 0,
  mp: "0",
  lifeRes: 0,
  mindRes: 1,
};
const tienceUnique: monster.ability[] = [
  {
    name: "通じ合う意識",
    kind: ["▶▶", "△"],
    explain:
      "1分（6ラウンド）の間、隣接エリア（基本戦闘）または10m以内（上級戦闘・熟練戦闘）に存在する「対象：1体全」の命中力・回避力判定に+1のボーナス修正を与えます。この効果は対象が「分類：動物」「分類：幻獣」でなければ現れません。また、6時間ごとに1回だけ使えます",
    use: "",
    useData: {
      isMagic: false,
      magic: 0,
      isUse: false,
      useValue: 0,
    },
    part: [],
  },
];
// Lv1
const tienceUniqueLv1: monster.ability[] = structuredClone(tienceUnique);
// Lv6
const tienceUniqueLv6: monster.ability[] = structuredClone(tienceUnique);
tienceUniqueLv6[0].explain =
  "1分（6ラウンド）の間、全エリア（基本戦闘）または30m以内（上級戦闘・熟練戦闘）に存在する「対象：1体全」の命中力・回避力判定に+1のボーナス修正を与えます。この効果は対象が「分類：動物」「分類：幻獣」でなければ現れません。また、6時間ごとに1回だけ使えます";
// Lv11
const tienceUniqueLv11: monster.ability[] = structuredClone(tienceUnique);
tienceUniqueLv11[0].explain =
  "1分（6ラウンド）の間、全エリア（基本戦闘）または30m以内（上級戦闘・熟練戦闘）に存在する「対象：1体全」の命中力・回避力判定に+2のボーナス修正を与えます。この効果は対象が「分類：動物」「分類：幻獣」でなければ現れません。また、6時間ごとに1回だけ使えます";

// レプラカーン
const leprechaunPerc = "五感(暗視)";
const leprechaunFix: monster.part = {
  core: false,
  name: "",
  hit: 1,
  damage: -2,
  avoid: 1,
  protect: -2,
  hp: 0,
  mp: "0",
  lifeRes: -1,
  mindRes: 0,
};
const leprechaunUnique: monster.ability[] = [
  {
    name: "姿なき職人",
    kind: ["▶"],
    explain:
      "MPを5点消費して、姿を消します。【コンシール・セルフ】と同様に扱います。",
    use: "",
    useData: {
      isMagic: false,
      magic: 0,
      isUse: false,
      useValue: 0,
    },
    part: [],
  },
];
// Lv1
const leprechaunUniqueLv1: monster.ability[] =
  structuredClone(leprechaunUnique);
// Lv6
const leprechaunUniqueLv6: monster.ability[] =
  structuredClone(leprechaunUnique);
// Lv11
const leprechaunUniqueLv11: monster.ability[] =
  structuredClone(leprechaunUnique);

export type race = {
  raceId: number;
  race: string;
  fixPart: monster.part;
  fixPerc?: string;
  raceUnique1?: monster.ability[];
  raceUnique6?: monster.ability[];
  raceUnique11?: monster.ability[];
};
export const humanRace: race[] = [];

humanRace.push({
  raceId: 0,
  race: "人間",
  fixPart: humanFix,
  raceUnique1: humanUniqueLv1,
  raceUnique6: humanUniqueLv6,
  raceUnique11: humanUniqueLv11,
});

humanRace.push({
  raceId: 1,
  race: "エルフ",
  fixPart: elfFix,
  fixPerc: elfPerc,
  raceUnique1: elfUniqueLv1,
  raceUnique6: elfUniqueLv6,
  raceUnique11: elfUniqueLv11,
});

humanRace.push({
  raceId: 2,
  race: "ドワーフ",
  fixPart: dwarfFix,
  fixPerc: dwarfPerc,
  raceUnique1: dwarfUniqueLv1,
  raceUnique6: dwarfUniqueLv6,
  raceUnique11: dwarfUniqueLv11,
});

humanRace.push({
  raceId: 3,
  race: "タビット",
  fixPart: tabbitFix,
  raceUnique1: tabbitUniqueLv1,
  raceUnique6: tabbitUniqueLv6,
  raceUnique11: tabbitUniqueLv11,
});

humanRace.push({
  raceId: 4,
  race: "ルーンフォーク",
  fixPart: runeforkFix,
  fixPerc: runeforkPerc,
  raceUnique1: runeforkUniqueLv1,
  raceUnique6: runeforkUniqueLv6,
  raceUnique11: runeforkUniqueLv11,
});

humanRace.push({
  raceId: 5,
  race: "ナイトメア",
  fixPart: nightmareFix,
  fixPerc: dwarfPerc,
  raceUnique1: nightmareUniqueLv1,
  raceUnique6: nightmareUniqueLv6,
  raceUnique11: nightmareUniqueLv11,
});

humanRace.push({
  raceId: 6,
  race: "リカント",
  fixPart: licantFix,
  raceUnique1: licantUniqueLv1,
  raceUnique6: licantUniqueLv6,
  raceUnique11: licantUniqueLv11,
});

humanRace.push({
  raceId: 7,
  race: "リルドラケン",
  fixPart: lildracantFix,
  raceUnique1: lildracantUniqueLv1,
  raceUnique6: lildracantUniqueLv6,
  raceUnique11: lildracantUniqueLv11,
});

humanRace.push({
  raceId: 8,
  race: "グラスランナー",
  fixPart: grassrunnerFix,
  raceUnique1: grassrunnerUniqueLv1,
  raceUnique6: grassrunnerUniqueLv6,
  raceUnique11: grassrunnerUniqueLv11,
});

humanRace.push({
  raceId: 9,
  race: "メリア",
  fixPart: meliaFix,
  raceUnique1: meliaUniqueLv1,
  raceUnique6: meliaUniqueLv6,
  raceUnique11: meliaUniqueLv11,
});

humanRace.push({
  raceId: 10,
  race: "ティエンス",
  fixPart: tienceFix,
  raceUnique1: tienceUniqueLv1,
  raceUnique6: tienceUniqueLv6,
  raceUnique11: tienceUniqueLv11,
});

humanRace.push({
  raceId: 11,
  race: "レプラカーン",
  fixPart: leprechaunFix,
  fixPerc: leprechaunPerc,
  raceUnique1: leprechaunUniqueLv1,
  raceUnique6: leprechaunUniqueLv6,
  raceUnique11: leprechaunUniqueLv11,
});
