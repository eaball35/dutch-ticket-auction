package com.TicketTime.TicketTime.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadRequestException1 extends RuntimeException {
    public BadRequestException1(String message) {
        super(message);
    }

    public BadRequestException1(String message, Throwable cause) {
        super(message, cause);
    }
}
