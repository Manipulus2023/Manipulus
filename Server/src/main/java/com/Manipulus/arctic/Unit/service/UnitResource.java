package com.Manipulus.arctic.Unit.service;

import com.Manipulus.arctic.Unit.model.Unit;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public class UnitResource {
    private final UnitService unitService;

    public UnitResource(UnitService unitService) {
        this.unitService = unitService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Unit>> getAllUnit() {
        List<Unit> units = unitService.findAllUnits();
        return new ResponseEntity<>(units, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Unit> getUnitById(@PathVariable("id") Long id) {
        Unit unit = unitService.findUnitById(id);
        return new ResponseEntity<>(unit, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Unit> addUnit(@RequestBody Unit unit) {
        Unit newUnit = unitService.addUnit(unit);
        return new ResponseEntity<>(newUnit, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Unit> updateUnit(@RequestBody Unit unit) {
        Unit updateUnit = unitService.updateUnit(unit);
        return new ResponseEntity<>(updateUnit, HttpStatus.CREATED);
    }


    @DeleteMapping("/delete/{id}")
    public void deleteUnit(@PathVariable("id") Long id) {
        unitService.deleteUnitById(id);
    }
}
