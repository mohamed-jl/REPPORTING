package com.example.backend.entities;

public class IxTools {
    private String latestIxTools;
    private String yesterdayIxToolsDate;
    private int countIxToolsYesterday;
    private int countIxToolsToday;

    public IxTools() {
    }

    public String getLatestIxTools() {
        return latestIxTools;
    }

    public void setLatestIxTools(String latestIxTools) {
        this.latestIxTools = latestIxTools;
    }

    public String getYesterdayIxToolsDate() {
        return yesterdayIxToolsDate;
    }

    public void setYesterdayIxToolsDate(String yesterdayIxToolsDate) {
        this.yesterdayIxToolsDate = yesterdayIxToolsDate;
    }

    public int getCountIxToolsYesterday() {
        return countIxToolsYesterday;
    }

    public void setCountIxToolsYesterday(int countIxToolsYesterday) {
        this.countIxToolsYesterday = countIxToolsYesterday;
    }

    public int getCountIxToolsToday() {
        return countIxToolsToday;
    }

    public void setCountIxToolsToday(int countIxToolsToday) {
        this.countIxToolsToday = countIxToolsToday;
    }
}
