package com.example.backend.entities;

public class Ocs {
    private String latestOcsDate;
    private String yestesrdayOcsDate;
    private int countOcsYesterday;
    private int countOcsToday;

    public Ocs() {
    }

    public Ocs(String latestOcsDate,String yestesrdayOcsDate, int countOcsYesterday, int countOcsToday) {
        this.latestOcsDate = latestOcsDate;
        this.yestesrdayOcsDate = yestesrdayOcsDate;
        this.countOcsYesterday = countOcsYesterday;
        this.countOcsToday = countOcsToday;
    }

    public String getLatestOcsDate() {
        return latestOcsDate;
    }

    public void setLatestOcsDate(String latestOcsDate) {
        this.latestOcsDate = latestOcsDate;
    }

    public String getYestesrdayOcsDate() {
        return yestesrdayOcsDate;
    }

    public void setYestesrdayOcsDate(String yestesrdayOcsDate) {
        this.yestesrdayOcsDate = yestesrdayOcsDate;
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
