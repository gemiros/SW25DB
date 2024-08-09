package firestore

import (
	"context"
	"log"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

const projectId = "sw25datas"

func createClient(ctx context.Context) *firestore.Client {
	option := option.WithCredentialsFile("")
	client, err := firestore.NewClient(ctx, projectId, option)
	if err != nil {
		log.Fatalf("Failed to create client %v", err)
	}
	return client
}

func GetDatas() []any {
	ctx := context.Background()
	client := createClient(ctx)
	defer client.Close()
	iter := client.Collection("monsterDB").Documents(ctx)
	resDatas := []any{}
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			log.Fatalf("Failed to iterate: %v", err)
		}
		// fmt.Println(doc.Data())
		resDatas = append(resDatas, doc.Data())
	}
	// datas, err := iter.GetAll()
	// if err != nil {
	// 	log.Fatalf("Failed to get all %v", err)
	// }
	return resDatas
	// docsnaps, err := client.GetAll(ctx, []*firestore.DocumentRef{})
	// if err != nil {
	// 	log.Fatalf("Failed to get all %v", err)
	// }
	// for i, ds := range docsnaps {
	// 	fmt.Printf("%d :%v\n", i, ds)
	// }
	// return docsnaps
}
