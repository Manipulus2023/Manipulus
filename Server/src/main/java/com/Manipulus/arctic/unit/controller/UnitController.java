package com.Manipulus.arctic.unit.controller;

import com.Manipulus.arctic.unit.model.Unit;
import com.Manipulus.arctic.unit.service.UnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public class UnitController {

    @Autowired
    private UnitService unitService;

    @PostMapping
    public Unit addUnit(@RequestBody Unit unit) {
        return unitService.addUnit(unit);
    }

    @GetMapping
    public List<Unit> findAllUnits() {
        return unitService.findAllUnits();
    }

    @GetMapping("/{id}")
    public Unit findUnitById(@PathVariable("id") Long id) {
        return unitService.findUnitById(id);
    }

    @PutMapping("/{id}")
    public Unit updateUnit(@PathVariable("id") Long id, @RequestBody Unit unit) {
        return unitService.updateUnit(id, unit);
    }

    @DeleteMapping("/{id}")
    public void deleteUnitById(@PathVariable("id") Long id) {
        unitService.deleteUnitById(id);
    }


}
