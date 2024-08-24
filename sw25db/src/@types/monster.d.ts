declare namespace monster {
  interface foundation {
    kind: string;
    data: {
      name: string;
      memo?: string;
      status: Array<label>;
      params: Array<label>;
      active: boolean;
      secret: boolean;
      invisible: boolean;
      hideStatus: boolean;
      commands: string;
    };
  }
  interface label {
    label: string;
    value: string;
    max?: string;
  }

  interface monster {
    id: string;
    Top: top;
    Status: status;
    Parts: Array<level>;
    Abilitys: abilitys;
    Bootys?: Array<booty>;
    Explanation: string;
    Tags: Array<string>;
  }
  interface top {
    race: string;
    subRace?: string;
    lv: number;
    name: string;
    page: string;
  }

  interface status {
    habi: Array<string>;
    imp: number;
    int: string;
    lang: Array<string>;
    life: number;
    mind: number;
    perc: string;
    pop: number;
    preem?: number;
    reac: string;
    speed: string;
    weak: string;
    weakValue?: number;
    value?: string;
  }

  interface fixedStatus {
    habi?: Array<string>;
    imp?: number;
    int?: string;
    lang?: Array<string>;
    life?: number;
    mind?: number;
    perc?: string;
    pop?: number;
    preem?: number;
    reac?: string;
    speed?: string;
    weak?: string;
    weakValue?: number;
    value?: string;
  }

  interface part {
    core: boolean;
    name: string;
    hit: number;
    damage: number;
    avoid: number;
    protect: number;
    hp: number;
    mp: string;
    lifeRes?: number;
    mindRes?: number;
  }

  interface level {
    lv?: number;
    parts: Array<part>;
  }

  interface ability {
    kind: Array<string>;
    name: string;
    use?: string;
    explain?: string;
    part?: string[];
    using?: boolean;
    item?: string;
  }

  interface abilitys {
    max?: number;
    abilitys: Array<ability>;
  }

  interface booty {
    dice: string;
    item: string;
    gamel: number;
    cardKind?: string[];
    cardRank?: string;
  }
}
