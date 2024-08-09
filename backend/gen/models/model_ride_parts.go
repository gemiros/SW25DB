package models

type RideParts struct {

	Lv string `json:"lv,omitempty"`

	Parts []RidePart `json:"parts,omitempty"`
}
