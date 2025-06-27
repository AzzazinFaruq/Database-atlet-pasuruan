package models
import (
	"time"
)
type Atlet struct {
	Id           uint      `gorm:"primary_key"`
	Foto3x4      string    `json:"foto_3x4"`
	FotoBebas    string    `json:"foto_bebas"`
	NIK          string    `json:"nik"`
	Nama         string    `json:"nama"`
	TempatLahir  string    `json:"tempat_lahir"`
	TanggalLahir time.Time `json:"tanggal_lahir" gorm:"type:date"`
	JenisKelamin int8      `json:"jenis_kelamin"`
	Alamat       string    `json:"alamat"`
	NamaOrtu     string    `json:"nama_ortu"`
	Sekolah      int8      `json:"sekolah"`
	NamaSekolah  string    `json:"nama_sekolah"`
	CaborID      *uint     `json:"cabor_id"`
	Cabor        *Cabor    `gorm:"foreignKey:CaborID;references:Id;constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`
	CreatedAt    time.Time `gorm:"type:timestamp;default:current_timestamp"`
	UpdatedAt    time.Time `gorm:"type:timestamp;default:current_timestamp on update current_timestamp"`
}
