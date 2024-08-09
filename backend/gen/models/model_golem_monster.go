package models

type GolemMonster struct {

	Top MonsterTop `json:"Top,omitempty"`

	Status MonsterStatus `json:"Status,omitempty"`

	Parts []MonsterParts `json:"Parts,omitempty"`

	Abilitys GolemAbilitys `json:"Abilitys,omitempty"`

	Bootys []MonsterBooty `json:"Bootys,omitempty"`

	Explanation string `json:"Explanation,omitempty"`

	Tags []string `json:"Tags,omitempty"`
}
