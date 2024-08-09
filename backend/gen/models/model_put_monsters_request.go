package models

type PutMonstersRequest struct {

	Id string `json:"id,omitempty"`

	Data PutMonstersRequestData `json:"data,omitempty"`
}
