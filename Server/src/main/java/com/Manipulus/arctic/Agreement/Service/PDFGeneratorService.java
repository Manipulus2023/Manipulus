package com.Manipulus.arctic.Agreement.Service;


import com.Manipulus.arctic.Agreement.DTO.AgreementDTO;
import com.Manipulus.arctic.Agreement.DTO.AgreementSaveDTO;
import com.Manipulus.arctic.Agreement.controller.AgreementController;
import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletResponse;
import java.awt.*;
import java.io.IOException;
import java.util.List;

@Service
public class PDFGeneratorService {

    AgreementSaveDTO agreementSaveDTO=new AgreementSaveDTO();
    AgreementController agreementController=new AgreementController();
    @Autowired
    private com.Manipulus.arctic.Agreement.Service.AgreementService agreementService;


    public void export(HttpServletResponse response) throws IOException, DocumentException {
        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, response.getOutputStream());

        document.open();

        Font clientName = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        clientName.setSize(20);

        Paragraph name = new Paragraph("Arctic - PvtLtd", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20, Color.blue));
        name.setAlignment(Paragraph.ALIGN_CENTER);

        document.add(name);

        Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        fontTitle.setSize(18);

        Paragraph title = new Paragraph("Service Agreement", FontFactory.getFont(FontFactory.COURIER, 18, Font.UNDERLINE));
        title.setAlignment(Paragraph.ALIGN_CENTER);

        document.add(title);

        List<AgreementDTO> agreements = agreementService.getAllAgreement();

        for (AgreementDTO agreement : agreements) {
            if(agreement.getUnitid()==103) {
                Paragraph agreementParagraph = new Paragraph("");
                agreementParagraph.add(new Paragraph(" "));
                agreementParagraph.add(new Paragraph("Agreement ID: " + agreement.getAgreementid()));
                agreementParagraph.add(new Paragraph(" "));
                agreementParagraph.add(new Paragraph("Unit ID: " + agreement.getUnitid()));
                agreementParagraph.add(new Paragraph(" "));
                agreementParagraph.add(new Paragraph("Equipment: " + agreement.getEquipment()));
                agreementParagraph.add(new Paragraph(" "));
                agreementParagraph.add(new Paragraph("Price per Service: " + agreement.getPrice_per_service()));
                agreementParagraph.add(new Paragraph(" "));
                agreementParagraph.add(new Paragraph("Emergency Service Rate: " + agreement.getEmergency_service_rate()));
                agreementParagraph.add(new Paragraph(" "));
                agreementParagraph.add(new Paragraph("Type of the Service: " + agreement.getType_of_the_service()));
                agreementParagraph.add(new Paragraph(" "));
                agreementParagraph.add(new Paragraph("Initiated Date: " + agreement.getInitiated_date()));
                agreementParagraph.add(new Paragraph(" "));
                agreementParagraph.add(new Paragraph("Expired Date: " + agreement.getExpired_date()));
                agreementParagraph.add(new Paragraph(" "));

                document.add(agreementParagraph);
            }
        }

        document.close();
    }

}