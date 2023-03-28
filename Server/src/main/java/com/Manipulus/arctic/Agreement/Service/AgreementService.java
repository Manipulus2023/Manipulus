package com.Manipulus.arctic.Agreement.Service;

import com.Manipulus.arctic.Agreement.DTO.AgreementDTO;
import com.Manipulus.arctic.Agreement.DTO.AgreementSaveDTO;
import com.Manipulus.arctic.Agreement.DTO.AgreementUpdateDTO;


import java.util.List;

public interface AgreementService {


    int addAgreement(AgreementSaveDTO agreementSaveDTO);


    List<AgreementDTO> getAllAgreement();

    String updateAgreements(AgreementUpdateDTO agreementUpdateDTO);

    boolean deleteAgreement(int id);
}
