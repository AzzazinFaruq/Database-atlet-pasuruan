package models

import (
	"time"
)

type Cabor struct {
	Id        uint               `gorm:"primary_key"`
	NamaCabor string             `json:"nama_cabor"`
	HasilId   *uint              `json:"hasil_id"`
	Hasil     *HasilPertandingan `gorm:"foreignKey:HasilId;references:Id;constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`
	CreatedAt time.Time          `gorm:"type:timestamp;default:current_timestamp"`
	UpdatedAt time.Time          `gorm:"type:timestamp;default:current_timestamp on update current_timestamp"`
}

type Nomor struct {
	Id        uint      `gorm:"primary_key"`
	NamaNomor string    `json:"nama_nomor"`
	CaborID   *uint     `json:"cabor_id"`
	Cabor     *Cabor    `gorm:"foreignKey:CaborID;references:Id;constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`
	CreatedAt time.Time `gorm:"type:timestamp;default:current_timestamp"`
	UpdatedAt time.Time `gorm:"type:timestamp;default:current_timestamp on update current_timestamp"`
}
