package models

type FamiliaMonster struct {

	Top MonsterTop `json:"Top,omitempty"`

	Status FamiliaStatus `json:"Status,omitempty"`

	Parts []MonsterParts `json:"Parts,omitempty"`

	Abilitys GolemAbilitys `json:"Abilitys,omitempty"`

	Explanation string `json:"Explanation,omitempty"`

	Tags []string `json:"Tags,omitempty"`
}
