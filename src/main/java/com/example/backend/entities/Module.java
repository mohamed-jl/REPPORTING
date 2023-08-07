package com.example.backend.entities;

import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity(name = "module")
@Table(schema = "management")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
@JsonIgnoreProperties({"group_module"})
public class Module implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String moduleName;
    @Column(nullable = true)
    private String description;

    @OneToMany(mappedBy = "Module", fetch = FetchType.EAGER, cascade = { CascadeType.REMOVE, CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH })
    @JsonManagedReference
    private List<SubModule> list_sub_modules;

    @ManyToMany(mappedBy = "module_groups", fetch = FetchType.LAZY,cascade = { CascadeType.DETACH, CascadeType.PERSIST, CascadeType.MERGE ,CascadeType.REMOVE})
    @JsonIgnore
    private List<Group> group_module;
    @Column(name="module_order")
    @GeneratedValue
    @JsonIgnore
    private Integer order;

    public Module() {
    }

    public List<Group> getGroup_module() {
        return group_module;
    }

    public void setGroup_module(List<Group> group_module) {
        this.group_module = group_module;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    public List<SubModule> getList_sub_modules() {
        return list_sub_modules;
    }

    public void setList_sub_modules(List<SubModule> list_sub_modules) {
        this.list_sub_modules = list_sub_modules;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }
}
