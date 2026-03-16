Below is a **clean Nginx setup section you can add to your project documentation**.
It is written so someone running the project on a **remote dev server (DigitalOcean / VPS)** can configure routing correctly.

You can add this to your README under **Deployment / Reverse Proxy Setup**.

---

# Nginx Reverse Proxy Setup

Nginx is used as a **reverse proxy** to route incoming traffic to the correct service.

### Purpose

* Serve frontend via domain
* Route API requests to API Gateway
* Hide internal service ports
* Enable HTTPS later via Let's Encrypt

---

# Architecture

```
Client
   ↓
Nginx (80 / 443)
   ↓
Frontend → Next.js (3000)
API → Spring Gateway (8080)
         ↓
    Microservices
```

Example URLs:

| URL                  | Destination        |
| -------------------- | ------------------ |
| loomandlume.shop     | Next.js frontend   |
| api.loomandlume.shop | Spring API Gateway |

---

# 1. Install Nginx

```bash
sudo apt update
sudo apt install nginx -y
```

Verify installation:

```bash
nginx -v
```

Start nginx:

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

# 2. Create Nginx Site Configuration

Create a new configuration file.

```bash
sudo nano /etc/nginx/sites-available/loomandlume
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name loomandlume.shop www.loomandlume.shop;

    location / {
        proxy_pass http://localhost:3000;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name api.loomandlume.shop;

    location / {
        proxy_pass http://localhost:8080;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

# 3. Enable the Site

Create a symbolic link to enable the configuration.

```bash
sudo ln -s /etc/nginx/sites-available/loomandlume /etc/nginx/sites-enabled/
```

If the file already exists, skip this step.

---

# 4. Test Nginx Configuration

Always test configuration before restarting.

```bash
sudo nginx -t
```

Expected output:

```
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

---

# 5. Reload Nginx

Apply the configuration.

```bash
sudo systemctl reload nginx
```

---

# 6. Allow Firewall Access

If firewall is enabled:

```bash
sudo ufw allow 80
sudo ufw allow 443
```

---

# 7. Test Domain Routing

Frontend:

```
http://loomandlume.shop
```

API Gateway:

```
http://api.loomandlume.shop
```

---

# Request Flow

Example API request:

```
https://api.loomandlume.shop/api/product-service/public/hello
```

Flow:

```
Browser
   ↓
Nginx
   ↓
Spring Cloud Gateway
   ↓
product-service
```

---

# Enable HTTPS (Recommended)

Install **Certbot**.

```bash
sudo apt install certbot python3-certbot-nginx -y
```

Run:

```bash
sudo certbot --nginx
```

Follow the prompts.

After completion your site will be available via:

```
https://loomandlume.shop
https://api.loomandlume.shop
```

---

# Restart Commands

Restart nginx:

```bash
sudo systemctl restart nginx
```

Reload config:

```bash
sudo systemctl reload nginx
```

Check status:

```bash
sudo systemctl status nginx
```

---

# Troubleshooting

Check nginx logs:

```bash
sudo tail -f /var/log/nginx/error.log
```

Check access logs:

```bash
sudo tail -f /var/log/nginx/access.log
```

Test backend directly:

```bash
curl http://localhost:8080
```

---

# Final System Overview

```
loomandlume.shop
        ↓
     Nginx
        ↓
Next.js (3000)

api.loomandlume.shop
        ↓
     Nginx
        ↓
Spring Gateway (8080)
        ↓
Microservices
```

---

If you want, I can also give you a **much better Nginx config optimized for Next.js + WebSockets + API Gateway**, which avoids many production issues.
