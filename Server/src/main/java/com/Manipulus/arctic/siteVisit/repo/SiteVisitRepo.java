package com.Manipulus.arctic.siteVisit.repo;

import com.Manipulus.arctic.siteVisit.siteVisit.SiteVisit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SiteVisitRepo extends JpaRepository<SiteVisit, Long>{


        Optional<SiteVisit> findSiteVisitBySiteVisitId(Long siteVisitId);

        void deleteSiteVisitBySiteVisitId(Long siteVisitId);


    }



