import contrib from "blessed-contrib";

export function createServicesTable(grid: any) {
    return grid.set(0, 0, 6, 9, contrib.table, {
        label: "Services",
        keys: true,
        mouse: true,
        interactive: true,
        vi: true,
        border: { type: "line" },
        columnWidth: [30, 15, 20], // increase width (fix cropping)
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
        }
    });
}