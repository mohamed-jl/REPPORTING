package com.example.backend.entities;

public class Interco {
    private String latestInterco;
    private String yesterdayIntercoDate;
    private int countIntercoYesterday;
    private int countIntercoToday;

    public Interco() {
    }

    public String getLatestInterco() {
        return latestInterco;
    }

    public void setLatestInterco(String latestInterco) {
        this.latestInterco = latestInterco;
    }

    public String getYesterdayIntercoDate() {
        return yesterdayIntercoDate;
    }

    public void setYesterdayIntercoDate(String yesterdayIntercoDate) {
        this.yesterdayIntercoDate = yesterdayIntercoDate;
    }

    public int getCountIntercoYesterday() {
        return countIntercoYesterday;
    }

    public void setCountIntercoYesterday(int countIntercoYesterday) {
        this.countIntercoYesterday = countIntercoYesterday;
    }

    public int getCountIntercoToday() {
        return countIntercoToday;
    }

    public void setCountIntercoToday(int countIntercoToday) {
        this.countIntercoToday = countIntercoToday;
    }
}
