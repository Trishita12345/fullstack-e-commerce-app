import blessed from "blessed";

export function createLogs(grid: any) {
    return grid.set(6, 0, 6, 12, blessed.log, {
        label: "Logs",
        border: { type: "line" },
        tags: true,
        scrollable: true,
        alwaysScroll: true,
        keys: true,
        mouse: true,
        vi: true,
        scrollbar: {
            ch: " ",
            inverse: true
        },
        style: {
            border: { fg: "cyan" }
        }
    });
}