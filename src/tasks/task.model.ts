export class Task{
    name:string;
    id: number;
    description: string;
    status:TaskStatus;
}

export enum TaskStatus{
    OPEN='OPEN',
    IN_PROGRESS='IN_PROGRESS',
    CLOSED='CLOSED'
}