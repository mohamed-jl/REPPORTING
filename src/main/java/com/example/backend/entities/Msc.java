package com.example.backend.entities;

public class Msc {
    private String latestMsc;
    private String yesterdayMscDate;
    private int countMscYesterday;
    private int countMscToday;

    public Msc() {
    }

    public Msc(String latestMsc,String yesterdayMscDate, int countMscYesterday, int countMscToday) {
        this.latestMsc = latestMsc;
        this.yesterdayMscDate=yesterdayMscDate;
        this.countMscYesterday = countMscYesterday;
        this.countMscToday = countMscToday;
    }

    public String getLatestMsc() {
        return latestMsc;
    }

    public void setLatestMsc(String latestMsc) {
        this.latestMsc = latestMsc;
    }

    public String getYesterdayMscDate() {
        return yesterdayMscDate;
    }

    public void setYesterdayMscDate(String yesterdayMscDate) {
        this.yesterdayMscDate = yesterdayMscDate;
    }

    public int getCountMscYesterday() {
        return countMscYesterday;
    }

    public void setCountMscYesterday(int countMscYesterday) {
        this.countMscYesterday = countMscYesterday;
    }

    public int getCountMscToday() {
        return countMscToday;
    }

    public void setCountMscToday(int countMscToday) {
        this.countMscToday = countMscToday;
    }
}
