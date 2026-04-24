package com.e_commerce.notificationService.service;

import java.util.Map;

public interface ITemplateService {
    String render(String templateName, Map<String, Object> data);
}
