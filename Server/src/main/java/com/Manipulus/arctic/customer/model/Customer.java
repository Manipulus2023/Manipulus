package com.Manipulus.arctic.customer.model;

import jakarta.persistence.*;
import java.io.Serializable;

// Define the Customer Entity and map it to the 'customers' table in the database
@Entity
@Table(name = "customers")
public class Customer implements Serializable {
    // Define the Customer's ID as the primary key and auto-generate it
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private long id;
    // Define the Customer's NIC number
    @Column(name = "nic_number")
    private String nic_number;
    // Define the Customer's name
    @Column(name = "customer_name")
    private String name;
    // Define the Customer's contact number
    @Column(name = "contact_number")
    private int contactNumber;
    // Define the Customer's address
    @Column(name = "address")
    private String address;
    // Define the contact person's name for the Customer
    @Column(name = "contact_person_name")
    private String contactPersonName;
    // Define the contact person's designation for the Customer
    @Column(name = "designation")
    private String designation;
    // Define the Customer's email address
    @Column(name = "email")
    private String email;
    // Define the Customer's code, which cannot be null and is unchangeable once set
    @Column(nullable = false, updatable = false)
    private String customerCode;

    // Define the Customer's default constructor
    public Customer() {
    }

    // Define the Customer's constructor with all properties
    public Customer(String nic_number, String name, int contactNumber, String address, String contactPersonName,
            String designation, String email, String customerCode) {
        this.nic_number = nic_number;
        this.name = name;
        this.customerCode = customerCode;
        this.contactNumber = contactNumber;
        this.address = address;
        this.contactPersonName = contactPersonName;
        this.designation = designation;
        this.email = email;
    }

    // Define the getter and setter methods
    public String getCustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
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

    // Overrides the default toString() method to return a string representation of
    // this Customer object
    @Override
    public String toString() {
        return "Customer{" +
                "id=" + id +
                "nic_number=" + nic_number +
                "name=" + name +
                "contactNumber=" + contactNumber +
                "address=" + address +
                "contactPersonName=" + contactPersonName +
                "designation=" + designation +
                "email=" + email +
                '}';

    }

}
