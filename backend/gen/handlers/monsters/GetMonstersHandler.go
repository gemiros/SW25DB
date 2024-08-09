package monsters

import (
	"github.com/GIT_USER_ID/GIT_REPO_ID/firestore"
)

type ResData struct {
	Data interface{}
}

func GetMonstersHandler() ResData {
	// a := models.CommonMonster{
	// 	Top: models.MonsterTop{
	// 		Race: "蛮族",
	// 		Lv:   "1",
	// 		Name: "aaa",
	// 	},
	// 	Status: models.MonsterStatus{
	// 		Int:       "1",
	// 		Perc:      "1",
	// 		Reac:      "1",
	// 		Imp:       "1",
	// 		Lang:      []string{"1"},
	// 		Habi:      []string{},
	// 		Pop:       "1",
	// 		WeakValue: "1",
	// 		Weak:      "1",
	// 		Preem:     "1",
	// 		Speed:     "1",
	// 		Life:      "1",
	// 		Mind:      "1",
	// 	},
	// 	Parts:       []models.MonsterParts{},
	// 	Abilitys:    []models.MonsterAbility{},
	// 	Bootys:      []models.MonsterBooty{},
	// 	Explanation: "",
	// 	Tags:        []string{},
	// }
	a := firestore.GetDatas()
	res := a
	return ResData{
		Data: res,
	}
}
