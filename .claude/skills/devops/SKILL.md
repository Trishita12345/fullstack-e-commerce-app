# DevOps — Service Build & Restart

Build, restart, and health-check Loom & Lume services from the current branch. Used by the orchestrator during Stage 6.5 (MANUAL VERIFICATION) and invocable manually.

## Service Registry

| Service | Directory | Port | Type | Build Command | Run Command |
|---------|-----------|------|------|---------------|-------------|
| frontend | `frontend/ecommerce` | 3000 | frontend | `npm run build` | `npm run dev` |
| api-gateway | `backend/apiGatewayService` | 8080 | backend | `mvn clean package -q -DskipTests` | `mvn spring-boot:run` |
| product-service | `backend/productService` | 8081 | backend | `mvn clean package -q -DskipTests` | `mvn spring-boot:run` |
| cart-service | `backend/cartService` | 8082 | backend | `mvn clean package -q -DskipTests` | `mvn spring-boot:run` |
| profile-service | `backend/profileService` | 8083 | backend | `mvn clean package -q -DskipTests` | `mvn spring-boot:run` |
| order-service | `backend/orderService` | 8084 | backend | `mvn clean package -q -DskipTests` | `mvn spring-boot:run` |
| offer-service | `backend/offerService` | 8085 | backend | `mvn clean package -q -DskipTests` | `mvn spring-boot:run` |
| payment-service | `backend/paymentService` | 8086 | backend | `mvn clean package -q -DskipTests` | `mvn spring-boot:run` |
| search-service | `backend/seachEngineService` | 8087 | backend | `mvn clean package -q -DskipTests` | `mvn spring-boot:run` |
| auth-service | `backend/authService` | 8088 | backend | `mvn clean package -q -DskipTests` | `mvn spring-boot:run` |
| notification-service | `backend/notificationService` | 8090 | backend | `mvn clean package -q -DskipTests` | `mvn spring-boot:run` |

## Invocation

### Manual — restart specific services
```
/devops restart cart-service frontend
```
Accepts one or more service names from the registry above.

### Manual — restart for testing
```
/devops restart-for-testing
```
Reads the current feature's requirement doc (`.claude/docs/requirements/*-requirement.md`) "Manual Testing → Services Required" table and restarts those services.

### Orchestrator — Stage 6.5
The orchestrator invokes this skill with a list of services derived from the requirement doc before asking the human to verify.

## Restart Procedure

For each service in the requested list, execute these steps in order:

### Step 1: Pre-check — Common module (backend services only)
```bash
# Check if common module has changes vs develop
git diff origin/develop -- backend/common/ --quiet
# If exit code != 0 (changes exist), rebuild common first:
cd /home/code/fullstack-e-commerce-app/backend/common && mvn clean install -q
```
Only rebuild common **once** even if restarting multiple backend services.

### Step 2: Stop the running service
```bash
# Find the PID listening on the service's port
PID=$(ss -tlnp | grep ":<PORT> " | grep -oP 'pid=\K[0-9]+')
if [ -n "$PID" ]; then
    kill $PID
    # Wait for port to free (max 10s)
    for i in $(seq 1 10); do
        ss -tlnp | grep ":<PORT> " > /dev/null || break
        sleep 1
    done
fi
```

### Step 3: Build the service
```bash
cd /home/code/fullstack-e-commerce-app/<DIRECTORY>
# Backend:
mvn clean package -q -DskipTests
# Frontend:
npm run build
```
If build fails, STOP and report the error. Do not start a broken build.

### Step 4: Start the service
```bash
cd /home/code/fullstack-e-commerce-app/<DIRECTORY>

# For frontend — remove stale lock file first:
rm -f .next/dev/lock

# Start in background with logging:
nohup <RUN_COMMAND> > /tmp/<SERVICE_NAME>.log 2>&1 &
echo "Started <SERVICE_NAME> with PID: $!"
```

### Step 5: Health check — wait for port
```bash
# Poll until the port is listening (max 60s backend, 30s frontend)
TIMEOUT=60  # or 30 for frontend
for i in $(seq 1 $TIMEOUT); do
    ss -tlnp | grep ":<PORT> " > /dev/null && break
    sleep 1
done
# Verify
ss -tlnp | grep ":<PORT> " > /dev/null && echo "<SERVICE_NAME> is UP on :<PORT>" || echo "FAILED: <SERVICE_NAME> did not start"
```

### Step 6: Report
After all services are processed, report:
- Current branch: `git branch --show-current`
- For each service: status (UP/FAILED), PID, port
- Log file location: `/tmp/<service-name>.log`

## Infrastructure Services (Docker)

These are NOT managed by this skill — they run as Docker containers and are expected to already be up. If a container is down, start it:

| Infra | Directory | Command |
|-------|-----------|---------|
| Kafka + Zookeeper + UI | `backend/kafka-setup` | `docker compose up -d` |
| Zipkin + ELK | `backend/observability-setup` | `docker compose up -d` |
| Per-service PostgreSQL | `backend/<serviceName>` | `docker compose up -d` |
| Frontend PostgreSQL | `frontend/ecommerce` | `docker compose up -d` |

Before restarting services, verify infra is running:
```bash
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | head -20
```
If any required DB container is down, start it first.

## Logs

All service logs go to `/tmp/<service-name>.log`. To tail a service log:
```bash
tail -f /tmp/cart-service.log
```

## Notes
- The `search-service` directory is intentionally misspelled as `seachEngineService` — do not "fix" it.
- The API Gateway uses WebFlux (reactive), all other backend services use the servlet stack.
- Services bind to `127.0.0.1` — they are not accessible externally without Nginx.
