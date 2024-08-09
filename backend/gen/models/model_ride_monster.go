package models

type RideMonster struct {

	Top MonsterTop `json:"Top,omitempty"`

	Status RideStatus `json:"Status,omitempty"`

	Parts []RideParts `json:"Parts,omitempty"`

	Abilitys []MonsterAbility `json:"Abilitys,omitempty"`

	Explanation string `json:"Explanation,omitempty"`

	Tags []string `json:"Tags,omitempty"`
}
