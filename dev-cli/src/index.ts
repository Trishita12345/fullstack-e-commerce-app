import blessed from "blessed";
import contrib from "blessed-contrib";

import { services } from "./config/services";
import { createServicesTable } from "./ui/servicesTable";
import { createLogs } from "./ui/logsPanel";
import { createLogger } from "./utils/logger";
import { getLogMode, setSelectedService } from "./core/logManager";
import { getLogs } from "./core/logManager";

import {
    startService,
    stopService,
    restartService
} from "./core/processManager";

import { getServiceStatus } from "./core/statusManager";
import { createHelperTable } from "./ui/rightPanel";

const screen = blessed.screen({ smartCSR: true });
const grid = new contrib.grid({ rows: 12, cols: 12, screen });

const table = createServicesTable(grid);
const logs = createLogs(grid);
const log = createLogger(logs);
createHelperTable(grid);

async function render() {
    const data: string[][] = [];

    for (const s of services) {
        const status = await getServiceStatus(s);

        data.push([
            s.name,
            String(s.port),
            status === "RUNNING"
                ? "{green-fg}● RUNNING{/}"
                : "{red-fg}● STOPPED{/}"
        ]);
    }

    table.setData({
        headers: ["", "Port", "Status"],
        data
    });

    screen.render();
}

function getSelectedService() {
    const index = table.rows.selected;
    if (index == null || index < 0) return null;

    const svc = services[index];

    setSelectedService(svc.name); // 👈 ADD THIS

    return svc;
}
function renderLogs() {
    logs.setContent("");

    const allLogs = getLogs();

    const mode = getLogMode();
    const selected = getSelectedService();

    logs.setLabel(
        mode
            ? "{cyan-fg}Logs (ALL){/}"
            : `{green-fg}Logs (${selected?.name}){/}`
    );

    for (const logLine of allLogs.slice(-200)) {
        logs.log(logLine);
    }
}
// keybindings
screen.key(["s"], () => {
    const svc = getSelectedService();
    if (svc) startService(svc, log);
});

screen.key(["x"], () => {
    const svc = getSelectedService();
    if (svc) stopService(svc, log);
});

screen.key(["r"], () => {
    const svc = getSelectedService();
    if (svc) restartService(svc, log);
});

// navigation
screen.key(["up"], () => {
    const i = table.rows.selected ?? 0;
    table.rows.select(Math.max(0, i));
    screen.render();
});

screen.key(["down"], () => {
    const i = table.rows.selected ?? 0;
    table.rows.select(Math.min(services.length - 1, i));
    screen.render();
});

// horizontal log scroll
screen.key(["left"], () => logs.scroll(-5));
screen.key(["right"], () => logs.scroll(5));
import { toggleLogsMode } from "./core/logManager";

screen.key(["l"], () => {
    toggleLogsMode();
});
screen.key(["q"], () => process.exit(0));

table.focus();
setInterval(() => {
    render();
    renderLogs(); // 👈 ADD
}, 2000);