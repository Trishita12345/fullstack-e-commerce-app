Perfect — let’s do a **clean, production-grade Nginx setup from scratch** for your case 👇
(Frontend + API + SSL + secure architecture)

---

# 🧱 STEP 0 — Your target architecture

```text
Internet
   ↓
Nginx (80/443) ✅
   ↓
Frontend → localhost:3000
API → localhost:8080
```

👉 Only Nginx is public
👉 Everything else = localhost 🔒

---

# 🚀 STEP 1 — Install Nginx

```bash
sudo apt update
sudo apt install nginx -y
```

---

# 🔍 Verify

```bash
sudo systemctl status nginx
```

👉 Should show:

```text
active (running)
```

---

# 🌐 STEP 2 — Allow ports in firewall

```bash
sudo ufw allow 80
sudo ufw allow 443
```

---

# 🧹 STEP 3 — Remove default config

```bash
sudo rm /etc/nginx/sites-enabled/default
```

---

# 🧱 STEP 4 — Create new config file

```bash
sudo nano /etc/nginx/sites-available/loomandlume
```

---

# ✍️ STEP 5 — Add basic (HTTP) config first

```nginx
# Frontend
server {
    listen 80;
    server_name loomandlume.shop www.loomandlume.shop;

    location / {
        proxy_pass http://localhost:3000;

        proxy_set_header Host $host;
    }
}

# API
server {
    listen 80;
    server_name api.loomandlume.shop;

    location / {
        proxy_pass http://localhost:8080;

        proxy_set_header Host $host;
    }
}
```

---

# 🔗 STEP 6 — Enable config

```bash
sudo ln -s /etc/nginx/sites-available/loomandlume /etc/nginx/sites-enabled/
```

---

# 🧪 STEP 7 — Test config

```bash
sudo nginx -t
```

👉 Must show:

```text
syntax is ok
```

---

# 🔁 STEP 8 — Restart Nginx

```bash
sudo systemctl restart nginx
```

---

# 🌍 STEP 9 — Check HTTP works

Open:

```text
http://loomandlume.shop
http://api.loomandlume.shop
```

---

# 🔐 STEP 10 — Install SSL (Certbot)

```bash
sudo apt install certbot python3-certbot-nginx -y
```

---

# 🚀 STEP 11 — Generate SSL

```bash
sudo certbot --nginx
```

👉 It will:

* Detect domains
* Add HTTPS config automatically
* Add redirects

---

# 🔍 STEP 12 — Verify HTTPS

Open:

```text
https://loomandlume.shop
https://api.loomandlume.shop
```

---

# 🔐 STEP 13 — Add security headers (IMPORTANT)

Edit config again:

```bash
sudo nano /etc/nginx/sites-available/loomandlume
```

Inside each `server { listen 443 ssl; }` block add:

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

---

# 🚦 STEP 14 — Add rate limiting (API protection)

Edit:

```bash
sudo nano /etc/nginx/nginx.conf
```

Inside `http {}`:

```nginx
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
```

---

Then in API block:

```nginx
location / {
    proxy_pass http://localhost:8080;
    limit_req zone=api_limit burst=20 nodelay;
}
```

---

# 🔁 STEP 15 — Reload

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

# 🔐 STEP 16 — Final security checks

### Ensure API NOT public:

```bash
sudo ss -tulnp | grep 8080
```

👉 Should be:

```text
127.0.0.1:8080
```

---

# 🎯 FINAL RESULT

```text
https://loomandlume.shop → frontend
https://api.loomandlume.shop → API
```

---

# 🧠 What you achieved

* ✅ HTTPS enabled
* ✅ Only Nginx exposed
* ✅ API hidden behind proxy
* ✅ Rate limiting added
* ✅ Security headers added

---

# 🚀 BONUS (recommended next)

* Enable auto-renew:

```bash
sudo certbot renew --dry-run
```

---

# 🎯 Final takeaway

👉 You now have **production-grade reverse proxy setup**

---
