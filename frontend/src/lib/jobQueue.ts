/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Job {
  videoPath: string;
  line: any;
  status: 'process' | 'halt';
}

const jobQueue: Job[] = [];

export function addJob(job: Job) {
  jobQueue.push(job);
}

export function getJobs(): Job[] {
  return [...jobQueue];
}

export function clearJobs() {
  jobQueue.length = 0;
}

export function updateJobStatus(index: number, status: Job['status']) {
  if (jobQueue[index]) jobQueue[index].status = status;
}

export function removeJob(index: number) {
  if (index >= 0 && index < jobQueue.length) {
    jobQueue.splice(index, 1);
  }
}

export function isAllJobsHalted(): boolean {
  return jobQueue.every(job => job.status === 'halt');
}
