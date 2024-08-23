const fairyUnique: monster.ability[] = [
  {
    name: "ルーンフォークに対して透明",
    kind: ["○"],
    explain: "ルーンフォークはあらゆる妖精を見ることができません。",
  },
  {
    name: "戦利品を持たない",
    kind: [""],
    explain: "戦利品を持ちません",
  },
];

export const commonFairyUnique: monster.ability[] =
  structuredClone(fairyUnique);
commonFairyUnique.push({
  name: "正体露見＝フェアリーテイマー技能",
  kind: ["○"],
  explain:
    "フェアリーテイマー技能習得者はサイコロを振らず魔物知識判定に自動的に成功します（弱点を知るにはセージ技能の習得と本来の達成値が必要です）。",
});

export const ancientFairyUnique: monster.ability[] =
  structuredClone(fairyUnique);
ancientFairyUnique.push({
  name: "フェアリーテイマーが自動判別できない",
  kind: ["○"],
  explain:
    "フェアリーテイマー技能習得者であっても古代妖精種の能力や詳細を知るには魔物知識判定が必要です。",
});
