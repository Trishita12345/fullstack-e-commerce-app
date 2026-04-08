package com.e_commerce.notificationService.strategy;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import com.e_commerce.common.model.event.OrderConfimedNotificationEvent;
import com.e_commerce.common.model.enums.NotificationType;
import com.e_commerce.notificationService.service.ITemplateService;

import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class EmailStrategy implements NotificationStrategy {

    private static final String ORDER_CONFIRMED_EMAIL_TEMPLATE = "order-confirmation";
    private static final String EMAIL_VERIFICATION_TEMPLATE = "email-verification";
    private JavaMailSender mailSender;
    private ITemplateService templateService;

    @Override
    public NotificationType getType() {
        return NotificationType.EMAIL;
    }

    // @Override
    // public void orderConfirmSend(OrderConfimedNotificationEvent request) {

    // SimpleMailMessage message = new SimpleMailMessage();
    // message.setTo(request.getConfig().getRecipient());
    // message.setText(request.getConfig().getTemplate());
    // mailSender.send(message);

    // }

    @Override
    public void orderConfirmSend(OrderConfimedNotificationEvent req) {

        try {
            String fullName = req.getConfig().getUserName();
            String firstName = (fullName == null || fullName.trim().isEmpty())
                    ? "user"
                    : fullName.trim().split("\\s+")[0];

            // 1. Prepare template data
            Map<String, Object> data = new HashMap<>();
            data.put("orderId", req.getOrderId());
            data.put("orderItems", req.getOrderItems());
            data.put("firstName", firstName);

            // 2. Render HTML
            String htmlContent = templateService.render(
                    ORDER_CONFIRMED_EMAIL_TEMPLATE,
                    data);

            // 3. Create email
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(req.getConfig().getRecipient());
            helper.setSubject("Hi " + firstName + "! Your Order is Confirmed 🎉");
            helper.setText(htmlContent, true);

            // 4. Send
            mailSender.send(message);

        } catch (Exception e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }

    @Override
    public void sendVerification(String identity, String verificationCode) {
        try {
            // 1. Prepare template data
            Map<String, Object> data = new HashMap<>();
            data.put("verificationCode", verificationCode);

            // 2. Render HTML
            String htmlContent = templateService.render(
                    EMAIL_VERIFICATION_TEMPLATE,
                    data);

            // 3. Create email
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(identity);
            helper.setSubject("Your Verification Code for Loom&Lume.shop");
            helper.setText(htmlContent, true);

            // 4. Send
            mailSender.send(message);

        } catch (Exception e) {
            throw new RuntimeException("Failed to send verification email", e);
        }
    }

}