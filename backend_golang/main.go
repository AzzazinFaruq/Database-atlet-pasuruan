package main

import (
	"backend_golang/controllers"
	"backend_golang/middleware"
	"backend_golang/setup"
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
)

func main() {
	env := os.Getenv("ENV")
	if env == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	router := gin.New()
	
	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	router.Use(middleware.CORSMiddleware())
	
	setup.ConnectDatabase()

	router.GET("/health", controllers.HealthCheck)

	authGroup := router.Group("/")
	authGroup.Use(middleware.LoginRateLimit())
	{
		authGroup.POST("/register", controllers.Register)
		authGroup.POST("/login", controllers.Login)
	}

	protected := router.Group("/api")
	// protected.Use(middleware.AuthMiddleware())

	// auth middleware
	protected.POST("/logout", controllers.Logout)
	protected.GET("/user", controllers.GetCurrentUser)

		protected.POST("/atlet/add", controllers.AddAtlet)
		protected.GET("/atlet", controllers.GetAllAtlet)
		protected.GET("/atlet/:id", controllers.GetAtletById)
		protected.PUT("/atlet/update/:id", controllers.UpdateAtlet)
		protected.DELETE("/atlet/delete/:id", controllers.DeleteAtlet)

		protected.POST("/cabor/add", controllers.AddCabor)
		protected.GET("/cabor", controllers.GetAllCabor)
		protected.GET("/cabor/:id", controllers.GetCaborById)
		protected.PUT("/cabor/update/:id", controllers.UpdateCabor)
		protected.DELETE("/cabor/delete/:id", controllers.DeleteCabor)

		protected.POST("/nomor/add", controllers.AddNomor)
		protected.GET("/nomor", controllers.GetAllNomor)
		protected.GET("/nomor/:id", controllers.GetNomorById)
		protected.PUT("/nomor/update/:id", controllers.UpdateNomor)
		protected.DELETE("/nomor/delete/:id", controllers.DeleteNomor)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	
	srv := &http.Server{
		Addr:    ":" + port,
		Handler: router,
	}

	go func() {
		log.Printf("Server starting on port %s", port)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Failed to start server: %v", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	
	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}

	log.Println("Server exited")
}
