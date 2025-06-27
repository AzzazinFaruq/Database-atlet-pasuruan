package controllers

import (
	"backend_golang/models"
	"backend_golang/setup"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetAllCabor(c *gin.Context) {
	var cabor []models.Cabor

	if err := setup.DB.Find(&cabor).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "status": false})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": cabor})
}

func GetCaborById(c *gin.Context) {
	id := c.Param("id")
	var cabor models.Cabor
	if err := setup.DB.First(&cabor, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Cabor tidak ditemukan"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": cabor})
}

func AddCabor(c *gin.Context) {
	var input struct {
		NamaCabor string `json:"nama_cabor" binding:"required"`
		HasilId   int64  `json:"hasil_id"`
	}

	// Validate the request body
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create a new user instance
	cabor := models.Cabor{
		NamaCabor: input.NamaCabor,
		HasilId:   input.HasilId,
	}

	// Save the user in the database
	if err := setup.DB.Create(&cabor).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create Cabor"})
		return
	}

	// Return success message
	c.JSON(http.StatusOK, gin.H{"message": "User created successfully"})
}

func UpdateCabor(c *gin.Context) {
	id := c.Param("id")
	var cabor models.Cabor
	if err := setup.DB.First(&cabor, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Cabor tidak ditemukan"})
		return
	}

	var input struct {
		NamaCabor string `json:"nama_cabor"`
		HasilId   int64  `json:"hasil_id"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if input.NamaCabor != "" {
		cabor.NamaCabor = input.NamaCabor
	}
	if input.HasilId != 0 {
		cabor.HasilId = input.HasilId
	}

	if err := setup.DB.Save(&cabor).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal update cabor"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Cabor berhasil diupdate", "data": cabor})
}

func DeleteCabor(c *gin.Context) {
	id := c.Param("id")
	if err := setup.DB.Delete(&models.Cabor{}, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menghapus cabor"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Cabor berhasil dihapus"})
}
