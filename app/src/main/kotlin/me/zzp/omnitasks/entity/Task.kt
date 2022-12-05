package me.zzp.omnitasks.entity

import java.util.Date

data class Task(
    val id: Long? = null,
    val title: String? = null,
    val editing: Boolean? = null,
    val createdAt: Date? = null,
    val updatedAt: Date? = null,
    val completedAt: Date? = null,
) {
    val completed: Boolean by lazy { completedAt != null }
}
