import blessed from "blessed";
import contrib from "blessed-contrib";
import path from "path";
import { spawn, exec } from "child_process";

// -------- ROOT --------
const ROOT_DIR = path.resolve(__dirname, "..");

// -------- TYPES --------
type ServiceType = "frontend" | "backend";
type ServiceStatus = "RUNNING" | "STOPPED" | "STARTING";

type Service = {
    name: string;
    type: ServiceType;
    path: string;
    port: number;
    startCommand: string;
};

type RunningProcess = {
    process: ReturnType<typeof spawn>;
    pid: number;
};

// -------- DATA --------
const services: Service[] = [
    {
        name: "frontend",
        type: "frontend",
        path: path.join(ROOT_DIR, "frontend/ecommerce"),
        port: 3000,
        startCommand: "npm run dev"
    },
    {
        name: "api-gateway",
        type: "backend",
        path: path.join(ROOT_DIR, "backend/apiGatewayService"),
        port: 8080,
        startCommand: "mvn spring-boot:run"
    },
    {
        name: "product-service",
        type: "backend",
        path: path.join(ROOT_DIR, "backend/productService"),
        port: 8081,
        startCommand: "mvn spring-boot:run"
    }
];

// -------- STATE --------
const runningProcesses: Map<string, RunningProcess> = new Map();
const serviceStatus: Map<string, ServiceStatus> = new Map();

// -------- UI --------
const screen = blessed.screen({
    smartCSR: true,
    title: "Dev CLI"
});

const grid = new contrib.grid({ rows: 12, cols: 12, screen });

const servicesTable = grid.set(0, 0, 12, 6, contrib.table, {
    label: "Services",
    keys: true,
    mouse: true,
    interactive: true,
    vi: true,
    border: { type: "line" },
    style: {
        border: { fg: "cyan" },
        header: { fg: "white", bold: true },
        cell: {
            fg: "white",
            selected: {
                bg: "green",
                fg: "black",
                bold: true
            }
        }
    },
    columnWidth: [20, 10, 15]
});

const logs = grid.set(0, 6, 12, 6, contrib.log, {
    label: "Logs",
    border: { type: "line" },
    tags: true,
    style: {
        border: { fg: "cyan" }
    }
});

// -------- HELPERS --------
function logAction(message: string): void {
    const time = new Date().toLocaleTimeString();
    logs.log(`{gray-fg}[${time}]{/} {cyan-fg}${message}{/}`);
}

function checkPort(port: number): Promise<boolean> {
    return new Promise((resolve) => {
        exec(`lsof -ti:${port}`, (err, stdout) => {
            resolve(!!stdout);
        });
    });
}

function getStatusText(status: ServiceStatus): string {
    switch (status) {
        case "RUNNING":
            return "{green-fg}● RUNNING{/}";
        case "STARTING":
            return "{yellow-fg}● STARTING{/}";
        default:
            return "{red-fg}● STOPPED{/}";
    }
}

// -------- RENDER --------
async function renderServices(): Promise<void> {
    const data: string[][] = [];

    for (const s of services) {
        let status: ServiceStatus = "STOPPED";

        // 👇 FIRST check process
        if (runningProcesses.has(s.name)) {
            status = "RUNNING";
        } else {
            // fallback to port
            const running = await checkPort(s.port);
            status = running ? "RUNNING" : "STOPPED";
        }

        data.push([
            s.name,
            String(s.port),
            getStatusText(status)
        ]);
    }

    servicesTable.setData({
        headers: ["Service", "Port", "Status"],
        data
    });

    screen.render();
}

// -------- PROCESS MANAGEMENT --------
function startService(service: Service): void {
    if (runningProcesses.has(service.name)) {
        logAction(`⚠️ ${service.name} already running`);
        return;
    }

    serviceStatus.set(service.name, "STARTING");

    const proc = spawn(service.startCommand, {
        cwd: service.path,
        shell: true,
        detached: true // 👈 IMPORTANT
    });

    const pid = proc.pid;

    if (!pid) {
        logAction(`❌ Failed to start ${service.name}`);
        return;
    }

    runningProcesses.set(service.name, { process: proc, pid });

    logAction(`🚀 ${service.name} started (PID: ${pid})`);

    proc.stdout.on("data", (data: Buffer) => {
        const msg = data.toString();
        logAction(`[${service.name}] ${msg.trim()}`);

        // FRONTEND detection
        if (service.type === "frontend") {
            if (
                msg.includes("Ready") ||
                msg.includes("ready") ||
                msg.includes("started server") ||
                msg.includes("http://localhost")
            ) {
                serviceStatus.set(service.name, "RUNNING");
            }
        }

        // BACKEND detection
        if (service.type === "backend") {
            if (msg.includes("Started")) {
                serviceStatus.set(service.name, "RUNNING");
            }
        }
    });

    proc.stderr.on("data", (data: Buffer) => {
        logAction(`[${service.name} ERROR] ${data.toString().trim()}`);
    });

    proc.on("close", () => {
        serviceStatus.set(service.name, "STOPPED");
        runningProcesses.delete(service.name);
    });
}

function stopService(service: Service): void {
    const running = runningProcesses.get(service.name);

    if (running) {
        const pid = running.pid;

        logAction(`🛑 Killing ${service.name} (PID: ${pid})`);

        try {
            // kill entire process group
            process.kill(-pid, "SIGKILL"); // 👈 THIS IS THE FIX
            logAction(`✅ ${service.name} stopped`);
        } catch (err) {
            logAction(`⚠️ Failed to kill process group`);
        }

        runningProcesses.delete(service.name);
        serviceStatus.set(service.name, "STOPPED");
        return;
    }

    // fallback
    exec(`lsof -ti:${service.port}`, (err, stdout) => {
        if (stdout) {
            exec(`kill -9 ${stdout.trim()}`);
            logAction(`✅ ${service.name} stopped via port`);
        }
    });
}

function restartService(service: Service): void {
    stopService(service);
    setTimeout(() => startService(service), 1000);
}

// -------- SELECTION --------
function getSelectedService(): Service | null {
    const index = servicesTable.rows.selected;

    if (index == null || index < 0 || index >= services.length) {
        return null;
    }

    return services[index];
}

// -------- KEYBINDS --------
screen.key(["s"], () => {
    const svc = getSelectedService();
    if (!svc) return;
    startService(svc);
});

screen.key(["x"], () => {
    const svc = getSelectedService();
    if (!svc) return;
    stopService(svc);
});

screen.key(["r"], () => {
    const svc = getSelectedService();
    if (!svc) return;
    restartService(svc);
});

screen.key(["A"], () => {
    logAction("🚀 Starting ALL services...");
    services.forEach((s, i) => {
        setTimeout(() => startService(s), i * 1000);
    });
});

screen.key(["K"], () => {
    logAction("🛑 Stopping ALL services...");
    services.forEach((s) => stopService(s));
});

// arrow key fix
screen.key(["up"], () => {
    const current = servicesTable.rows.selected ?? 0;
    servicesTable.rows.select(Math.max(0, current - 1));
    screen.render();
});

screen.key(["down"], () => {
    const current = servicesTable.rows.selected ?? 0;
    servicesTable.rows.select(
        Math.min(services.length - 1, current + 1)
    );
    screen.render();
});

screen.key(["q", "C-c"], () => process.exit(0));

// -------- INIT --------
servicesTable.focus();
renderServices();

setInterval(() => {
    renderServices();
}, 2000);