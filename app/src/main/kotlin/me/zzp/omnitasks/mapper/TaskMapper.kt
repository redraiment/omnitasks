package me.zzp.omnitasks.mapper

import me.zzp.omnitasks.entity.Task
import org.apache.ibatis.annotations.Mapper
import org.apache.ibatis.annotations.Result
import org.apache.ibatis.annotations.ResultMap
import org.apache.ibatis.annotations.Results
import org.apache.ibatis.annotations.Select

@Mapper
interface TaskMapper {
    @Select("select * from tasks order by completed_at asc nulls first, id asc")
    @Results(id = "taskResultMap", value = [Result(property = "editing", column = "is_editing")])
    fun list(): List<Task>

    @Select("insert into tasks (title) values ('') returning *")
    @ResultMap("taskResultMap")
    fun create(): Task?

    @Select("delete from tasks where id = #{id} returning *")
    @ResultMap("taskResultMap")
    fun remove(id: Long): Task?

    @Select("""
        update
          tasks
        set
          title = #{title},
          is_editing = false,
          updated_at = current_timestamp
        where
          id = #{id}
          and is_editing
        returning *
    """)
    @ResultMap("taskResultMap")
    fun setTitle(task: Task): Task?

    @Select("""
        update
          tasks
        set
          is_editing = #{editing},
          updated_at = current_timestamp
        where
          id = #{id}
        returning *
    """)
    @ResultMap("taskResultMap")
    fun setEditing(task: Task): Task?

    @Select("""
        update
          tasks
        set
          completed_at = #{completedAt},
          updated_at = current_timestamp
        where
          id = #{id}
        returning *
    """)
    @ResultMap("taskResultMap")
    fun setCompleted(task: Task): Task?
}
