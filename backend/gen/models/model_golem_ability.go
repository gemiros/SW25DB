package models

type GolemAbility struct {

	Using bool `json:"using,omitempty"`

	Item string `json:"item,omitempty"`

	Kind []string `json:"kind,omitempty"`

	Name string `json:"name,omitempty"`

	Explain string `json:"explain,omitempty"`
}
