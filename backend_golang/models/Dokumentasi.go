package models

import (
	"time"
)

type Dokumentasi struct {
	Id          uint      `gorm:"primary_key"`
	Dokumentasi string    `json:"dokumentasi"`
	AtletId     int64     `json:"atlet_id"`
	Atlet       Atlet     `gorm:"foreignKey:AtletId;references:Id;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	CreatedAt   time.Time `gorm:"type:timestamp;default:current_timestamp" json:"created_at"`
	UpdatedAt   time.Time `gorm:"type:timestamp;default:current_timestamp on update current_timestamp" json:"updated_at"`
}
