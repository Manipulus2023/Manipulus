package com.Manipulus.arctic.siteVisit;

import com.Manipulus.arctic.siteVisit.service.SiteVisitService;
import com.Manipulus.arctic.siteVisit.siteVisit.SiteVisit;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/siteVisit")
public class SiteVisitResource {

        private SiteVisitService siteVisitService ;


        public SiteVisitResource(com.Manipulus.arctic.siteVisit.service.SiteVisitService SiteVisitService) {
            this.siteVisitService = SiteVisitService;
        }
        @GetMapping("/all")
        public ResponseEntity<List<SiteVisit>> getAllSiteVisits(){
            List<SiteVisit>siteVisits=siteVisitService.findAllSiteVisits();
            return new ResponseEntity<>(siteVisits, HttpStatus.OK);
        }
        @GetMapping("/find/{siteVisitId}")
        public ResponseEntity<SiteVisit>getSiteVisitById(@PathVariable("siteVisitId") Long siteVisitId){
            SiteVisit siteVisit=siteVisitService.findSiteVisitBySiteVisitId(siteVisitId);
            return new ResponseEntity<>(siteVisit, HttpStatus.OK);

        }
        @PostMapping("/add")
        public ResponseEntity<SiteVisit>addSiteVisit(@RequestBody SiteVisit siteVisit){
            SiteVisit newSiteVisit= siteVisitService.addSiteVisit(siteVisit);
            return new ResponseEntity<>(newSiteVisit, HttpStatus.CREATED);
        }
        @PutMapping("/update")
        public ResponseEntity<SiteVisit>updateSiteVisit(@RequestBody SiteVisit siteVisit){
            SiteVisit updateSiteVisit=siteVisitService.updateSiteVisit(siteVisit);
            return new ResponseEntity<>(updateSiteVisit, HttpStatus.OK);
        }
        @DeleteMapping ("/delete/{siteVisitId}")
        public ResponseEntity<?> deleteSiteVisit(@PathVariable("siteVisitId")Long siteVisitId){
            siteVisitService.deleteSiteVisit(siteVisitId);
            return new ResponseEntity<>(HttpStatus.OK);
        }



    }

