import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task';
import { UpdateTask } from './dto/update-task';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status';
import { Pagination } from './dto/pagination';
@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService) { }
    @Get()
    getTasks(@Query('status') status:TaskStatus,@Query('name') name:string, @Query() pagination:Pagination): Promise<Task[]> {
        return this.taskService.getAllTasks(status,name,pagination);
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
