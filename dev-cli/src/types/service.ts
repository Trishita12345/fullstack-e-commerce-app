import { ChildProcess } from "child_process";

export type ServiceType = "frontend" | "backend";

export type Service = {
    name: string;
    type: ServiceType;
    path: string;
    port: number;
    startCommand: string;
};

export type RunningProcess = {
    process: ChildProcess;
    pid: number;
};