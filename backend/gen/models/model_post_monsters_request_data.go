package models

type PostMonstersRequestData struct {

	Top MonsterTop `json:"Top,omitempty"`

	Status FamiliaStatus `json:"Status,omitempty"`

	Parts []MonsterParts `json:"Parts,omitempty"`

	Abilitys GolemAbilitys `json:"Abilitys,omitempty"`

	Bootys []MonsterBooty `json:"Bootys,omitempty"`

	Explanation string `json:"Explanation,omitempty"`

	Tags []string `json:"Tags,omitempty"`
}
