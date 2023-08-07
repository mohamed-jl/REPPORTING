package com.example.backend.Controllers;

import com.example.backend.entities.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RestController
@CrossOrigin("*")
@RequestMapping("/cdr")
public class CdrController {

    @PersistenceContext
    private EntityManager entityManager;

    private static final String TABLE_NAME_PREFIX_INTERCO = "interco";
    private static final String TABLE_NAME_PREFIX_IXTOOLS = "ixtools";

    private static final String TABLE_NAME_PREFIX_MSC="cdrs_msc";
    private static final String TABLE_NAME_PREFIX_OCS="cdrs_ocs";

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public CdrCountResponse countCdrs() {
        // Get today's date
        LocalDate today = LocalDate.now();

        // Get yesterday's date
        LocalDate yesterday = today;

        // Format dates as "yyMMdd"
        String formattedToday = today.format(DateTimeFormatter.ofPattern("yyMMdd"));
        String formattedYesterday = yesterday.format(DateTimeFormatter.ofPattern("yyMMdd"));

        // Create the table names for today and yesterday
        String todayTableNameInterco = getLatestTableName(TABLE_NAME_PREFIX_INTERCO, formattedToday);
        String todayTableNameIxTools = getLatestTableName(TABLE_NAME_PREFIX_IXTOOLS, formattedToday);
        String yesterdayTableNameInterco = getLatestTableName(TABLE_NAME_PREFIX_INTERCO, formattedYesterday);
        String yesterdayTableNameIxTools = getLatestTableName(TABLE_NAME_PREFIX_IXTOOLS, formattedYesterday);

        // Check if the latest table for today is not found, get the previous day's table
        if (todayTableNameInterco == null || todayTableNameIxTools == null || todayTableNameInterco.equals(getLatestTableName(TABLE_NAME_PREFIX_INTERCO, today.format(DateTimeFormatter.ofPattern("yyMMdd")))) || todayTableNameIxTools.equals(getLatestTableName(TABLE_NAME_PREFIX_IXTOOLS, today.format(DateTimeFormatter.ofPattern("yyMMdd"))))) {
            todayTableNameInterco = yesterdayTableNameInterco;
            todayTableNameIxTools = yesterdayTableNameIxTools;
        }

        // Get the count for today's interco table
        int countInterco = getCountFromUserTable(todayTableNameInterco);

        // Get the count for today's ixtolls table
        int countIxTools = getCountFromUserTable(todayTableNameIxTools);

        // Format the dates as "yyyy-MM-dd"
        String formattedTodayDate = formatDateString(todayTableNameInterco.substring(TABLE_NAME_PREFIX_INTERCO.length()));
        String formattedCountDate = formatDateString(todayTableNameIxTools.substring(TABLE_NAME_PREFIX_IXTOOLS.length()));

        // Create and return the response object
        CdrCountResponse response = new CdrCountResponse(formattedTodayDate, formattedCountDate, countInterco, countIxTools);
        return response;
    }

    @RequestMapping(value = "/ix_inter", method = RequestMethod.GET)
    public IxInterResp countCdrsIxInter() {
        IxInterResp resp = new IxInterResp();
        LocalDate today = LocalDate.now();
        LocalDate yesterday = today.minusDays(1);

        String formattedToday = today.format(DateTimeFormatter.ofPattern("yyMMdd"));
        String formattedYesterday = yesterday.format(DateTimeFormatter.ofPattern("yyMMdd"));

        resp.setTodayDate(formattedToday);

        String todayTableNameInterco = getLatestTableName("interco", formattedToday);
        String todayTableNameIxTools = getLatestTableName("ixtools", formattedToday);
        String yesterdayTableNameInterco = getLatestTableName("interco", formattedYesterday);
        String yesterdayTableNameIxTools = getLatestTableName("ixtools", formattedYesterday);

        Interco msc = new Interco();
        IxTools ocs = new IxTools();

        if (todayTableNameInterco != null) {
            int countMscToday = getCountFromTable(todayTableNameInterco);
            msc.setCountIntercoToday(countMscToday);
            msc.setLatestInterco(formatDateString(todayTableNameInterco.substring("interco".length())));
        }

        if (yesterdayTableNameInterco != null) {
            int countMscYesterday = getCountFromTable(yesterdayTableNameInterco);
            msc.setCountIntercoYesterday(countMscYesterday);
            msc.setYesterdayIntercoDate(formatDateString(yesterdayTableNameInterco.substring("interco".length())));
        }

        if (todayTableNameIxTools != null) {
            int countOcsToday = getCountFromUserTable(todayTableNameIxTools);
            ocs.setCountIxToolsToday(countOcsToday);
            ocs.setLatestIxTools(formatDateString(todayTableNameIxTools.substring("ixtools".length())));
        }

        if (yesterdayTableNameIxTools != null) {
            int countOcsYesterday = getCountFromUserTable(yesterdayTableNameIxTools);
            ocs.setCountIxToolsYesterday(countOcsYesterday);
            ocs.setYesterdayIxToolsDate(formatDateString(yesterdayTableNameIxTools.substring("ixtools".length())));
        }

        resp.setInterco(msc);
        resp.setIxTools(ocs);

        return resp;
    }


    @RequestMapping(value = "/msc_ocs", method = RequestMethod.GET)
    public CdrResp countCdrsMscOcs() {
        CdrResp resp = new CdrResp();
        LocalDate today = LocalDate.now();
        LocalDate yesterday = today.minusDays(1);

        String formattedToday = today.format(DateTimeFormatter.ofPattern("yyMMdd"));
        String formattedYesterday = yesterday.format(DateTimeFormatter.ofPattern("yyMMdd"));

        resp.setTodayDate(formattedToday);

        String todayTableNameMsc = getLatestTableName("cdrs_msc", formattedToday);
        String todayTableNameOcs = getLatestTableName("cdrs_ocs", formattedToday);
        String yesterdayTableNameMsc = getLatestTableName("cdrs_msc", formattedYesterday);
        String yesterdayTableNameOcs = getLatestTableName("cdrs_ocs", formattedYesterday);

        Msc msc = new Msc();
        Ocs ocs = new Ocs();

        if (todayTableNameMsc != null) {
            int countMscToday = getCountFromUserTable(todayTableNameMsc);
            msc.setCountMscToday(countMscToday);
            msc.setLatestMsc(formatDateString(todayTableNameMsc.substring("cdrs_msc".length())));
        }

        if (yesterdayTableNameMsc != null) {
            int countMscYesterday = getCountFromUserTable(yesterdayTableNameMsc);
            msc.setCountMscYesterday(countMscYesterday);
            msc.setYesterdayMscDate(formatDateString(yesterdayTableNameMsc.substring("cdrs_msc".length())));
        }

        if (todayTableNameOcs != null) {
            int countOcsToday = getCountFromUserTable(todayTableNameOcs);
            ocs.setCountOcsToday(countOcsToday);
            ocs.setLatestOcsDate(formatDateString(todayTableNameOcs.substring("cdrs_ocs".length())));
        }

        if (yesterdayTableNameOcs != null) {
            int countOcsYesterday = getCountFromUserTable(yesterdayTableNameOcs);
            ocs.setCountOcsYesterday(countOcsYesterday);
            ocs.setYestesrdayOcsDate(formatDateString(yesterdayTableNameOcs.substring("cdrs_ocs".length())));
        }

        resp.setMsc(msc);
        resp.setOcs(ocs);

        return resp;
    }
    private String formatDateString(String dateString) {
        DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyMMdd");
        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(dateString, inputFormatter);
        return date.format(outputFormatter);
    }

    private String getLatestTableName(String tableNamePrefix, String formattedDate) {
        String queryStr = "SELECT TABLE_NAME " +
                "FROM INFORMATION_SCHEMA.TABLES " +
                "WHERE TABLE_NAME LIKE '" + tableNamePrefix + "%' " +
                "  AND TABLE_NAME <= '" + tableNamePrefix + formattedDate + "' " +
                "ORDER BY TABLE_NAME DESC LIMIT 1";

        Query query = entityManager.createNativeQuery(queryStr);

        Object result = query.getSingleResult();
        return result != null ? result.toString() : null;
    }

    private int getCountFromTable(String tableName) {
        if (tableName == null) {
            return 0;
        }

        // Prepare the SQL query
        String queryStr = "SELECT COUNT(*) FROM cdrs_archives." + tableName + " WHERE networkcallreference = 'detailed'";
        Query query = entityManager.createNativeQuery(queryStr);

        // Execute the query and retrieve the count
        Object result = query.getSingleResult();
        return result != null ? ((Number) result).intValue() : 0;
    }

    private int getCountFromUserTable(String tableName) {
        if (tableName == null) {
            return 0;
        }

        String queryStr = "SELECT n_live_tup FROM pg_stat_user_tables WHERE schemaname = 'cdrs_archives' AND relname = '" + tableName + "'";
        Query query = entityManager.createNativeQuery(queryStr);

        Object result = query.getSingleResult();
        return result != null ? Integer.parseInt(result.toString()) : 0;
    }
}
