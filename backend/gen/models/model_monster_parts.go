package models

type MonsterParts struct {

	Core bool `json:"core,omitempty"`

	Name string `json:"name,omitempty"`

	Hit string `json:"hit,omitempty"`

	Damage string `json:"damage,omitempty"`

	Avoid string `json:"avoid,omitempty"`

	Protect string `json:"protect,omitempty"`

	Hp string `json:"hp,omitempty"`

	Mp string `json:"mp,omitempty"`
}
