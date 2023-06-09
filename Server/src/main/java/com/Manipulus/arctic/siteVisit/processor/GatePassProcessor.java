package com.Manipulus.arctic.siteVisit.processor;

import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimplePdfExporterConfiguration;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.util.HashMap;
import java.util.Map;
@Component
public class GatePassProcessor {


    public ByteArrayOutputStream generateReport() throws JRException {
        String filePath = "C:\\Manipulus 7.0\\Manipulus\\Server\\src\\main\\resources\\template\\gatePass.jrxml";
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("siteVisitId", 1234L);
        parameters.put("jobId", 456L);
        parameters.put("scheduledDate", java.sql.Date.valueOf("2022-07-07"));
        parameters.put("endDate", java.sql.Date.valueOf("2022-07-08"));
        JasperReport report = JasperCompileManager.compileReport(filePath);
        JasperPrint print = JasperFillManager.fillReport(report, parameters, new JREmptyDataSource());
        ByteArrayOutputStream byteArrayOutputStream=new ByteArrayOutputStream();
        JRPdfExporter exporter=new JRPdfExporter();
        SimplePdfExporterConfiguration configuration=new SimplePdfExporterConfiguration();
        configuration.setCompressed(true);
        exporter.setConfiguration(configuration);
        exporter.setExporterInput(new SimpleExporterInput(print));
        exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(byteArrayOutputStream));
        exporter.exportReport();
        return byteArrayOutputStream;
    }

}
