package com.Manipulus.arctic.customer.model;


import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "customers")
public class Customer implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false,updatable = false)
    private long id;

    @Column(name = "nic_number" )
    private String nic_number;

    @Column(name = "customer_name")
    private String name;

    @Column(name = "contact_number")
    private int contactNumber;

    @Column(name = "address")
    private String address;

    @Column(name = "contact_person_name")
    private String contactPersonName;

    @Column(name = "designation")
    private String designation;

    @Column(name = "email")
    private String email;

    @Column(nullable = false,updatable = false)
    private String customerCode;

    public String getCustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }

    public Customer(){

    }
    public Customer(String nic_number, String name, int contactNumber, String address, String contactPersonName, String designation, String email,String customerCode) {
        this.nic_number = nic_number;
        this.name = name;
        this.customerCode =customerCode;
        this.contactNumber = contactNumber;
        this.address = address;
        this.contactPersonName = contactPersonName;
        this.designation = designation;
        this.email = email;
    }

    public String getNic_number() {
        return nic_number;
    }

    public void setNic_number(String nic) {
        this.nic_number = nic;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(int contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContactPersonName() {
        return contactPersonName;
    }

    public void setContactPersonName(String contactPersonName) {
        this.contactPersonName = contactPersonName;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString(){
        return "Customer{" +
                "id=" + id +
                "nic_number=" + nic_number +
                "name=" +name +
                "contactNumber=" +contactNumber +
                "address="+ address +
                "contactPersonName="+contactPersonName+
                "designation="+ designation +
                "email="+email+
                '}';

    }


}

