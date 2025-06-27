package main

import (
	"backend_golang/controllers"
	"backend_golang/middleware"
	"backend_golang/setup"

	"github.com/gin-gonic/gin"
)

func main() {
	//Declare New Gin Route System
	router := gin.New()
	router.Use(middleware.CORSMiddleware())
	//Run Database Setup
	setup.ConnectDatabase()

	// Auth
	router.POST("/register", controllers.Register)
	router.POST("/login", controllers.Login)

	protected := router.Group("/api")
	// protected.Use(middleware.AuthMiddleware())

	// auth middleware
	protected.POST("/logout", controllers.Logout)
	protected.GET("/user", controllers.GetCurrentUser)

	// CRUD Atlet
	protected.POST("/atlet/add", controllers.AddAtlet)
	protected.GET("/atlet", controllers.GetAllAtlet)
	protected.GET("/atlet/:id", controllers.GetAtletById)
	protected.PUT("/atlet/update/:id", controllers.UpdateAtlet)
	protected.DELETE("/atlet/delete/:id", controllers.DeleteAtlet)

	// CRUD Cabor
	protected.POST("/cabor/add", controllers.AddCabor)
	protected.GET("/cabor", controllers.GetAllCabor)
	protected.GET("/cabor/:id", controllers.GetCaborById)
	protected.PUT("/cabor/update/:id", controllers.UpdateCabor)
	protected.DELETE("/cabor/delete/:id", controllers.DeleteCabor)

	// CRUD Nomor
	protected.POST("/nomor/add", controllers.AddNomor)
	protected.GET("/nomor", controllers.GetAllNomor)
	protected.GET("/nomor/:id", controllers.GetNomorById)
	protected.PUT("/nomor/update/:id", controllers.UpdateNomor)
	protected.DELETE("/nomor/delete/:id", controllers.DeleteNomor)

	router.Run(":8080") // Menjalankan server di port 8080
}
