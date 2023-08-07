package com.example.backend.entities;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "logs",schema = "management")
@Transactional
public class Logs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "action")
    private String action;

    @Column(name = "date")
    private LocalDateTime date;

    @Column(name = "table_affected")
    private String tableAffected;


    @Column(name = "row_Id")
    private Long rowId;

    public Logs() {
    }

    public Logs(Long userId, String action, LocalDateTime now, String tableName,Long row) {
        this.userId = userId;
        this.action = action;
        this.tableAffected = tableName;
        this.date= now;
        this.rowId = row;
    }

    // constructor, getters, and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getTableAffected() {
        return tableAffected;
    }

    public void setTableAffected(String tableAffected) {
        this.tableAffected = tableAffected;
    }
    public Long getRowId() {
        return rowId;
    }

    public void setRowId(Long rowId) {
        this.rowId = rowId;
    }
}
