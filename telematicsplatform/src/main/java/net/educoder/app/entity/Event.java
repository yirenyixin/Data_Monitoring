package net.educoder.app.entity;

import net.educoder.app.utils.DataUtils;

import java.text.DecimalFormat;
import java.text.NumberFormat;

public class Event {
    //  在线数、活跃数、致命故障数量、严重故障数量、一般故障数量、轻微故障数量、房车报警数量、旅行车报警数量、桥跑车报警数量、跑车报警数量、敞篷车报警数量
    private String onlineCount;
    private String activeCount;
    private String fault4Count;
    private String fault3Count;
    private String fault2Count;
    private String fault1Count;
    private String warning5Count;
    private String warning4Count;
    private String warning3Count;
    private String warning2Count;
    private String warning1Count;
    private String active; //活跃度
    private String carCount;//车辆总数

    public Event(String onlineCount, String activeCount, String fault4Count, String fault3Count, String fault2Count, String fault1Count, String warning5Count, String warning4Count, String warning3Count, String warning2Count, String warning1Count) {
        NumberFormat numberFormat = new DecimalFormat("###,###");

        this.onlineCount = numberFormat.format(Integer.parseInt(onlineCount));
        this.activeCount = numberFormat.format(Integer.parseInt(activeCount));
        this.fault4Count = fault4Count;
        this.fault3Count = fault3Count;
        this.fault2Count = fault2Count;
        this.fault1Count = fault1Count;
        this.warning5Count = warning5Count;
        this.warning4Count = warning4Count;
        this.warning3Count = warning3Count;
        this.warning2Count = warning2Count;
        this.warning1Count = warning1Count;
        this.active = (int) ((Double.valueOf(activeCount) / Double.valueOf(onlineCount)) * 100) + "";
        this.carCount = numberFormat.format(DataUtils.getCarCount());
    }

    public String getOnlineCount() {
        return onlineCount;
    }

    public void setOnlineCount(String onlineCount) {
        this.onlineCount = onlineCount;
    }

    public String getActiveCount() {
        return activeCount;
    }

    public void setActiveCount(String activeCount) {
        this.activeCount = activeCount;
    }

    public String getFault4Count() {
        return fault4Count;
    }

    public void setFault4Count(String fault4Count) {
        this.fault4Count = fault4Count;
    }

    public String getFault3Count() {
        return fault3Count;
    }

    public void setFault3Count(String fault3Count) {
        this.fault3Count = fault3Count;
    }

    public String getFault2Count() {
        return fault2Count;
    }

    public void setFault2Count(String fault2Count) {
        this.fault2Count = fault2Count;
    }

    public String getFault1Count() {
        return fault1Count;
    }

    public void setFault1Count(String fault1Count) {
        this.fault1Count = fault1Count;
    }

    public String getWarning5Count() {
        return warning5Count;
    }

    public void setWarning5Count(String warning5Count) {
        this.warning5Count = warning5Count;
    }

    public String getWarning4Count() {
        return warning4Count;
    }

    public void setWarning4Count(String warning4Count) {
        this.warning4Count = warning4Count;
    }

    public String getWarning3Count() {
        return warning3Count;
    }

    public void setWarning3Count(String warning3Count) {
        this.warning3Count = warning3Count;
    }

    public String getWarning2Count() {
        return warning2Count;
    }

    public void setWarning2Count(String warning2Count) {
        this.warning2Count = warning2Count;
    }

    public String getWarning1Count() {
        return warning1Count;
    }

    public void setWarning1Count(String warning1Count) {
        this.warning1Count = warning1Count;
    }

    public String getActive() {
        return active;
    }

    public void setActive(String active) {
        this.active = active;
    }

    public String getCarCount() {
        return carCount;
    }

    public void setCarCount(String carCount) {
        this.carCount = carCount;
    }
}
