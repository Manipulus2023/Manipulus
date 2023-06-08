package com.Manipulus.arctic.siteVisit.serviceImpl;

import com.Manipulus.arctic.siteVisit.constants.ManipulusConstants;
import com.Manipulus.arctic.siteVisit.repo.SiteVisitRepo;
import com.Manipulus.arctic.siteVisit.service.SiteVisitService;
import com.Manipulus.arctic.siteVisit.siteVisit.SiteVisit;
import com.Manipulus.arctic.siteVisit.utils.ManipulusUtils;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.tuple.UpdateTimestampGeneration;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.StreamCorruptedException;
import java.util.Date;
import java.util.Map;
import java.util.stream.Stream;

@Slf4j
@Service
public class SiteVisitServiceImpl implements SiteVisitService {


    @Autowired SiteVisitRepo siteVisitRepo;

    @Override
    public ResponseEntity<String> generateReport(Map<String, Object> requestMap) {
        log.info("Inside generateReport");
        try {
            String fileName;
            if (validateRequestMap(requestMap)) {
                if (requestMap.containsKey("isGenerate") && !(Boolean) requestMap.get("isGenerate")) {
                    fileName = (String) requestMap.get("uuid");
                } else {
                    fileName = ManipulusUtils.getUUID();
                    requestMap.put("uuid", fileName);
                    insertSiteVisit(requestMap);

                }

                String data = "SiteVisitId: " + requestMap.get("siteVisitId") +
                        "\n" + "ScheduledDate : " + requestMap.get("scheduledDate") +
                        "\n" + "DateRange" + requestMap.get("dateRange");

                Document document = new Document();
                PdfWriter.getInstance(document, new FileOutputStream(ManipulusConstants.STORE_LOCATION + "\\" + fileName + ".pdf"));

                document.open();
                setRectanglePdf(document);

                Paragraph chunk = new Paragraph("Gate Pass Arctic (Pvt) Ltd", getFont("Header"));
                chunk.setAlignment(Element.ALIGN_CENTER);
                document.add(chunk);

                Paragraph paragraph = new Paragraph(data + "\n \n", getFont("Data"));
                document.add(paragraph);

                PdfPTable table = new PdfPTable(3);
                table.setWidthPercentage(100);
                addTableHeader(table);

                JSONArray jsonArray = ManipulusUtils.getJsonArrayFromString((String) requestMap.get("assignedVehicle"));
                for (int i = 0; i <= jsonArray.length(); i++) {
                    addRows(table, ManipulusUtils.getMapFromJSON(jsonArray.getString(i)));

                }
                document.add(table);

                document.close();
                return new ResponseEntity<>("{\"uuid\":\"" + fileName + "\"}", HttpStatus.OK);

            }
            return ManipulusUtils.getResponsesEntity("Required data not found.", HttpStatus.BAD_REQUEST);

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return ManipulusUtils.getResponsesEntity(ManipulusConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    private void addRows(PdfPTable table, Map<String, Object> data) {
        log.info("Inside addRows");
        table.addCell((String) data.get("vehicle_name"));
        table.addCell((String) data.get("vehicle_number"));
        table.addCell((String) data.get("number_of_passenger"));
    }

    private void addTableHeader(PdfPTable table) {
        log.info("Inside addTableHeader");
        Stream.of("Name","Vehicle Number","Number of Passengers")
                .forEach(columnTitle-> {
                    PdfPCell header=new PdfPCell();
                    header.setBackgroundColor(BaseColor.LIGHT_GRAY);
                    header.setBorderWidth(2);
                    header.setPhrase(new Phrase(columnTitle));
                    header.setBackgroundColor(BaseColor.YELLOW);
                    header.setHorizontalAlignment(Element.ALIGN_CENTER);
                    header.setVerticalAlignment(Element.ALIGN_CENTER);
                    table.addCell(header);
                });

    }

    private Font getFont(String type) {
        log.info("Inside getFont");
        switch (type){
            case "Header":
                Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLDOBLIQUE,18,BaseColor.BLUE);
                headerFont.setStyle(Font.BOLD);
                return headerFont;

            case "Data":
                Font dataFont = FontFactory.getFont(FontFactory.TIMES_ROMAN,11,BaseColor.BLACK);
                dataFont.setStyle(Font.BOLD);
                return dataFont;
            default:
                return new Font();
        }
    }

    private void setRectanglePdf(Document document) throws DocumentException {
        log.info("Inside setRectangleInPdf");
        Rectangle rect = new Rectangle(577,825,18,15);
        rect.enableBorderSide(1);
        rect.enableBorderSide(2);
        rect.enableBorderSide(4);
        rect.enableBorderSide(81);
        rect.setBorderColor(BaseColor.BLACK);
        rect.setBorderWidth(1);
        document.add(rect);
    }

    private void insertSiteVisit(Map<String, Object> requestMap) {
        try {
            SiteVisit siteVisit=new SiteVisit();
            siteVisit.setUuid((String) requestMap.get("uuid"));
            siteVisit.setScheduledDate((Date) requestMap.get("scheduledDate"));
            siteVisit.setStartSiteVisit((Boolean) requestMap.get("startSiteVisit"));
            siteVisit.setAssignedVehicle((String) requestMap.get("assignedVehicle"));
            siteVisit.setTeamDetails((String) requestMap.get("teamDetails"));
            siteVisit.setDateRange((Date) requestMap.get("dateRange"));
            siteVisit.setState((String) requestMap.get("state"));
            siteVisit.setJobDetails((String) requestMap.get("jobDetails"));
            siteVisitRepo.save(siteVisit);


        }catch (Exception ex){
            ex.printStackTrace();
        }
    }

    private boolean validateRequestMap(Map<String, Object> requestMap) {
        return requestMap.containsKey("siteVisitId") &&
                requestMap.containsKey("scheduledDate") &&
                requestMap.containsKey("teamDetails") &&
                requestMap.containsKey("assignedVehicle") &&
                requestMap.containsKey("startSiteVisit") &&
                requestMap.containsKey("dateRange")&&
                requestMap.containsKey("state")&&
                requestMap.containsKey("jobDetails");


    }
}
