package com.Manipulus.arctic.Item.model;
import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "item")
public class Item implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false,updatable = false)
    private long id;

    @Column(name = "item_name")
    private String item_name;

    @Column(name = "item_capacity")
    private String item_capacity;

    @Column(name = "item_manufacturer")
    private String item_manufacturer;

    @Column(name = "active_state")
    private String active_state;

    public Item(){

    }
    public Item(String item_name, String item_capacity, String item_manufacturer, String active_state, String item_code, String item_image) {
        this.item_name = item_name;
        this.item_capacity = item_capacity;
        this.item_manufacturer = item_manufacturer;
        this.active_state = active_state;
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

    public String getItem_manufacturer() {
        return item_manufacturer;
    }

    public void setItem_manufacturer(String item_manufacturer) {
        this.item_manufacturer = item_manufacturer;
    }

    public String getItem_capacity() {
        return item_capacity;
    }

    public void setItem_capacity(String item_capacity) {this.item_capacity = item_capacity;
    }

    public String getActive_state() {
        return active_state;
    }

    public void setActive_state(String active_state) {
        this.active_state = active_state;
    }



        @Override
        public String toString(){
            return "Item{" +
                    "id=" + id +
                    "item_name=" + item_name +
                    "item_capacity=" +item_capacity +
                    "item_manufacturer="+ item_manufacturer +
                    "active_state="+active_state+
                    '}';

    }

    public void setItem_code(String toString) {
    }
}

