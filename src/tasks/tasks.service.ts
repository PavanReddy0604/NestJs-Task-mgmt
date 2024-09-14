import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { log } from 'console';
import { CreateTaskDTO } from './dto/create-task';
import{v4 as uuid} from 'uuid';

import { randomUUID } from 'crypto';
@Injectable()
export class TasksService {

    private readonly tasks:Task[]=[];

    FindById(taskId: number): Task {
        console.log('task id is '+taskId)
        // this.tasks.forEach(task =>{
        //     if(task.id===taskId){
        //         console.log("Task found !")
        //         return task;
        //     }
        // })

        for(let i=0;i<this.tasks.length;i++){
            if(taskId===this.tasks[i].id){
                return this.tasks[i];
            }
        }
        throw new Error("Task not found")
    }

    findAllTasks() :Task[]{
        return this.tasks
    }


    createTask(newTask:CreateTaskDTO): Task{
        const task: Task={
            id:uuid(),
            description:newTask.description,
            status:TaskStatus.OPEN,
            name:newTask.name
        }
        log('task is '+task)
        this.tasks.push(task);
        return task;
    }

}
