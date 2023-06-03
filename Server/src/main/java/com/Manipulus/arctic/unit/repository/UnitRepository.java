package com.Manipulus.arctic.unit.repository;

import com.Manipulus.arctic.unit.model.Unit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UnitRepository extends JpaRepository<Unit,Long> {

    void deleteUnitById(Long id);


    Optional<Unit> findUnitById(Long id);
}
