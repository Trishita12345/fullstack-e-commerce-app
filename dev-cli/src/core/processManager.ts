import { spawn, exec } from "child_process";
import { Service, RunningProcess } from "../types/service";

const runningProcesses: Map<string, RunningProcess> = new Map();

export function startService(
    service: Service,
    addLog: (name: string, msg: string) => void
): void {
    if (runningProcesses.has(service.name)) {
        addLog(service.name, `⚠️ ${service.name} already running`);
        return;
    }

    const proc = spawn(service.startCommand, {
        cwd: service.path,
        shell: true,
        detached: true
    });

    const pid = proc.pid;

    if (!pid) {
        addLog(service.name, `❌ Failed to start ${service.name}`);
        return;
    }

    runningProcesses.set(service.name, { process: proc, pid });

    addLog(service.name, `🚀 ${service.name} started (PID: ${pid})`);

    proc.stdout?.on("data", (data: Buffer) => {
        addLog(service.name, `[${service.name}] ${data.toString().trim()}`);
    });

    proc.stderr?.on("data", (data: Buffer) => {
        addLog(
            service.name,
            `{red-fg}[${service.name} ERROR]{/} ${data.toString().trim()}`
        );
    });

    proc.on("close", () => {
        runningProcesses.delete(service.name);
        addLog(service.name, `❌ ${service.name} stopped`);
    });
}

export function stopService(
    service: Service,
    addLog: (name: string, msg: string) => void
): void {
    const running = runningProcesses.get(service.name);

    if (running) {
        const pid = running.pid;

        addLog(service.name, `🛑 Killing ${service.name} (PID: ${pid})`);

        try {
            process.kill(-pid, "SIGKILL");
            addLog(service.name, `✅ ${service.name} stopped`);
        } catch {
            addLog(service.name, `⚠️ Failed to kill process group`);
        }

        runningProcesses.delete(service.name);
        return;
    }

    exec(`lsof -ti:${service.port}`, (err, stdout) => {
        if (stdout) {
            exec(`kill -9 ${stdout.trim()}`);
            addLog(service.name, `✅ ${service.name} stopped via port`);
        }
    });
}

export function restartService(
    service: Service,
    addLog: (name: string, msg: string) => void
): void {
    stopService(service, addLog);
    setTimeout(() => startService(service, addLog), 1000);
}

export function isServiceRunning(service: Service): boolean {
    return runningProcesses.has(service.name);
}