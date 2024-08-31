export const familiaUniqueStatus1: monster.fixedStatus = {
  habi: ["さまざま"],
  int: "なし",
  lang: ["なし"],
  perc: "術者と共有",
  pop: 8,
  reac: "命令による",
};
export const familiaUniqueStatus2: monster.fixedStatus = {
  habi: ["さまざま"],
  int: "人間並み",
  lang: ["魔法文明語"],
  perc: "術者と共有",
  pop: 12,
  reac: "命令による",
};
export const familiaUnique: monster.ability[] = [
  {
    name: "毒・病気・精神効果属性無効",
    kind: ["○"],
    explain:
      "魔法生物であるファミリアは、これらの属性のダメージや効果をいっさいうけません。",
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
      "魔法生物であるファミリアは、【センス・マジック】【マナサーチ】など、魔力を感知する魔法や効果によって感知されます。",
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
    name: "使い魔の契約",
    kind: ["○"],
    explain:
      "一人の主が同時に持てる使い魔の数は１体のみです、主は、主動作によって契約を解除することができます。契約を解除されたり、主が死亡した使い魔は自動的に消滅します。主が木勢撃つすると、使い魔はその場に留まり、いっさい行動しなくなります。",
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
    name: "正体露見＝ソーサラー技能",
    kind: ["○"],
    explain:
      "ソーサラー技能を持つものは、使い魔に対する魔物知識判定に自動的に成功します。なお、使い魔は弱点を持ちません。",
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
    name: "HPなし",
    kind: ["○"],
    explain:
      "使い魔はHPを持ちません。使い魔のHPにダメージが与えられる状況になったら、その適用ダメージは、すべて使い魔の主のHPに与えられます。",
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
    name: "MP共用",
    kind: ["○"],
    explain:
      "使い魔の主は、使い魔のMPを自身のもののように使うことができます。このとき、使い魔と主は、接触していなければなりません。使い魔のMPは、主と同様に回復します。",
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
    name: "一心同体",
    kind: ["○"],
    explain:
      "使い魔が主と接触している場合、使い魔と主は「合わせて１体」と扱います。魔法、特殊能力、罠や仕掛けなどで広範囲の効果を受ける場合に、主と使い魔で二重に効果を受けることはありません。また、主と接触している使い魔は、近接攻撃、遠隔攻撃、対象が「１体」の魔法や効果の対象になりません。使い魔が自ら子近接攻撃を行ったら、このの応力は、続く１０秒(１ラウンド）の間、失われます。",
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
    name: "抵抗共有",
    kind: ["○"],
    explain:
      "使い魔が生命抵抗力判定、精神抵抗力判定を行わなければならなくなったときは、主の数値を用います。このとき、主は、使い魔がそれを行わねばならない状態になったことを察知します。",
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
    name: "感覚共有",
    kind: ["○"],
    explain:
      "主は、使い魔と刺客、聴覚を共有します。知覚能力は、主のものと同じです。たとえば、主が「暗視」を持つならば、使い魔も「暗視」を持ちます。",
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
    name: "落下耐性",
    kind: ["○"],
    explain: "使い魔は落下ダメージを受けません。",
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
    name: "戦利品を持たない",
    kind: ["○"],
    explain: "使い魔を倒しても戦利品は得られません",
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
    name: "意思を持たない",
    kind: ["○"],
    explain: "使い魔は自らの意思を持ちません。",
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

export const familia2Unique: monster.ability[] = [
  {
    name: "毒・病気・精神効果属性無効",
    kind: ["○"],
    explain:
      "魔法生物であるファミリアは、これらの属性のダメージや効果をいっさいうけません。",
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
      "魔法生物であるファミリアは、【センス・マジック】【マナサーチ】など、魔力を感知する魔法や効果によって感知されます。",
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
    name: "使い魔の契約",
    kind: ["○"],
    explain:
      "一人の主が同時に持てる使い魔の数はそれがファミリアであるかファミリアⅡであるかにかかわらず、１体のみです。主は、主動作によって契約を解除することができます。契約を解除されたり、主が死亡した使い魔は自動的に消滅します。主が木勢撃つすると、使い魔はその場に留まり、いっさい行動しなくなります。",
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
    name: "正体露見＝ソーサラー技能",
    kind: ["○"],
    explain:
      "ソーサラー技能を持つものは、使い魔に対する魔物知識判定に自動的に成功します。なお、使い魔は弱点を持ちません。",
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
    name: "HPなし",
    kind: ["○"],
    explain:
      "使い魔はHPを持ちません。使い魔のHPにダメージが与えられる状況になったら、その適用ダメージは、すべて使い魔の主のHPに与えられます。",
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
    name: "MP共用",
    kind: ["○"],
    explain:
      "使い魔の主は、使い魔のMPを自身のもののように使うことができます。このとき、使い魔と主は、接触していなければなりません。使い魔のMPは、主と同様に回復します。",
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
    name: "一心同体",
    kind: ["○"],
    explain:
      "使い魔が主と接触している場合、使い魔と主は「合わせて１体」と扱います。魔法、特殊能力、罠や仕掛けなどで広範囲の効果を受ける場合に、主と使い魔で二重に効果を受けることはありません。また、主と接触している使い魔は、近接攻撃、遠隔攻撃、対象が「１体」の魔法や効果の対象になりません。使い魔が自ら子近接攻撃を行ったら、このの応力は、続く１０秒(１ラウンド）の間、失われます。",
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
    name: "抵抗共有",
    kind: ["○"],
    explain:
      "使い魔が生命抵抗力判定、精神抵抗力判定を行わなければならなくなったときは、主の数値を用います。このとき、主は、使い魔がそれを行わねばならない状態になったことを察知します。",
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
    name: "感覚共有",
    kind: ["○"],
    explain:
      "主は、使い魔と刺客、聴覚を共有します。知覚能力は、主のものと同じです。たとえば、主が「暗視」を持つならば、使い魔も「暗視」を持ちます。",
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
    name: "落下耐性",
    kind: ["○"],
    explain: "使い魔は落下ダメージを受けません。",
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
    name: "戦利品を持たない",
    kind: ["○"],
    explain: "使い魔を倒しても戦利品は得られません",
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
    name: "自由意志",
    kind: ["○"],
    explain:
      "ファミリアⅡはファミリア（「○意思を持たない」）とは異なり、自身の意思を持っています。そして、言語（魔法文明語）による会話が可能です、ただし、主に対しては常に高い忠誠心を持っており、それを裏切るような行動はいっさい行いません。",
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
    name: "視界の確保",
    kind: ["○"],
    explain:
      "ファミリアⅡならではの能力です。術者はファミリアⅡの視界を利用して魔法を行使することができます。しかし、魔法を行使するときの起点は常に術者です。射程距離を考えるときには、術者の位置から考えなければならず、「形状：射撃」や「形状：貫通」の魔法は、術者から発射されます。使い魔の支店から主動作で魔法を行使した場合、主とファミリアⅡ、療法の主動作が完了します。補助動作での行使では、どちらも補助動作の実行ちみなします。",
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
