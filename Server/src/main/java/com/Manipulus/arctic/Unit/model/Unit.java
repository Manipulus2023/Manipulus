package com.Manipulus.arctic.Unit.model;

import jakarta.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name="unit")
public class Unit implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(nullable = false,updatable = false)
    private long id;

    @Column(name = "unit_name")
    private String unit_name;

    @Column(name = "item_name")
    private String item_name;

    @Column(name = "indoor_serial")
    private String indoor_serial;

    @Column(name = "outdoor_serial")
    private String outdoor_serial;

    @Column(name = "commissioned_date")
    private LocalDate commissioned_date;

    @Column(name = "owner")
    private String owner;

    @Column(name = "installed_location")
    private String installed_location;

    @Column(name = "installed_name")
    private String installed_name;

    @Column(name = "installed_address")
    private String installed_address;

    @Column(name = "installed_parent_location")
    private String installed_parent_location;

    @Column(name = "warranty_period")
    private int warranty_period;

    @Column(name = "unit_price")
    private double unit_price;

    @Column(name = "status")
    private boolean status;

    @Column(name = "unit_image")
    private String unit_image;

    public String getVehicle_code() {

        return unit_code;
    }
    public void setVehicle_code(String vehicle_code) {

        this.unit_code = vehicle_code;
    }
    public Unit(){ }
    public Unit(
            String unit_name,
            String item_name,
            String indoor_serial,
            String outdoor_serial,
            LocalDate commissioned_date,
            String owner,
            String installed_location,
            String installed_name,
            String installed_address,
            String installed_parent_location,
            Integer warranty_period,
            Double unit_price,
            Boolean status,
            String unit_image
    )
    {
        this.unit_name = unit_name;
        this.item_name=item_name;
        this.indoor_serial=indoor_serial;
        this.outdoor_serial=outdoor_serial;
        this.commissioned_date=commissioned_date;
        this.owner=owner;
        this.installed_location=installed_location;
        this.installed_name=installed_name;
        this.installed_address=installed_address;
        this.installed_parent_location=installed_parent_location;
        this.warranty_period=warranty_period;
        this.unit_price=unit_price;
        this.status=status;
        this.unit_image = unit_image;
    }
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getUnit_name() {
        return unit_name;
    }
    public void setUnit_name(String unit_name) {
        this.unit_name = unit_name;
    }
    public String getUnit_image() {
        return unit_image;
    }
    public void setUnit_image(String unit_image) {
        this.unit_image = unit_image;
    }
    public String getUnit_() {
        return unit_manufacturer;
    }
    public void setUnit_manufacturer(String unit_manufacturer) {
        this.unit_manufacturer = unit_manufacturer;
    }
    public String getUnit_capacity() {
        return unit_capacity;
    }
    public void setUnit_capacity(String unit_capacity) {
        this.unit_capacity = unit_capacity;
    }
    public String getActive_state() {
        return active_state;
    }
    public void setActive_state(String active_state) {
        this.active_state = active_state;
    }
    @Override public String toString(){
        return "Unit{" + "id=" + id + "Unit_name=" + unit_name + "Unit_capacity=" + unit_capacity + "Unit_manufacturer="+ unit_manufacturer + "active_state="+active_state+ "Unit_code=" +unit_code + "Unit_image=" +unit_image + '}';
    }
    public void setUnit_code(String toString) { } }
