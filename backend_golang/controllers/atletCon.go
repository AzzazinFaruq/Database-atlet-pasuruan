package controllers

import (
	"backend_golang/models"
	"backend_golang/setup"
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

func GetAllAtlet(c *gin.Context) {
	var atlet []models.Atlet

	if err := setup.DB.Find(&atlet).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "status": false})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": atlet})
}
func GetAtletById(c *gin.Context) {
	id := c.Param("id")
	var atlet models.Atlet
	if err := setup.DB.First(&atlet, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Atlet tidak ditemukan"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": atlet})
}
func AddAtlet(c *gin.Context) {
	var atlet models.Atlet

	Foto3x4, err := c.FormFile("foto_3x4")
	if err == nil {
		ext := strings.ToLower(filepath.Ext(Foto3x4.Filename))
		if ext != ".jpg" && ext != ".jpeg" && ext != ".png" {
			c.JSON(http.StatusBadRequest, gin.H{
				"status":  false,
				"message": "Format file tidak didukung. Gunakan JPG, JPEG, atau PNG",
			})
			return
		}

		if Foto3x4.Size > 5*1024*1024 {
			c.JSON(http.StatusBadRequest, gin.H{
				"status":  false,
				"message": "Ukuran file maksimal 5MB",
			})
			return
		}

		timestamp := time.Now().Unix()
		filename := fmt.Sprintf("%d_%s", timestamp, Foto3x4.Filename)
		uploadPath := "public/uploads/foto_3x4/" + filename

		if err := os.MkdirAll("public/uploads/foto_3x4", 0755); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"status":  false,
				"message": "Gagal membuat direktori upload",
			})
			return
		}

		if err := c.SaveUploadedFile(Foto3x4, uploadPath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"status":  false,
				"message": "Gagal menyimpan foto",
			})
			return
		}
		atlet.Foto3x4 = uploadPath
	}

	FotoBebas, err := c.FormFile("foto_bebas")
	if err == nil {
		ext := strings.ToLower(filepath.Ext(FotoBebas.Filename))
		if ext != ".jpg" && ext != ".jpeg" && ext != ".png" {
			c.JSON(http.StatusBadRequest, gin.H{
				"status":  false,
				"message": "Format file tidak didukung. Gunakan JPG, JPEG, atau PNG",
			})
			return
		}

		if FotoBebas.Size > 5*1024*1024 {
			c.JSON(http.StatusBadRequest, gin.H{
				"status":  false,
				"message": "Ukuran file maksimal 5MB",
			})
			return
		}

		timestamp := time.Now().Unix()
		filename := fmt.Sprintf("%d_%s", timestamp, FotoBebas.Filename)
		uploadPath := "public/uploads/foto_bebas/" + filename

		if err := os.MkdirAll("public/uploads/foto_bebas", 0755); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"status":  false,
				"message": "Gagal membuat direktori upload",
			})
			return
		}

		if err := c.SaveUploadedFile(FotoBebas, uploadPath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"status":  false,
				"message": "Gagal menyimpan foto",
			})
			return
		}
		atlet.FotoBebas = uploadPath
	}

	NIK := c.PostForm("nik")
	if NIK == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  false,
			"message": "NIK tidak boleh kosong",
		})
		return
	}
	atlet.NIK = NIK

	Nama := c.PostForm("nama")
	if Nama == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  false,
			"message": "Nama tidak boleh kosong",
		})
		return
	}
	atlet.Nama = Nama

	TempatLahir := c.PostForm("tempat_lahir")
	if TempatLahir == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  false,
			"message": "Tempat lahir tidak boleh kosong",
		})
		return
	}
	atlet.TempatLahir = TempatLahir

	TanggalLahir := c.PostForm("tanggal_lahir")
	if TanggalLahir == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  false,
			"message": "Tanggal lahir tidak boleh kosong",
		})
		return
	}
	fmt.Printf("Received tanggal_lahir: %s\n", TanggalLahir)
	tanggalLahir, err := time.Parse("2006-01-02", TanggalLahir)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  false,
			"message": "Format tanggal lahir salah. Gunakan format: YYYY-MM-DD (contoh: 2005-11-29)",
			"error":   err.Error(),
		})
		return
	}
	atlet.TanggalLahir = tanggalLahir

	JenisKelamin := c.PostForm("jenis_kelamin")
	if JenisKelamin == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  false,
			"message": "Jenis kelamin tidak boleh kosong",
		})
		return
	}

	JenisKelaminInt, err := strconv.ParseInt(JenisKelamin, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  false,
			"message": "Jenis ID harus berupa angka",
		})
		return
	}
	atlet.JenisKelamin = int8(JenisKelaminInt)

	Alamat := c.PostForm("alamat")
	if Alamat == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  false,
			"message": "Alamat tidak boleh kosong",
		})
		return
	}
	atlet.Alamat = Alamat

	NamaOrtu := c.PostForm("nama_ortu")
	if NamaOrtu == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  false,
			"message": "Nama Orang tua tidak boleh kosong",
		})
		return
	}
	atlet.NamaOrtu = NamaOrtu

	Sekolah := c.PostForm("sekolah")
	if Sekolah == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  false,
			"message": "Sekolah tidak boleh kosong",
		})
		return
	}

	SekolahInt, err := strconv.ParseInt(Sekolah, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  false,
			"message": "ID Sekolah harus berupa angka",
		})
		return
	}
	atlet.Sekolah = int8(SekolahInt)

	NamaSekolah := c.PostForm("nama_sekolah")
	if NamaSekolah == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  false,
			"message": "Nama sekolah tidak boleh kosong",
		})
		return
	}
	atlet.NamaSekolah = NamaSekolah

	tx := setup.DB.Begin()
	if err := tx.Create(&atlet).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  false,
			"message": "Gagal menyimpan data atlet: " + err.Error(),
		})
		return
	}
	tx.Commit()

	setup.DB.First(&atlet, atlet.Id)

	c.JSON(http.StatusCreated, gin.H{
		"status":  true,
		"message": "Data atlet berhasil ditambahkan",
		"data":    atlet,
	})
}

func UpdateAtlet(c *gin.Context) {
	id := c.Param("id")
	var atlet models.Atlet
	if err := setup.DB.First(&atlet, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Atlet tidak ditemukan"})
		return
	}

	// Update data dari form
	NIK := c.PostForm("nik")
	if NIK != "" {
		atlet.NIK = NIK
	}
	Nama := c.PostForm("nama")
	if Nama != "" {
		atlet.Nama = Nama
	}
	TempatLahir := c.PostForm("tempat_lahir")
	if TempatLahir != "" {
		atlet.TempatLahir = TempatLahir
	}
	TanggalLahir := c.PostForm("tanggal_lahir")
	if TanggalLahir != "" {
		tanggalLahir, err := time.Parse("2006-01-02", TanggalLahir)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Format tanggal lahir salah. Gunakan format: YYYY-MM-DD"})
			return
		}
		atlet.TanggalLahir = tanggalLahir
	}
	JenisKelamin := c.PostForm("jenis_kelamin")
	if JenisKelamin != "" {
		JenisKelaminInt, err := strconv.ParseInt(JenisKelamin, 10, 64)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Jenis kelamin harus berupa angka"})
			return
		}
		atlet.JenisKelamin = int8(JenisKelaminInt)
	}
	Alamat := c.PostForm("alamat")
	if Alamat != "" {
		atlet.Alamat = Alamat
	}
	NamaOrtu := c.PostForm("nama_ortu")
	if NamaOrtu != "" {
		atlet.NamaOrtu = NamaOrtu
	}
	Sekolah := c.PostForm("sekolah")
	if Sekolah != "" {
		SekolahInt, err := strconv.ParseInt(Sekolah, 10, 64)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "ID Sekolah harus berupa angka"})
			return
		}
		atlet.Sekolah = int8(SekolahInt)
	}
	NamaSekolah := c.PostForm("nama_sekolah")
	if NamaSekolah != "" {
		atlet.NamaSekolah = NamaSekolah
	}

	// Update foto jika ada file baru
	Foto3x4, err := c.FormFile("foto_3x4")
	if err == nil {
		ext := strings.ToLower(filepath.Ext(Foto3x4.Filename))
		if ext != ".jpg" && ext != ".jpeg" && ext != ".png" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Format file foto_3x4 tidak didukung. Gunakan JPG, JPEG, atau PNG"})
			return
		}
		if Foto3x4.Size > 5*1024*1024 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Ukuran file foto_3x4 maksimal 5MB"})
			return
		}
		timestamp := time.Now().Unix()
		filename := fmt.Sprintf("%d_%s", timestamp, Foto3x4.Filename)
		uploadPath := "public/uploads/foto_3x4/" + filename
		if err := os.MkdirAll("public/uploads/foto_3x4", 0755); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membuat direktori upload"})
			return
		}
		if err := c.SaveUploadedFile(Foto3x4, uploadPath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menyimpan foto_3x4"})
			return
		}
		atlet.Foto3x4 = uploadPath
	}
	FotoBebas, err := c.FormFile("foto_bebas")
	if err == nil {
		ext := strings.ToLower(filepath.Ext(FotoBebas.Filename))
		if ext != ".jpg" && ext != ".jpeg" && ext != ".png" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Format file foto_bebas tidak didukung. Gunakan JPG, JPEG, atau PNG"})
			return
		}
		if FotoBebas.Size > 5*1024*1024 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Ukuran file foto_bebas maksimal 5MB"})
			return
		}
		timestamp := time.Now().Unix()
		filename := fmt.Sprintf("%d_%s", timestamp, FotoBebas.Filename)
		uploadPath := "public/uploads/foto_bebas/" + filename
		if err := os.MkdirAll("public/uploads/foto_bebas", 0755); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membuat direktori upload"})
			return
		}
		if err := c.SaveUploadedFile(FotoBebas, uploadPath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menyimpan foto_bebas"})
			return
		}
		atlet.FotoBebas = uploadPath
	}

	if err := setup.DB.Save(&atlet).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal update data atlet"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Data atlet berhasil diupdate", "data": atlet})
}

func DeleteAtlet(c *gin.Context) {
	id := c.Param("id")
	if err := setup.DB.Delete(&models.Atlet{}, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menghapus atlet"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Atlet berhasil dihapus"})
}
