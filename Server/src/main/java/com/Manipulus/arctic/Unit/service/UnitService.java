package com.Manipulus.arctic.Unit.service;

import com.Manipulus.arctic.Unit.excepion.UnitNotFoundException;
import com.Manipulus.arctic.Unit.model.Unit;
import com.Manipulus.arctic.Unit.repository.UnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class UnitService {
    private final com.Manipulus.arctic.Unit.repository.UnitRepository UnitRepository;

    @Autowired
    public UnitService(com.Manipulus.arctic.Unit.repository.UnitRepository unitRepository ) {
        this.UnitRepository= unitRepository;
    }

    public Unit addUnit(Unit unit){
        unit.setUnit_code(UUID.randomUUID().toString());
        return UnitRepository.save(unit);
    }

    public List<Unit> findAllUnits(){
        return UnitRepository.findAll();
    }
    public Unit updateUnit(Unit unit){
        return UnitRepository.save(unit);
    }
    public Unit findUnitById(Long id){

        return (Unit) UnitRepository.findUnitById(id)
                .orElseThrow(()-> new UnitNotFoundException(" unit by id"+ id + "was not found"));
    }

    @Transactional
    public void deleteUnitById(Long id){
        UnitRepository.deleteUnitById(id);
    }
}
