package com.Manipulus.arctic.siteVisit.rest;

import com.Manipulus.arctic.siteVisit.siteVisit.SiteVisit;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@RequestMapping(path="/siteVisit")
public interface SiteVisitRest {

@PostMapping(path = "/generateReport")
    ResponseEntity<String> generateReport(@RequestBody Map<String,Object>requestMap);


}
