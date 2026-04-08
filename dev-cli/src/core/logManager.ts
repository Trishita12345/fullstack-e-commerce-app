type LogStore = Map<string, string[]>;

const logStore: LogStore = new Map();

let selectedService: string | null = null;
let showAllLogs = true;

export function addLog(service: string, message: string) {
    if (!logStore.has(service)) {
        logStore.set(service, []);
    }

    logStore.get(service)!.push(message);
}

export function setSelectedService(service: string | null) {
    selectedService = service;
}

export function toggleLogsMode() {
    showAllLogs = !showAllLogs;

}

export function getLogs(): string[] {
    if (showAllLogs) {
        return Array.from(logStore.values()).flat();
    }

    if (!selectedService) return [];


    return logStore.get(selectedService) || [];
}
export function getLogMode() {
    return showAllLogs;
}

export function getSelectedService() {
    return selectedService;
}