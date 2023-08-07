package com.example.backend.entities;

import com.fasterxml.jackson.annotation.*;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity(name="function")
@Table(schema = "management")
public class Function implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String functionName;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sub_module_id")
    private SubModule subModule;

    @ManyToMany(mappedBy = "liste_function", cascade = { CascadeType.MERGE, CascadeType.PERSIST, CascadeType.DETACH }, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Group> group;


    @ManyToMany(cascade = { CascadeType.MERGE, CascadeType.PERSIST ,CascadeType.DETACH}, fetch = FetchType.LAZY)
    @JoinTable(name = "function_reporting", joinColumns = @JoinColumn(name = "function_id"), inverseJoinColumns = @JoinColumn(name = "list_rep_id"), schema = "management")
    //@JsonIgnore
    private List<RepRapport> listreprapport;
    @Column(nullable = true)
    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFunctionName() {
        return functionName;
    }

    public void setFunctionName(String functionName) {
        this.functionName = functionName;
    }

    public List<Group> getGroup() {
        return group;
    }

    public void setGroup(List<Group> group) {
        this.group = group;
    }

    public SubModule getSubModule() {
        return subModule;
    }

    public void setSubModule(SubModule subModule) {
        this.subModule = subModule;
    }

    public List<RepRapport> getListreprapport() {
        return listreprapport;
    }

    public void setListreprapport(List<RepRapport> listreprapport) {
        this.listreprapport = listreprapport;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
