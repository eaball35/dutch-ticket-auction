package com.TicketTime.TicketTime.exception;

import org.springframework.security.core.AuthenticationException;

public class OAuth2AuthenticationProcessingException1 extends AuthenticationException {
    public OAuth2AuthenticationProcessingException1(String msg, Throwable t) {
        super(msg, t);
    }

    public OAuth2AuthenticationProcessingException1(String msg) {
        super(msg);
    }
}