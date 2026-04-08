import blessed from "blessed";

export function createHelperTable(grid: any) {
    return grid.set(0, 9, 6, 3, blessed.box, {
        label: "Actions",
        border: { type: "line" },
        style: {
            border: { fg: "cyan" }
        },
        content: `
  Start (s)
  Stop  (x)
  Restart (r)
  Logs (l)
  `
    });
}