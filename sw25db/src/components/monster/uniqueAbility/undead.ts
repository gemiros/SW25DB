export const undeadUnique: monster.ability[] = [
  {
    name: "毒・病気・精神効果属性(弱)無効",
    kind: ["○"],
    explain:
      "アンデッドは、毒属性や病気属性の効果やダメージをいっさいうけません。また、精神効果属性(弱)に属する効果も受けません。",
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
    name: "回復効果が不安定",
    kind: ["○"],
    explain:
      "神聖魔法やアイテム〈ユニコーンの角〉などの回復効果は、アンデッドに対してダメージを与えます。" +
      "魔動機術、妖精魔法、森羅魔法などの回復効果はアンデッドに何の効果も及ぼしません。" +
      "精霊魔法など極一部の回復効果は、アンデッドのHPを回復させます。",
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
