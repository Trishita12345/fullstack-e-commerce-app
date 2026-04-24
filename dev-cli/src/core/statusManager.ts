import { exec } from "child_process";
import { Service } from "../types/service";
import { isServiceRunning } from "./processManager";

export function checkPort(port: number): Promise<boolean> {
    return new Promise((resolve) => {
        exec(`lsof -ti:${port}`, (err, stdout) => {
            resolve(!!stdout);
        });
    });
}

export async function getServiceStatus(
    service: Service
): Promise<"RUNNING" | "STOPPED"> {
    if (isServiceRunning(service)) return "RUNNING";

    const running = await checkPort(service.port);
    return running ? "RUNNING" : "STOPPED";
}