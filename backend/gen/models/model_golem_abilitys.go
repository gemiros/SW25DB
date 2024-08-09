package models

type GolemAbilitys struct {

	Max string `json:"max,omitempty"`

	Abilitys []GolemAbility `json:"abilitys,omitempty"`
}
