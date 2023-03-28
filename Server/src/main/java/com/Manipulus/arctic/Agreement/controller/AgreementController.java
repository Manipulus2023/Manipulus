package com.Manipulus.arctic.Agreement.controller;


import com.Manipulus.arctic.Agreement.DTO.AgreementDTO;
import com.Manipulus.arctic.Agreement.DTO.AgreementSaveDTO;
import com.Manipulus.arctic.Agreement.DTO.AgreementUpdateDTO;
import com.Manipulus.arctic.Agreement.Service.AgreementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/v1/agreement")

public class AgreementController {

    @Autowired
    private AgreementService agreementService;




    @PostMapping(path="/save")
    public int saveAgreement(@RequestBody AgreementSaveDTO agreementSaveDTO)
    {
        int id = agreementService.addAgreement(agreementSaveDTO);
        return id;
    }

    @GetMapping(path="/getAllAgreement")
    public List<AgreementDTO> getAllAgreement()
    {
        List<AgreementDTO>allAgreements = agreementService.getAllAgreement();
        return allAgreements;
    }

    @PutMapping(path="/update")
    public String updateAgreement(@RequestBody AgreementUpdateDTO agreementUpdateDTO)
    {
        String id = agreementService.updateAgreements(agreementUpdateDTO);
        return id;
    }

    @DeleteMapping(path="/deleteagreement/{id}")
    public String deleteAgreement(@PathVariable(value = "id")int id)
    {
        boolean deleteagreement = agreementService.deleteAgreement(id);
        return "deleted";
    }


}
