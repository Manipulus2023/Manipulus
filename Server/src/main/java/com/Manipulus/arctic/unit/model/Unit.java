package com.Manipulus.arctic.unit.model;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name="units")
public class Unit implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false,updatable = false)
    private long id;

    @Column(name = "unit_name" )
    private String unit_name;

    @Column(name = "item_name" )
    private String item_name;

    @Column(name = "indoor_serial" )
    private String indoor_serial;

    @Column(name = "outdoor_serial" )
    private String outdoor_serial;

    @Column(name = "commissioned_date" )
    private String commissioned_date;

    @Column(name = "owner" )
    private String owner;

    @Column(name = "installed_location_name" )
    private String installed_location_name;

    @Column(name = "installed_location_address" )
    private String installed_location_address;

    @Column(name = "installed_parent_location" )
    private String installed_parent_location;

    @Column(name = "warranty_period" )
    private String warranty_period;

    @Column(name = "unit_price" )
    private String unit_price;

    @Column(name = "status" )
    private String status;

    @Column(nullable = false,updatable = false)
    private String unitCode;

    public String getUnitCode() {

        return unitCode;
    }

    public void setUnitCode(String unitCode) {
        this.unitCode = unitCode;
    }

    public Unit(){

    }

    public Unit(String unit_name,String item_name,String indoor_serial,String outdoor_serial, String commissioned_date,String owner,String installed_location_address,String installed_location_name,String installed_parent_location,String warranty_period,String unit_price,String status)
    {
        this.unit_name=unit_name;
        this.item_name=item_name;
        this.indoor_serial=indoor_serial;
        this.outdoor_serial=outdoor_serial;
        this.commissioned_date=commissioned_date;
        this.owner=owner;
        this.installed_location_name=installed_location_name;
        this.installed_location_address=installed_location_address;
        this.installed_parent_location=installed_parent_location;
        this.warranty_period=warranty_period;
        this.unit_price=unit_price;
        this.status=status;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getItem_name() {
        return item_name;
    }

    public void setItem_name(String item_name) {
        this.item_name = item_name;
    }

    public String getIndoor_serial() {
        return indoor_serial;
    }

    public void setIndoor_serial(String indoor_serial) {
        this.indoor_serial = indoor_serial;
    }

    public String getOutdoor_serial() {
        return outdoor_serial;
    }

    public void setOutdoor_serial(String outdoor_serial) {
        this.outdoor_serial = outdoor_serial;
    }

    public String getCommissioned_date() {
        return commissioned_date;
    }

    public void setCommissioned_date(String commissioned_date) {
        this.commissioned_date = commissioned_date;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getInstalled_location_name() {
        return installed_location_name;
    }

    public void setInstalled_location_name(String installed_location_name) {
        this.installed_location_name = installed_location_name;
    }

    public String getInstalled_location_address() {
        return installed_location_address;
    }

    public void setInstalled_location_address(String installed_location_address) {
        this.installed_location_address = installed_location_address;
    }

    public String getInstalled_parent_location() {
        return installed_parent_location;
    }

    public void setInstalled_parent_location(String installed_parent_location) {
        this.installed_parent_location = installed_parent_location;
    }

    public String getWarranty_period() {
        return warranty_period;
    }

    public void setWarranty_period(String warranty_period) {
        this.warranty_period = warranty_period;
    }

    public String getUnit_price() {
        return unit_price;
    }

    public void setUnit_price(String unit_price) {
        this.unit_price = unit_price;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString(){
        return "Unit{"+
                "id="+id+
                "unitName"+unit_name +
                "itemName"+item_name+
                "indoorSerial"+indoor_serial+
                "outdoorSerial"+outdoor_serial+
                "commissionedDate"+commissioned_date+
                "owner"+owner+
                "installedLocationName"+installed_location_name+
                "installedLocationAddress"+installed_location_address+
                "installedParentLocation"+installed_parent_location+
                "warrantyPeriod"+warranty_period+
                "unitPrice"+unit_price+
                "status"+status+
                '}';

    }
}
