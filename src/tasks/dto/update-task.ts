import { TaskStatus } from "../task-status"

export class UpdateTask{
    name?: string;
    description:string;
    status: TaskStatus;
}