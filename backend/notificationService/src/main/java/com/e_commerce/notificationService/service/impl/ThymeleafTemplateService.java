package com.e_commerce.notificationService.service.impl;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import com.e_commerce.notificationService.service.ITemplateService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ThymeleafTemplateService implements ITemplateService {

    private final SpringTemplateEngine templateEngine;

    @Override
    public String render(String templateName, Map<String, Object> data) {

        Context context = new Context();
        context.setVariables(data);

        return templateEngine.process("email/" + templateName, context);
    }
}