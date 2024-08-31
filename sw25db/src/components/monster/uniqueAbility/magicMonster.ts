export const magicMonsterUnique: monster.ability[] = [
  {
    name: "毒・病気・精神効果属性無効",
    kind: ["○"],
    explain:
      "魔法生物は、毒属性や病気属性の効果やダメージをいっさいうけません。また、精神効果属性に属する効果も受けません。",
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
    name: "回復効果がほぼ無効",
    kind: ["○"],
    explain:
      "魔法生物のHPを回復させる効果はごく限られており、操霊魔法や一部の特殊なアイテムからのもののみです。" +
      "神聖魔法や妖精魔法、森羅魔法などの回復効果は魔法生物のHPを回復させることはできません。" +
      "魔動機術も一部の例外を除き、無効です。",
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
    name: "感知される",
    kind: ["○"],
    explain:
      "魔法生物は、【センス。マジック】など、魔力を感知する魔法や効果によって感知されます。",
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
