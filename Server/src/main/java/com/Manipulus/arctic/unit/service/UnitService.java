package com.Manipulus.arctic.unit.service;

import com.Manipulus.arctic.unit.exception.UnitNotFoundException;
import com.Manipulus.arctic.unit.model.Unit;
import com.Manipulus.arctic.unit.model.UnitRequest;
import com.Manipulus.arctic.unit.model.UnitResponse;
import com.Manipulus.arctic.unit.repository.IUnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;


@Service
public class UnitService {

    private final IUnitRepository unitRepository;


    @Autowired
    public UnitService(IUnitRepository unitRepository) {
        this.unitRepository = unitRepository;
    }

    public Unit addUnit(Unit unit){
        return unitRepository.save(unit);
    }

    public List<Unit> getUnits(){
        return unitRepository.findAll();
    }
    public Unit updateUnit(int id, Unit unit){
        return unitRepository.save(unit);
    }
    public Unit findUnitById(int id){
        return unitRepository.findById(id)
                .orElseThrow(()-> new UnitNotFoundException(" unit by id"+ id + "was not found"));
    }

    public UnitResponse updateUnit(int id, UnitRequest unit){
        Unit existingUnit=findUnitById(id);
        if(existingUnit != null) {

            existingUnit.setUnit_name(unit.unit_name);
            existingUnit.setItem_name(unit.item_name);
            existingUnit.setIndoor_serial(unit.indoor_serial);
            existingUnit.setOutdoor_serial(unit.outdoor_serial);
            existingUnit.setCommissioned_date(unit.commissioned_date);
            existingUnit.setOwner(unit.owner);
            existingUnit.setInstalled_location_name(unit.installed_location_name);
            existingUnit.setInstalled_location_address(unit.installed_location_address);
            existingUnit.setInstalled_parent_location(unit.installed_parent_location);
            existingUnit.setWarranty_period(unit.warranty_period);
            existingUnit.setUnit_price(unit.unit_price);
            existingUnit.setStatus(unit.status);

            Unit updatedUnit = unitRepository.save(existingUnit);
            UnitResponse response = updatedUnit.UnitResponseMapper(updatedUnit.getUnit_name(),updatedUnit.getItem_name(),updatedUnit.getIndoor_serial(),updatedUnit.getOutdoor_serial(),updatedUnit.getCommissioned_date(),updatedUnit.getOwner(),updatedUnit.getInstalled_location_name(),updatedUnit.getInstalled_location_address(),updatedUnit.getInstalled_parent_location(),updatedUnit.getWarranty_period(),updatedUnit.getUnit_price(),updatedUnit.getStatus());
            return response;
        }
        throw new UnitNotFoundException(" unit by id"+ id + "was not found");
    }


    @Transactional
    public void deleteUnitById(int id){
        Optional<Unit> existingUnit = unitRepository.findById(id);
        if (existingUnit != null) {
            unitRepository.deleteById(id);
        }

    }




}