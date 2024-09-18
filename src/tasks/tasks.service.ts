import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task';
import { TaskStatus } from './task-status';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTask } from './dto/update-task';
import { Task } from './task.entity';
import { Pagination } from './dto/pagination';
import { DEFAULT_LIMIT } from 'src/utils/pagination-util';
@Injectable()
export class TasksService {

    constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>) {
    }

    async getTaskById(id: number): Promise<Task> {
        Logger.log(`Fetching task by Id ${id}`)
        const task = await this.taskRepository.findOneBy({id:id})
        if (!task) {
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }
        return task;
    }

    async saveTask(taskDTO: CreateTaskDTO): Promise<Task> {
        Logger.log(`Creating a task ${taskDTO.name}`)
        try {
            let task: Task = {
                name: taskDTO.name,
                description: taskDTO.description,
                status: TaskStatus.OPEN
            }
            const newTask = await this.taskRepository.save(task);
            return newTask;
        }
        catch (error) {
            Logger.error("Exception occurred while saving task");
            throw new InternalServerErrorException("Unable to save the task");
        }
    }


    async getAllTasks(status: TaskStatus, name: string, pagination: Pagination): Promise<Task[]> {
       const queryOptions: any = {}
       queryOptions.where = {};
        try {
            if (status) {
                queryOptions.where.status = status;
            }
            if (name) {
                queryOptions.where.name = name;
            }
            if (pagination) {
                queryOptions.skip = pagination.skip;  
                queryOptions.take = pagination.limit ?? DEFAULT_LIMIT; 
            }
            if (status || name || pagination) {
                Logger.log(`Applying filters with status = ${status} name = ${name}`)
                return this.taskRepository.find(queryOptions);
            }
            else {
                Logger.log("Fetching all tasks")
                return this.taskRepository.find();
            }
        }
        catch (error) {
            Logger.error('Exception occurred while fetching tasks')
            throw new InternalServerErrorException("Unable to get tasks", error)
        }
    }

    async updateTask(taskId: number, updateTaskDTO: UpdateTask): Promise<Task> {
        try {
            let task = await this.getTaskById(taskId);
            if (!task) {
                Logger.error(`Task doesn't exist with id ${taskId}`);
                throw new NotFoundException("Not found");
            }
            if (updateTaskDTO.name) {
                if (task.name !== updateTaskDTO.name) {
                    Logger.error("Task name can not be changed");
                    throw new InternalServerErrorException("Can't modify task name");
                }
            }
            Logger.log('Updating the task details');
            task.description = updateTaskDTO.description;
            task.status = updateTaskDTO.status;
            return this.taskRepository.save(task);
        }
        catch (error) {
            Logger.error('Exception occurred while updating the task');
            throw error;
        }
    }

}
