import { addLog } from "../core/logManager";

export function createLogger(logs: any) {
    return (service: string, message: string) => {
        const time = new Date().toLocaleTimeString();

        const formatted = `{gray-fg}[${time}]{/} ${message}`;

        addLog(service, formatted);

        logs.log(formatted);
    };
}