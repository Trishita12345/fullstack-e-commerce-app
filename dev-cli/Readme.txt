dev-cli/
│
├── src/
│   ├── index.ts              # entry point
│
│   ├── config/
│   │   └── services.ts       # service definitions
│
│   ├── types/
│   │   └── service.ts        # all types
│
│   ├── core/
│   │   ├── processManager.ts # start/stop/restart
│   │   └── statusManager.ts  # status logic
│
│   ├── ui/
│   │   ├── screen.ts         # screen + grid
│   │   ├── servicesTable.ts  # table UI
│   │   ├── logsPanel.ts      # logs UI
│   │   └── keybindings.ts    # keyboard logic
│
│   └── utils/
│       └── logger.ts         # logging