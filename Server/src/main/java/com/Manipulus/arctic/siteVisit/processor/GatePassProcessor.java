package com.Manipulus.arctic.siteVisit.processor;

import com.Manipulus.arctic.siteVisit.SiteVisitResource;
import com.Manipulus.arctic.siteVisit.repo.SiteVisitRepo;
import com.Manipulus.arctic.siteVisit.service.SiteVisitService;
import com.Manipulus.arctic.siteVisit.siteVisit.SiteVisit;
import jakarta.inject.Inject;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@Service
public class GatePassProcessor {

    @Autowired
    public SiteVisitRepo siteVisitRepo;
    @Autowired
    private GatePassProcessor gatePassProcessor;
    @Autowired
    private SiteVisitService siteVisitService;
    @Autowired
    private SiteVisitResource siteVisitResource;

    public ByteArrayOutputStream generateReport() throws JRException {
        List<SiteVisit> siteVisits = siteVisitRepo.findAll();

        // Load the JasperReport template
        String filePath = "C:\\Manipulus 7.0\\Manipulus\\Server\\src\\main\\resources\\template\\gatePass.jrxml";
        JasperReport jasperReport = JasperCompileManager.compileReport(filePath);

        // Prepare parameters for the report
        Map<String, Object> parameters = new HashMap<>();

        // Pass the data to the report
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(siteVisits);

        // Generate the report
        // JasperPrint print = JasperFillManager.fillReport(report, parameters, new JREmptyDataSource());
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

        // Export the report to a ByteArrayOutputStream
        ByteArrayOutputStream reportStream = new ByteArrayOutputStream();
        JasperExportManager.exportReportToPdfStream(jasperPrint, reportStream);
        //    List<SiteVisit>siteVisit=siteVisitRepo.findAll();
//       parameters.put("siteVisitId", 123L);
//        parameters.put("jobId", 456L);
//        parameters.put("scheduledDate", java.sql.Date.valueOf("2022-07-07"));
//        parameters.put("endDate", java.sql.Date.valueOf("2022-07-08"));


        // ByteArrayOutputStream byteArrayOutputStream=new ByteArrayOutputStream();
//        JRPdfExporter exporter=new JRPdfExporter();
//        SimplePdfExporterConfiguration configuration=new SimplePdfExporterConfiguration();
//        configuration.setCompressed(true);
//        exporter.setConfiguration(configuration);
//        exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
//        exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(reportStream));
//        exporter.exportReport();
        return reportStream;
    }

    public ByteArrayOutputStream generateReportBySiteVisitId(Long siteVisitId) throws JRException {
        SiteVisit siteVisit = siteVisitService.findSiteVisitBySiteVisitId(siteVisitId); // Replace siteVisitId with the actual ID of the site visit you want to display
        List<SiteVisit> siteVisits = new ArrayList<>();
        siteVisits.add(siteVisit);
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(siteVisits);

       // List<SiteVisit> siteVisits = siteVisitRepo.findAll();// Retrieve the site visits from the repository

        // Retrieve the site visit details based on the siteVisitId
     //   SiteVisit siteVisit = siteVisitService.findSiteVisitBySiteVisitId(siteVisitId);


        // Check if the site visit exists
        if (siteVisit == null) {
            throw new IllegalArgumentException("Invalid site visit ID");
        }
        // Load the JasperReport template
        String filePath = "C:\\Manipulus 7.0\\Manipulus\\Server\\src\\main\\resources\\template\\gatePass.jrxml";
        JasperReport jasperReport = JasperCompileManager.compileReport(filePath);


//        // Load the JasperReport template from the file
//        JasperReport jasperReport = (JasperReport) JRLoader.loadObject(new File("C:\\Manipulus 7.0\\Manipulus\\Server\\src\\main\\resources\\template\\gatePass.jrxml"));

        // Create a map of parameters to be passed to the report
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("sitVisitId", siteVisitId);
        parameters.put("scheduledDate", siteVisit.getScheduledDate());
        parameters.put("endDate", siteVisit.getDateRange());
        parameters.put("jobId",5656L );



        // Create an empty data source (since the report doesn't require any specific data source)
        //JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(siteVisits);

        // Fill the report with data and parameters
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

        // Export the filled report to a ByteArrayOutputStream
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        JasperExportManager.exportReportToPdfStream(jasperPrint, outputStream);

        return outputStream;
    }
//    public ByteArrayOutputStream generateReportBySiteVisitId(Long siteVisitId) throws JRException, IOException {
//        // Load the JasperReport template from the file
//        JasperReport jasperReport = (JasperReport) JRLoader.loadObject(new File("C:\\Manipulus 7.0\\Manipulus\\Server\\src\\main\\resources\\template\\gatePass.jrxml"));
//
//        // Create a map of parameters to be passed to the report
//        Map<String, Object> parameters = new HashMap<>();
//        parameters.put("sitVisitId", siteVisitId);
//        parameters.put("scheduledDate", scheduledDate);
//        parameters.put("endDate", endDate);
//        parameters.put("jobId", jobId);
//
//        // Create an empty data source (since the report doesn't require any specific data source)
//        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource();
//
//        // Fill the report with data and parameters
//        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
//
//        // Export the filled report to a ByteArrayOutputStream
//        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
//        JasperExportManager.exportReportToPdfStream(jasperPrint, outputStream);
//
//        return outputStream;
//    }


//    public void exportJasperReport(HttpServletResponse response) throws JRException  {
//
//        public void exportJasperReport(HttpServletResponse response) throws JRException, IOException {
////
//        //        String filePath = "C:\\Manipulus 7.0\\Manipulus\\Server\\src\\main\\resources\\template\\gatePass.jrxml";
//        List<SiteVisit>siteVisit=siteVisitRepo.findAll();
//        //Get File and Compile it
//        File file = ResourceUtils.getFile("classPath: GatePass.jrxml");
//        JasperReport jasperReport=JasperCompileManager.compileReport(file.getAbsolutePath());
//        JRBeanCollectionDataSource dataSource=new JRBeanCollectionDataSource(siteVisit);
//        Map <String , Object>parameters=new HashMap<>();
//        parameters.put("CreatedBy","Arctic AC");
//        //Fill report
//        JasperPrint jasperPrint=JasperFillManager.fillReport(jasperReport,parameters,dataSource);
//
//        JasperExportManager.exportReportToPdfStream(jasperPrint,response.getOutputStream());
//        //System.out.println("PDF Generated in path " + path);;
//
//    }
//    }
}