package com.example.backend.entities;

public class CdrCountResponse {
    private String intercoDate;
    private String ixToolsDate;
    private int countInterco;
    private int countIxTools;

    public CdrCountResponse(String intercoDate, String ixToolsDate, int countInterco, int countIxTools) {
        this.intercoDate = intercoDate;
        this.ixToolsDate = ixToolsDate;
        this.countInterco = countInterco;
        this.countIxTools = countIxTools;
    }

    public String getIntercoDateDate() {
        return intercoDate;
    }

    public void setIntercoDate(String intercoDate) {
        this.intercoDate = intercoDate;
    }

    public String getIxToolsDate() {
        return ixToolsDate;
    }

    public void setIxToolsDate(String ixToolsDate) {
        this.ixToolsDate = ixToolsDate;
    }

    public int getCountInterco() {
        return countInterco;
    }

    public void setCountInterco(int countInterco) {
        this.countInterco = countInterco;
    }

    public int getCountIxTools() {
        return countIxTools;
    }

    public void setCountIxTools(int countIxTools) {
        this.countIxTools = countIxTools;
    }
}
