import { race } from "../uniqueAbility/human";
type Props = {
  monster: monster.monster;
  levelId: number;
  hRace: race;
};

type createBool = {
  decision: number;
  secret: boolean;
  invisible: boolean;
  hide: boolean;
};

let foundationText: monster.foundation = {
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
const createLabel = (l: string, v: string, m?: any): monster.label => {
  let res: monster.label = {
    label: l,
    value: v,
  };
  if (m) {
    res.max = m;
  }
  return res;
};
function paramCreate(props: Props) {
  const { Status } = props.monster;
  foundationText.data.name = props.monster.Top.name;
  foundationText.data.params = [];
  if (Status.preem) {
    foundationText.data.params.push(
      createLabel("先制値", Status.preem.toString())
    );
  }
  if (Status.pop && Status.weakValue) {
    foundationText.data.params.push(
      createLabel(
        "知名度",
        `${Status.pop.toString()}/${Status.weakValue.toString()}`
      )
    );
  }
  if (Status.life && Status.mind) {
    foundationText.data.params.push(
      ...[
        createLabel(
          "生命抵抗",
          (Status.life + props.hRace.fixPart.lifeRes!).toString()
        ),
        createLabel(
          "精神抵抗",
          (Status.mind + props.hRace.fixPart.mindRes!).toString()
        ),
      ]
    );
  }
  if (Status.speed) {
    foundationText.data.params.push(
      createLabel("移動速度", Status.speed.toString())
    );
  }
}
function partData(props: Props) {
  const parts = props.monster.Parts[props.levelId].parts;
  updateFoundationTextStatus(parts, props.hRace);
}
function updateFoundationTextStatus(
  parts: Array<monster.part> | Array<monster.part>,
  hRace: race
) {
  foundationText.data.status = [];

  parts.forEach((part, id) => {
    let partName = part.name;
    if (parts.length == 1) {
      partName = "";
    }
    if (id === 0) {
      foundationText.data.params.push(
        ...[
          createLabel(
            partName + "命中力",
            (part.hit + hRace.fixPart.hit).toString()
          ),
          createLabel(
            partName + "打撃点",
            (part.damage + hRace.fixPart.damage).toString()
          ),
          createLabel(
            partName + "回避力",
            (part.avoid + hRace.fixPart.avoid).toString()
          ),
          createLabel(
            partName + "防護点",
            (part.protect + hRace.fixPart.protect).toString()
          ),
        ]
      );
      foundationText.data.status.push(
        ...[
          createLabel(
            partName + "HP",
            (part.hp + hRace.fixPart.hp).toString(),
            (+hRace.fixPart.hp).toString()
          ),
          createLabel(
            partName + "MP",
            (Number(part.mp) + hRace.fixPart.mp).toString(),
            (Number(part.mp) + hRace.fixPart.mp).toString()
          ),
        ]
      );
    } else {
      foundationText.data.params.push(
        ...[
          createLabel(partName + "命中力", part.hit.toString()),
          createLabel(partName + "打撃点", part.damage.toString()),
          createLabel(partName + "回避力", part.avoid.toString()),
          createLabel(partName + "防護点", part.protect.toString()),
        ]
      );
      foundationText.data.status.push(
        ...[
          createLabel(partName + "HP", part.hp.toString(), part.hp.toString()),
          createLabel(partName + "MP", part.mp.toString(), part.mp.toString()),
        ]
      );
    }
  });
  if ("lifeRes" in parts[0]) {
    foundationText.data.params.push(
      ...[
        createLabel("生命抵抗", String(parts[0].lifeRes)),
        createLabel("精神抵抗", String(parts[0].mindRes)),
      ]
    );
  }
}

function commandCreate(props: Props, decision: number) {
  const abilitys = props.monster.Abilitys.abilitys;
  const parts = props.monster.Parts[props.levelId].parts;

  const partLength = parts?.length;
  let text = "＝＝＝＝＝ステータス＝＝＝＝＝\n";
  let partStatusText = "";
  let partButtleText = "";
  let partButtleCommandText = "";
  let partButtleCommandFixedText = "";
  parts?.forEach((part) => {
    let partName = part.name;
    if (partLength == 1) {
      partName = "";
    }
    partStatusText += `{${partName}HP} 【${partName}HP】\n{${partName}MP} 【${partName}MP】\n`;
    partButtleText += `{${partName}命中力} 【${partName}命中力】\n{${partName}打撃点} 【${partName}打撃点】\n{${partName}回避力} 【${partName}回避力】\n{${partName}防護点} 【${partName}防護点】\n`;
    partButtleCommandText +=
      `＝＝＝＝＝${partName}判定＝＝＝＝＝\n` +
      `2d6+{${partName}命中力} 命中力\n2d6+{${partName}打撃点} ${partName}攻撃\n2d6+{${partName}回避力} 回避力\n`;
    partButtleCommandFixedText +=
      `＝＝＝＝＝${partName}判定（固定値）＝＝＝＝＝ \n` +
      `c(7+{${partName}命中力}) 命中力\n2d+{${partName}打撃点} ${partName}攻撃\nc(7+{${partName}回避力}) 回避力\n`;
  });

  text += partStatusText;
  text += `＝＝＝＝＝パラメータ＝＝＝＝＝\n{先制値} 【先制値】\n{知名度}【知名度/弱点】\n{移動速度} 【移動1/移動2】\n{生命抵抗} 【生命抵抗力】\n{精神抵抗} 【精神抵抗力】\n`;
  text += partButtleText;
  if (decision == 2 || decision == 3) {
    text += `＝＝＝＝＝抵抗判定＝＝＝＝＝ \n2d6+{生命抵抗} 生命抵抗力 \n2d6+{精神抵抗} 精神抵抗力 \n`;
  }
  if (decision == 1 || decision == 3) {
    text += `＝＝＝＝＝抵抗判定（固定値）＝＝＝＝＝ \nc(7+{生命抵抗}) 生命抵抗力 \nc(7+{精神抵抗}) 精神抵抗力 \n`;
  }
  if (decision == 2 || decision == 3) {
    text += `＝＝＝＝＝部位判定＝＝＝＝＝ \n` + partButtleCommandText;
  }
  if (decision == 1 || decision == 3) {
    text +=
      `＝＝＝＝＝部位判定（固定値）＝＝＝＝＝ \n` + partButtleCommandFixedText;
  }
  text += `\n＝＝＝＝＝特殊能力＝＝＝＝＝ \n`;
  if (props.monster.Top.race === "人族") {
    let unique: monster.ability[];
    if (props.monster.Top.lv < 6) {
      unique = props.hRace.raceUnique1!;
    } else if (props.monster.Top.lv < 11) {
      unique = props.hRace.raceUnique6!;
    } else {
      unique = props.hRace.raceUnique11!;
    }
    unique.forEach((ability) => {
      if (ability.item != undefined && ability.item != "" && !ability.using) {
        return;
      }
      let abilityText = "";
      abilityText += ability.kind.join("");
      abilityText += ability.name;
      abilityText += ability.use ? ability.use : "";
      abilityText += "|";
      abilityText += ability.explain ? ability.explain : "";
      abilityText += "\n";
      text += abilityText;
    });
  }
  abilitys.forEach((ability) => {
    if (ability.item != undefined && ability.item != "" && !ability.using) {
      return;
    }
    let abilityText = "";
    abilityText += ability.kind.join("");
    abilityText += ability.name;
    abilityText += ability.use ? ability.use : "";
    abilityText += "|";
    abilityText += ability.explain ? ability.explain : "";
    abilityText += "\n";
    text += abilityText;
  });
  props.monster.Top.race === "人族"
    ? (foundationText.data.memo = props.hRace.race)
    : "";
  foundationText.data.commands = text;
}

export const create = async (props: Props, bool: createBool) => {
  foundationText = {
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
  paramCreate(props);
  partData(props);
  commandCreate(props, bool.decision + 1);
  foundationText.data.secret = bool.secret;
  foundationText.data.invisible = bool.invisible;
  foundationText.data.hideStatus = bool.hide;
  console.log(JSON.stringify(foundationText));
  await navigator.clipboard.writeText(JSON.stringify(foundationText));
};
