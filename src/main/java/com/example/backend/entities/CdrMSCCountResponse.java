package com.example.backend.entities;

public class CdrMSCCountResponse {
    private String yesterdayDate;
    private String todayDate;
    private int countMscYesterday;
    private int countMscToday;
    private int countOcsYesterday;
    private int countOcsToday;

    public CdrMSCCountResponse(String yesterdayDate, String todayDate, int countMscYesterday, int countMscToday, int countOcsYesterday, int countOcsToday) {
        this.yesterdayDate = yesterdayDate;
        this.todayDate = todayDate;
        this.countMscYesterday = countMscYesterday;
        this.countMscToday = countMscToday;
        this.countOcsYesterday = countOcsYesterday;
        this.countOcsToday = countOcsToday;
    }

    public String getYesterdayDate() {
        return yesterdayDate;
    }

    public void setYesterdayDate(String yesterdayDate) {
        this.yesterdayDate = yesterdayDate;
    }

    public String getTodayDate() {
        return todayDate;
    }

    public void setTodayDate(String todayDate) {
        this.todayDate = todayDate;
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

    public int getCountOcsYesterday() {
        return countOcsYesterday;
    }

    public void setCountOcsYesterday(int countOcsYesterday) {
        this.countOcsYesterday = countOcsYesterday;
    }

    public int getCountOcsToday() {
        return countOcsToday;
    }

    public void setCountOcsToday(int countOcsToday) {
        this.countOcsToday = countOcsToday;
    }
}
