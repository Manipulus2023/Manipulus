package com.Manipulus.arctic.siteVisit.controller;

import com.Manipulus.arctic.siteVisit.processor.GatePassProcessor;
import lombok.RequiredArgsConstructor;
import net.sf.jasperreports.engine.JRException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayOutputStream;

@RequiredArgsConstructor
@RestController
public class GatePassController {

    private final GatePassProcessor gatePassProcessor;

    @GetMapping("/report")
    public ResponseEntity getGatePass()throws JRException {
        ByteArrayOutputStream reportStream = gatePassProcessor.generateReport();
        HttpHeaders httpHeaders=new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_PDF);

        return new ResponseEntity<>(reportStream.toByteArray(),httpHeaders, HttpStatus.OK);
    }

}
