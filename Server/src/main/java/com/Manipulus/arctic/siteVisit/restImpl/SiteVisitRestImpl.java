package com.Manipulus.arctic.siteVisit.restImpl;

import com.Manipulus.arctic.siteVisit.constents.ManipulusConstants;
import com.Manipulus.arctic.siteVisit.rest.SiteVisitRest;
import com.Manipulus.arctic.siteVisit.service.SiteVisitService;
import com.Manipulus.arctic.siteVisit.utils.ManipulusUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class SiteVisitRestImpl implements SiteVisitRest {

@Autowired
SiteVisitService siteVisitService;

    @Override
    public ResponseEntity<String> generateReport(Map<String, Object> requestMap) {
      try {
        return siteVisitService.generateReport(requestMap);
      }catch (Exception ex ){
          ex.printStackTrace();
      }
        return ManipulusUtils.getResponsesEntity(ManipulusConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
