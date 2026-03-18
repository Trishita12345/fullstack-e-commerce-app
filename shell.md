# Some importnat shell command used

**Run process in background**

```nohup mvn spring-boot:run > /dev/null 2>&1 &```

**Find pid for service using specific PORT**

```sudo ss -ltnp | grep :[PORT_NUM]```

**Kill the service**

```kill -9 [PID]```