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
import org.springframework.graphql.data.method.annotation.SubscriptionMapping
import org.springframework.stereotype.Controller
import reactor.core.publisher.Flux
import reactor.core.publisher.Sinks
import java.util.Date

@Controller
class TaskController {

    companion object {
        private val log: Logger = LoggerFactory.getLogger(TaskController::class.java)
    }

    @Autowired
    private lateinit var taskMapper: TaskMapper

    private val sink = Sinks.many().multicast().directBestEffort<List<Task>>()

    @QueryMapping
    fun tasks() = taskMapper.list()

    @MutationMapping
    fun create() = taskMapper.create().also {
        log.info("create task {}", it)
        publish()
    }

    @MutationMapping
    fun remove(@Argument id: Long) = taskMapper.remove(id).also {
        log.info("delete task {}", it)
        publish()
    }

    @MutationMapping
    fun setTitle(@Arguments task: Task) = taskMapper.setTitle(task).also {
        log.info("update task({}) to {}", task, it)
        publish()
    }

    @MutationMapping
    fun setEditing(@Arguments task: Task) = taskMapper.setEditing(task).also {
        log.info("edit task({}) to {}", task, it)
        publish()
    }

    @MutationMapping
    fun setCompleted(
        @Argument id: Long,
        @Argument completed: Boolean
    ) = taskMapper.setCompleted(Task(id = id, completedAt = if (completed) Date() else null)).also {
        log.info("toggle task({}) to {}", id, it)
        publish()
    }

    @SubscriptionMapping
    fun watch(): Flux<List<Task>> = sink.asFlux()

    private fun publish() {
        sink.tryEmitNext(taskMapper.list())
    }
}
