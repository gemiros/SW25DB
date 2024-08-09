package handlers

import (
	"net/http"

	"github.com/GIT_USER_ID/GIT_REPO_ID/handlers/monsters"
	"github.com/GIT_USER_ID/GIT_REPO_ID/models"
	"github.com/labstack/echo/v4"
)

// DeleteMonsters -
func (c *Container) DeleteMonsters(ctx echo.Context) error {
	return ctx.JSON(http.StatusOK, models.HelloWorld{
		Message: "Hello World",
	})
}

// GetMonsters - Your GET endpoint
func (c *Container) GetMonsters(ctx echo.Context) error {
	res := monsters.GetMonstersHandler()
	return ctx.JSON(http.StatusOK, res)
}

// PostMonsters -
func (c *Container) PostMonsters(ctx echo.Context) error {
	return ctx.JSON(http.StatusOK, models.HelloWorld{
		Message: "Hello World",
	})
}

// PutMonsters -
func (c *Container) PutMonsters(ctx echo.Context) error {
	return ctx.JSON(http.StatusOK, models.HelloWorld{
		Message: "Hello World",
	})
}
