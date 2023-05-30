package com.Manipulus.arctic.Unit.excepion;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)

public class UnitNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    public UnitNotFoundException(String message) {
        super(message); } }
