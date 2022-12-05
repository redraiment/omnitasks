package me.zzp.omnitasks.controller

import me.zzp.omnitasks.entity.Task
import me.zzp.omnitasks.mapper.TaskMapper
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.Arguments
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.stereotype.Controller
import java.util.Date

@Controller
class TaskController {

    companion object {
        private val log: Logger = LoggerFactory.getLogger(TaskController::class.java)
    }

    @Autowired
    private lateinit var taskMapper: TaskMapper

    @QueryMapping
    fun tasks(): List<Task> = taskMapper.list()

    @MutationMapping
    fun create(): List<Task> = taskMapper.create().let {
        log.info("create task {}", it)
        taskMapper.list()
    }

    @MutationMapping
    fun remove(@Argument id: Long): List<Task> = taskMapper.remove(id).let {
        log.info("delete task {}", it)
        taskMapper.list()
    }

    @MutationMapping
    fun setTitle(@Arguments task: Task) = taskMapper.setTitle(task).let {
        log.info("update task({}) to {}", task, it)
        taskMapper.list()
    }

    @MutationMapping
    fun setEditing(@Arguments task: Task): List<Task> = taskMapper.setEditing(task).let {
        log.info("edit task({}) to {}", task, it)
        taskMapper.list()
    }

    @MutationMapping
    fun setCompleted(@Argument id: Long, @Argument completed: Boolean): List<Task> {
        val it = taskMapper.setCompleted(Task(id = id, completedAt = if (completed) Date() else null))
        log.info("toggle task({}) to {}", id, it)
        return taskMapper.list()
    }
}
