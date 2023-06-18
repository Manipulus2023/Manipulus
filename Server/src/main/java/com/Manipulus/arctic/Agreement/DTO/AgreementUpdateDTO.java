package com.Manipulus.arctic.Agreement.DTO;

public class AgreementUpdateDTO {
    private int agreementid;
    private int unitid;

    private String item;
    private String equipment;
    private float price_per_service;
    private float emergency_service_rate;
    private String type_of_the_service;
    private String initiated_date;
    private String expired_date;
    private String NIC;


    public AgreementUpdateDTO(int agreementid, String item,int unitid, String equipment, float price_per_service, float emergency_service_rate, String type_of_the_service, String initiated_date, String expired_date,String NIC) {
        this.agreementid = agreementid;
        this.unitid = unitid;
        this.item=item;
        this.equipment = equipment;
        this.price_per_service = price_per_service;
        this.emergency_service_rate = emergency_service_rate;
        this.type_of_the_service = type_of_the_service;
        this.initiated_date = initiated_date;
        this.expired_date = expired_date;
        this.NIC=NIC;
    }

    public AgreementUpdateDTO() {
    }

    public String getNIC() {
        return NIC;
    }

    public void setNIC(String NIC) {
        this.NIC = NIC;
    }


    public int getAgreementid() {
        return agreementid;
    }

    public void setAgreementid(int agreementid) {
        this.agreementid = agreementid;
    }

    public int getUnitid() {
        return unitid;
    }

    public void setUnitid(int unitid) {
        this.unitid = unitid;
    }

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public String getEquipment() {
        return equipment;
    }

    public void setEquipment(String equipment) {
        this.equipment = equipment;
    }

    public float getPrice_per_service() {
        return price_per_service;
    }

    public void setPrice_per_service(float price_per_service) {
        this.price_per_service = price_per_service;
    }

    public float getEmergency_service_rate() {
        return emergency_service_rate;
    }

    public void setEmergency_service_rate(float emergency_service_rate) {
        this.emergency_service_rate = emergency_service_rate;
    }

    public String getType_of_the_service() {
        return type_of_the_service;
    }

    public void setType_of_the_service(String type_of_the_service) {
        this.type_of_the_service = type_of_the_service;
    }

    public String getInitiated_date() {
        return initiated_date;
    }

    public void setInitiated_date(String initiated_date) {
        this.initiated_date = initiated_date;
    }

    public String getExpired_date() {
        return expired_date;
    }

    public void setExpired_date(String expired_date) {
        this.expired_date = expired_date;
    }

    @Override
    public String toString() {
        return "AgreementUpdateDTO{" +
                "agreementid=" + agreementid +
                ", unitid=" + unitid +
                ", item='" + item + '\'' +
                ", equipment='" + equipment + '\'' +
                ", price_per_service=" + price_per_service +
                ", emergency_service_rate=" + emergency_service_rate +
                ", type_of_the_service='" + type_of_the_service + '\'' +
                ", initiated_date='" + initiated_date + '\'' +
                ", expired_date='" + expired_date + '\'' +
                ", NIC='" + NIC + '\'' +
                '}';
    }
}
