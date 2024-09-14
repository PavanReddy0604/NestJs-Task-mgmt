import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDTO } from './dto/create-task';
@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService) { }

    @Get('/')
    getTasks(): Task[] {
        const tasks = this.
            taskService.findAllTasks()
        console.log(tasks)

        return tasks
    }

    @Get(':id')
    getTaskById(@Param('id') taskId: number): Task{
        return this.taskService.FindById(taskId);
    }


    @Post('/')
    // @HttpCode(404)
    createTask(@Body() task: CreateTaskDTO): Task {
        return this.taskService.createTask(task)
    }
}
