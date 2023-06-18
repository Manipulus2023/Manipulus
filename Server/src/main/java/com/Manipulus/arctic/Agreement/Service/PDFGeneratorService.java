package com.Manipulus.arctic.Agreement.Service;

import com.Manipulus.arctic.Agreement.DTO.AgreementDTO;
import com.Manipulus.arctic.Agreement.DTO.PdfDTO;
import com.Manipulus.arctic.customer.model.Customer;
import com.Manipulus.arctic.customer.service.CustomerService;
import com.lowagie.text.*;
import com.lowagie.text.Image;
import com.lowagie.text.Font;
import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletResponse;
import java.awt.*;
import java.io.IOException;
import java.util.List;

@Service
public class PDFGeneratorService {

    @Autowired
    private com.Manipulus.arctic.Agreement.Service.AgreementService agreementService;

    @Autowired
    private CustomerService customerService;

    public int Id;

    public PdfDTO passId(PdfDTO pdfDTO) {
        Id = pdfDTO.agreementid;
        return pdfDTO;
    }

    public void export(HttpServletResponse response) throws IOException, DocumentException {
        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, response.getOutputStream());
        document.open();

        // Add the image
        Image img = Image.getInstance("src/main/resources/Images/companyLogo.jpg");
        img.setAlignment(Image.ALIGN_CENTER);
        img.scaleToFit(100, 100); // scale the image to fit the page width and height
        document.add(img);

        Font clientName = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        clientName.setSize(20);

        Paragraph name = new Paragraph("Arctic - PvtLtd",
                FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20, Color.BLUE));
        name.setAlignment(Paragraph.ALIGN_CENTER);

        document.add(name);

        Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        fontTitle.setSize(18);

        Paragraph title = new Paragraph("Service Agreement\n",
                FontFactory.getFont(FontFactory.COURIER, 18, Font.UNDERLINE));
        title.setAlignment(Paragraph.ALIGN_CENTER);

        document.add(title);

        List<AgreementDTO> agreements = agreementService.getAllAgreement();
        List<Customer> customers = customerService.findAllCustomers();

        for (AgreementDTO agreement : agreements) {
            if (agreement.getAgreementid() == Id) {
                for (Customer customer : customers) {
                    if (customer.getNic_number().equals(agreement.getNIC())) {
                        // Add customer details section with border
                        PdfPTable customerTable = new PdfPTable(2);
                        customerTable.setWidthPercentage(100);
                        customerTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);

                        PdfPCell cell = new PdfPCell(
                                new Phrase("\n\nCustomer Details\n",
                                        FontFactory.getFont(FontFactory.HELVETICA, 14, Font.UNDERLINE, Color.BLUE)));
                        cell.setBorder(Rectangle.NO_BORDER);
                        cell.setColspan(2);
                        customerTable.addCell(cell);

                        customerTable.addCell("Customer Name:  ");
                        customerTable.addCell(customer.getName());
                        customerTable.addCell("Address:  ");
                        customerTable.addCell(customer.getAddress());
                        customerTable.addCell("Contact Number:  ");
                        customerTable.addCell("0" + customer.getContactNumber());
                        customerTable.addCell("E-mail:  ");
                        customerTable.addCell(customer.getEmail());
                        customerTable.addCell("NIC:  ");
                        customerTable.addCell(customer.getNic_number());

                        document.add(customerTable);
                    }
                }

                // Add agreement details section with border
                PdfPTable agreementTable = new PdfPTable(2);
                agreementTable.setWidthPercentage(100);
                agreementTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);

                PdfPCell cell = new PdfPCell(
                        new Phrase("\n\nAgreement Details\n",
                                FontFactory.getFont(FontFactory.HELVETICA, 14, Font.UNDERLINE, Color.BLUE)));
                cell.setBorder(Rectangle.NO_BORDER);
                cell.setColspan(2);
                agreementTable.addCell(cell);

                agreementTable.addCell("Agreement ID: ");
                agreementTable.addCell(String.valueOf(agreement.getAgreementid()));
                agreementTable.addCell("Unit ID: ");
                agreementTable.addCell(String.valueOf(agreement.getUnitid()));
                agreementTable.addCell("Item Name: ");
                agreementTable.addCell(agreement.getItem());
                agreementTable.addCell("Price per Service: ");
                agreementTable.addCell(String.valueOf(agreement.getPrice_per_service()));
                agreementTable.addCell("Emergency Service Rate: ");
                agreementTable.addCell(String.valueOf(agreement.getEmergency_service_rate()));
                agreementTable.addCell("Type of the Service: ");
                agreementTable.addCell(agreement.getType_of_the_service());
                agreementTable.addCell("Initiated Date: ");
                agreementTable.addCell(agreement.getInitiated_date());
                agreementTable.addCell("Expired Date: ");
                agreementTable.addCell(agreement.getExpired_date());
                agreementTable.addCell("Description: ");
                agreementTable.addCell(agreement.getEquipment());

                document.add(agreementTable);

                Paragraph lineSpace = new Paragraph("\n\n");
                document.add(lineSpace);

                Paragraph t1 = new Paragraph("TERMS and CONDITIONS\n",
                        FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14, Font.UNDERLINE));
                t1.setAlignment(Paragraph.ALIGN_CENTER);

                document.add(t1);

                Paragraph t2 = new Paragraph(
                        "\nBy selecting services included in Arctic - PvtLtd " + agreement.getType_of_the_service()
                                + " Maintenance Contract, the customer agrees to the following terms and conditions:\n"
                                + "1. All Contracts are subject to Company Name inspection and approval of the customer's heating and/or air conditioning equipment as suitable for inclusion under this Contract.\n"
                                + "2. The effective period of this Contract shall be from " + agreement.getInitiated_date()
                                + " to " + agreement.getExpired_date()
                                + ", commencing from the 1 st of the month of the date of subscription (must be paid in full).",
                        FontFactory.getFont(FontFactory.HELVETICA, 10));
                // t2.setAlignment(Paragraph.ALIGN_CENTER);

                document.add(t2);
                Paragraph lineSpace1 = new Paragraph("\n");
                document.add(lineSpace1);

                Paragraph Sign = new Paragraph(
                        "Manager Signature: ...................\t\t\t\t\t\t\t\t\tCustomer Signature: ...................",
                        FontFactory.getFont(FontFactory.COURIER_BOLD, 10));
                Sign.setAlignment(Paragraph.ALIGN_LEFT);
                document.add(Sign);

                Paragraph Dates = new Paragraph(
                        "Date: .........../..../....\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tDate: .........../..../....",
                        FontFactory.getFont(FontFactory.COURIER_BOLD, 10));
                Dates.setAlignment(Paragraph.ALIGN_LEFT);
                document.add(Dates);
            }
        }

        document.close();
    }
}
