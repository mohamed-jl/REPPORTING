package com.example.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/**
 * The persistent class for the rep_rapports database table.
 * 
 */
@Entity
@Table(name = "rep_rapports",schema = "etl")
@NamedQuery(name = "RepRapport.findAll", query = "SELECT r FROM RepRapport r")
public class RepRapport implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	
	private boolean issimplepie;
	
	private boolean ispercent;

	private Boolean percent;

	@Column(name = "chart_type")
	private String chartType;

	private String name;

	private String seriessubtitle;
	private Boolean isDetails;

	private String type_flow;

	private String title;

	private boolean isFieldMerge;

	private String fieldRepport_merge;

	private String operetionFieldMerge;

	private boolean isJoinTable = false;

	private String table_join;
	private String col1;
	private String col2;

	private boolean iscustomise;

	private boolean islimited;

	private Integer limitnumber;

	//private boolean isGroupedBy;

	private String groupeByfield;
	private boolean isGroupedBy;
	
	// bi-directional many-to-one association to RepRapportsX
//	@OneToMany(mappedBy = "repRapport", cascade = CascadeType.REMOVE, orphanRemoval = true)
//	@LazyCollection(LazyCollectionOption.FALSE)
//	@JsonIgnore
//	private List<RepRapportsX> repRapportsXs;

	@ManyToOne
	@LazyCollection(LazyCollectionOption.FALSE)
	private User guiUser;

	@ManyToOne
	@LazyCollection(LazyCollectionOption.FALSE)
	private Function function;


	public RepRapport() {
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getChartType() {
		return this.chartType;
	}

	public void setChartType(String chartType) {
		this.chartType = chartType;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSeriessubtitle() {
		return this.seriessubtitle;
	}

	public void setSeriessubtitle(String seriessubtitle) {
		this.seriessubtitle = seriessubtitle;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

//	public List<RepRapportsX> getRepRapportsXs() {
//		return this.repRapportsXs;
//	}

//	public void setRepRapportsXs(List<RepRapportsX> repRapportsXs) {
//		this.repRapportsXs = repRapportsXs;
//	}
//
//	public RepRapportsX addRepRapportsX(RepRapportsX repRapportsX) {
//		getRepRapportsXs().add(repRapportsX);
//		repRapportsX.setRepRapport(this);
//
//		return repRapportsX;
//	}

//	public RepRapportsX removeRepRapportsX(RepRapportsX repRapportsX) {
//		getRepRapportsXs().remove(repRapportsX);
//		repRapportsX.setRepRapport(null);
//
//		return repRapportsX;
//	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof RepRapport))
			return false;
		return id != null && id.equals(((RepRapport) o).id);
	}

	@Override
	public int hashCode() {
		return 31;
	}

	public User getGuiUser() {
		return guiUser;
	}

	public void setGuiUser(User guiUser) {
		this.guiUser = guiUser;
	}

	public Function getFunction() {
		return function;
	}

	public void setFunction(Function function) {
		this.function = function;
	}

	public boolean isFieldMerge() {
		return isFieldMerge;
	}

	public void setFieldMerge(boolean isFieldMerge) {
		this.isFieldMerge = isFieldMerge;
	}

	public String getFieldRepport_merge() {
		return fieldRepport_merge;
	}

	public void setFieldRepport_merge(String fieldRepport_merge) {
		this.fieldRepport_merge = fieldRepport_merge;
	}

	public String getOperetionFieldMerge() {
		return operetionFieldMerge;
	}

	public void setOperetionFieldMerge(String operetionFieldMerge) {
		this.operetionFieldMerge = operetionFieldMerge;
	}

	public boolean isJoinTable() {
		return isJoinTable;
	}

	public void setJoinTable(boolean isJoinTable) {
		this.isJoinTable = isJoinTable;
	}

	public String getTable_join() {
		return table_join;
	}

	public void setTable_join(String table_join) {
		this.table_join = table_join;
	}

	public String getCol1() {
		return col1;
	}

	public void setCol1(String col1) {
		this.col1 = col1;
	}

	public String getCol2() {
		return col2;
	}

	public void setCol2(String col2) {
		this.col2 = col2;
	}

	public boolean isIscustomise() {
		return iscustomise;
	}

	public void setIscustomise(boolean iscustomise) {
		this.iscustomise = iscustomise;
	}

	public Boolean getIsDetails() {
		return isDetails;
	}

	public void setIsDetails(Boolean isDetails) {
		this.isDetails = isDetails;
	}

	public String getType_flow() {
		return type_flow;
	}

	public void setType_flow(String type_flow) {
		this.type_flow = type_flow;
	}

	public boolean isIspercent() {
		return ispercent;
	}

	public void setIspercent(boolean ispercent) {
		this.ispercent = ispercent;
	}

	public Boolean getPercent() {
		return percent;
	}

	public void setPercent(Boolean percent) {
		this.percent = percent;
	}

	public boolean islimited() {
		return islimited;
	}

	public void setLimited(boolean islimited) {
		this.islimited = islimited;
	}

	public Integer getLimitNumber() {
		return limitnumber;
	}

	public void setLimitNumber(Integer limitNumber) {
		this.limitnumber = limitNumber;
	}

	public boolean isGroupedBy() {
		return isGroupedBy;
	}

	public void setGroupedBy(boolean isGroupedBy) {
		this.isGroupedBy = isGroupedBy;
	}

	public String getGroupeByfield() {
		return groupeByfield;
	}

	public void setGroupeByfield(String groupeByfield) {
		this.groupeByfield = groupeByfield;
	}

	public boolean isIssimplepie() {
		return issimplepie;
	}

	public void setIssimplepie(boolean issimplepie) {
		this.issimplepie = issimplepie;
	}

}