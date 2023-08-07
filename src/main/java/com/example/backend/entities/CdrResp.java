package com.example.backend.entities;

public class CdrResp {
    private String todayDate;
    private Msc msc;
    private Ocs ocs;

    public CdrResp() {

    }

    public String getTodayDate() {
        return todayDate;
    }

    public void setTodayDate(String todayDate) {
        this.todayDate = todayDate;
    }

    public Msc getMsc() {
        return msc;
    }

    public void setMsc(Msc msc) {
        this.msc = msc;
    }

    public Ocs getOcs() {
        return ocs;
    }

    public void setOcs(Ocs ocs) {
        this.ocs = ocs;
    }
}
