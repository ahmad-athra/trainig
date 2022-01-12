


export interface Progress{
  _id: string;
  progressValue: number;
  date: Date;
}
export interface Task {
  _id: string;
  details: string;
  progress: Progress;
  completed: boolean;
}
