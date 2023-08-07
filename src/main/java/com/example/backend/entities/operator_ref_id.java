package com.example.backend.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity(name = "operator_ref_id")
@Table(schema = "tableref")
public class operator_ref_id implements Serializable {
    @Id
    private int id;
    @Column
    private String operateur;

    public operator_ref_id() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getOperateur() {
        return operateur;
    }

    public void setOperateur(String operateur) {
        this.operateur = operateur;
    }
}
