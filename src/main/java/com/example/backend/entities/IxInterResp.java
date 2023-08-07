package com.example.backend.entities;

public class IxInterResp {
    private String todayDate;
    private Interco interco;
    private IxTools ixTools;

    public IxInterResp() {
    }

    public String getTodayDate() {
        return todayDate;
    }

    public void setTodayDate(String todayDate) {
        this.todayDate = todayDate;
    }

    public Interco getInterco() {
        return interco;
    }

    public void setInterco(Interco interco) {
        this.interco = interco;
    }

    public IxTools getIxTools() {
        return ixTools;
    }

    public void setIxTools(IxTools ixTools) {
        this.ixTools = ixTools;
    }
}
