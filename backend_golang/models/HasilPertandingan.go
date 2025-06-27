package models

import (
	"time"
)

type HasilPertandingan struct {
	Id        uint      `gorm:"primary_key" json:"id"`
	Medal     string    `json:"medal"`
	CreatedAt time.Time `gorm:"type:timestamp;default:current_timestamp"`
	UpdatedAt time.Time `gorm:"type:timestamp;default:current_timestamp on update current_timestamp"`
}
