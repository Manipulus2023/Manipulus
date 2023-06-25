package com.Manipulus.arctic.location.repository;

import com.Manipulus.arctic.location.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface locationRepository extends JpaRepository<Location, Long> {
//    List<location> findByLocation_customerId(Long id);
    Optional<Location> findLocationById(Long id);

    @Query("SELECT l.id FROM Location l WHERE l.location_customer.id = :customerId")
    List<Long> findLocationIdsByCustomerId(@Param("customerId") Long customerId);

}