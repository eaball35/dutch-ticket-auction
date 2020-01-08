package com.TicketTime.TicketTime.exception;

import java.util.Date;

public class ExceptionResponse {
    private final Date timestamp;
    private final String error;
    private final String message;
    private final String details;
    private final Integer status;


    public ExceptionResponse(Date timestamp, String error, String message, String details, Integer status) {
        this.timestamp = timestamp;
        this.error = error;
        this.message = message;
        this.details = details;
        this.status = status;

    }

    public Date getTimestamp() {
        return timestamp;
    }

    public String getError() {
        return error;
    }

    public String getMessage() {
        return message;
    }

    public String getDetails() {
        return details;
    }

    public Integer getStatus() {
        return status;
    }

    @Override
    public String toString() {
        return "ExceptionResponse{" +
                "timestamp=" + timestamp +
                ", error='" + error + '\'' +
                ", message='" + message + '\'' +
                ", details='" + details + '\'' +
                ", status=" + status +
                '}';
    }
}
