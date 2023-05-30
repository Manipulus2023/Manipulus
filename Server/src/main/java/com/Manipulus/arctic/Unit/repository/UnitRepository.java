package com.Manipulus.arctic.Unit.repository;

import com.Manipulus.arctic.Unit.model.Unit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UnitRepository extends JpaRepository<Unit,Long> {

    void deleteUnitById(long id);

    Optional<Object> findUnitById(Long id);
}
