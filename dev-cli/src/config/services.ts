import path from "path";
import { Service } from "../types/service";

const ROOT_DIR = path.resolve(__dirname, "../../../");

export const services: Service[] = [
    // -------- FRONTEND --------
    {
        name: "frontend",
        type: "frontend",
        path: path.join(ROOT_DIR, "frontend/ecommerce"),
        port: 3000,
        startCommand: "npm run dev"
    },

    // -------- API GATEWAY --------
    {
        name: "api-gateway",
        type: "backend",
        path: path.join(ROOT_DIR, "backend/apiGatewayService"),
        port: 8080,
        startCommand: "mvn spring-boot:run"
    },

    // -------- AUTH SERVICE --------
    {
        name: "auth-service",
        type: "backend",
        path: path.join(ROOT_DIR, "backend/authService"),
        port: 8088,
        startCommand: "mvn spring-boot:run"
    },

    // -------- PRODUCT SERVICE --------
    {
        name: "product-service",
        type: "backend",
        path: path.join(ROOT_DIR, "backend/productService"),
        port: 8081,
        startCommand: "mvn spring-boot:run"
    },

    // -------- ORDER SERVICE --------
    {
        name: "order-service",
        type: "backend",
        path: path.join(ROOT_DIR, "backend/orderService"),
        port: 8084,
        startCommand: "mvn spring-boot:run"
    },

    // -------- PAYMENT SERVICE --------
    {
        name: "payment-service",
        type: "backend",
        path: path.join(ROOT_DIR, "backend/paymentService"),
        port: 8086,
        startCommand: "mvn spring-boot:run"
    },

    // -------- SEARCH SERVICE --------
    {
        name: "search-service",
        type: "backend",
        path: path.join(ROOT_DIR, "backend/seachEngineService"),
        port: 8087,
        startCommand: "mvn spring-boot:run"
    },

    // -------- NOTIFICATION SERVICE --------
    {
        name: "notification-service",
        type: "backend",
        path: path.join(ROOT_DIR, "backend/notificationService"),
        port: 8089,
        startCommand: "mvn spring-boot:run"
    },
    // -------- CART SERVICE --------
    {
        name: "cart-service",
        type: "backend",
        path: path.join(ROOT_DIR, "backend/cartService"),
        port: 8082,
        startCommand: "mvn spring-boot:run"
    },
    // -------- OFFER SERVICE --------
    {
        name: "offer-service",
        type: "backend",
        path: path.join(ROOT_DIR, "backend/offerService"),
        port: 8085,
        startCommand: "mvn spring-boot:run"
    },
    // -------- PROFILE SERVICE --------
    {
        name: "profile-service",
        type: "backend",
        path: path.join(ROOT_DIR, "backend/profileService"),
        port: 8083,
        startCommand: "mvn spring-boot:run"
    }
];