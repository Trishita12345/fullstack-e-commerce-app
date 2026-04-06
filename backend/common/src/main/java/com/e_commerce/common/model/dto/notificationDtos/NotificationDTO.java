package com.e_commerce.common.model.dto.notificationDtos;

import com.e_commerce.common.model.enums.NotificationType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NotificationDTO {
    private NotificationType type; // EMAIL / SMS
    private String userName;
    private String recipient; // email or phone
}
