package main

import (
	"github.com/GIT_USER_ID/GIT_REPO_ID/handlers"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()

	//todo: handle the error!
	c, _ := handlers.NewContainer()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())


	// DeleteMonsters - 
	e.DELETE("/monsters", c.DeleteMonsters)

	// GetMonsters - Your GET endpoint
	e.GET("/monsters", c.GetMonsters)

	// PostMonsters - 
	e.POST("/monsters", c.PostMonsters)

	// PutMonsters - 
	e.PUT("/monsters", c.PutMonsters)


	// Start server
	e.Logger.Fatal(e.Start(":8080"))
}
