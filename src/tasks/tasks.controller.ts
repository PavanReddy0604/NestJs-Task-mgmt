import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task';
import { UpdateTask } from './dto/update-task';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService) { }
    @Get()
    getTasks(): Promise<Task[]> {
        return this.taskService.getAllTasks();
    }

    @Get(':id')
    getTaskById(@Param('id') taskId: number): Promise<Task> {
        return this.taskService.getTaskById(taskId);
    }

    @Post('/')
    createTask(@Body() task: CreateTaskDTO): Promise<Task> {
        return this.taskService.saveTask(task)
    }

    @Put(':id')
    updateTask(@Param('id') taskId: number, @Body() task:UpdateTask): Promise<Task>{
        return this.taskService.updateTask(taskId,task);
    }

}
