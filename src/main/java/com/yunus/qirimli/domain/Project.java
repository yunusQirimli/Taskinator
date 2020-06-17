package com.yunus.qirimli.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.yunus.qirimli.domain.enumeration.Color;

/**
 * A Project.
 */
@Entity
@Table(name = "project")
public class Project implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "color")
    private Color color;

    @Column(name = "create_date")
    private LocalDate createDate;

    @Column(name = "modification_date")
    private LocalDate modificationDate;

    @Column(name = "close_date")
    private LocalDate closeDate;

    @OneToMany(mappedBy = "project", fetch=FetchType.EAGER)
    private Set<Board> boards = new HashSet<>();

    @OneToMany(mappedBy = "project", fetch=FetchType.EAGER)
    private Set<ProjectNote> notes = new HashSet<>();

    @OneToMany(mappedBy = "project", fetch=FetchType.EAGER)
    private Set<Team> teams = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("projects")
    private ProjectState projectState;

    @ManyToMany(mappedBy = "projects")
    @JsonIgnore
    private Set<ApplicationUser> applicationUsers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Project name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Color getColor() {
        return color;
    }

    public Project color(Color color) {
        this.color = color;
        return this;
    }

    public void setColor(Color color) {
        this.color = color;
    }

    public LocalDate getCreateDate() {
        return createDate;
    }

    public Project createDate(LocalDate createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(LocalDate createDate) {
        this.createDate = createDate;
    }

    public LocalDate getModificationDate() {
        return modificationDate;
    }

    public Project modificationDate(LocalDate modificationDate) {
        this.modificationDate = modificationDate;
        return this;
    }

    public void setModificationDate(LocalDate modificationDate) {
        this.modificationDate = modificationDate;
    }

    public LocalDate getCloseDate() {
        return closeDate;
    }

    public Project closeDate(LocalDate closeDate) {
        this.closeDate = closeDate;
        return this;
    }

    public void setCloseDate(LocalDate closeDate) {
        this.closeDate = closeDate;
    }

    public Set<Board> getBoards() {
        return boards;
    }

    public Project boards(Set<Board> boards) {
        this.boards = boards;
        return this;
    }

    public Project addBoards(Board board) {
        this.boards.add(board);
        board.setProject(this);
        return this;
    }

    public Project removeBoards(Board board) {
        this.boards.remove(board);
        board.setProject(null);
        return this;
    }

    public void setBoards(Set<Board> boards) {
        this.boards = boards;
    }

    public Set<ProjectNote> getNotes() {
        return notes;
    }

    public Project notes(Set<ProjectNote> projectNotes) {
        this.notes = projectNotes;
        return this;
    }

    public Project addNotes(ProjectNote projectNote) {
        this.notes.add(projectNote);
        projectNote.setProject(this);
        return this;
    }

    public Project removeNotes(ProjectNote projectNote) {
        this.notes.remove(projectNote);
        projectNote.setProject(null);
        return this;
    }

    public void setNotes(Set<ProjectNote> projectNotes) {
        this.notes = projectNotes;
    }

    public Set<Team> getTeams() {
        return teams;
    }

    public Project teams(Set<Team> teams) {
        this.teams = teams;
        return this;
    }

    public Project addTeam(Team team) {
        this.teams.add(team);
        team.setProject(this);
        return this;
    }

    public Project removeTeam(Team team) {
        this.teams.remove(team);
        team.setProject(null);
        return this;
    }

    public void setTeams(Set<Team> teams) {
        this.teams = teams;
    }

    public ProjectState getProjectState() {
        return projectState;
    }

    public Project projectState(ProjectState projectState) {
        this.projectState = projectState;
        return this;
    }

    public void setProjectState(ProjectState projectState) {
        this.projectState = projectState;
    }

    public Set<ApplicationUser> getApplicationUsers() {
        return applicationUsers;
    }

    public Project applicationUsers(Set<ApplicationUser> applicationUsers) {
        this.applicationUsers = applicationUsers;
        return this;
    }

    public Project addApplicationUsers(ApplicationUser applicationUser) {
        this.applicationUsers.add(applicationUser);
        applicationUser.getProjects().add(this);
        return this;
    }

    public Project removeApplicationUsers(ApplicationUser applicationUser) {
        this.applicationUsers.remove(applicationUser);
        applicationUser.getProjects().remove(this);
        return this;
    }

    public void setApplicationUsers(Set<ApplicationUser> applicationUsers) {
        this.applicationUsers = applicationUsers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Project)) {
            return false;
        }
        return id != null && id.equals(((Project) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Project{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", color='" + getColor() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", modificationDate='" + getModificationDate() + "'" +
            ", closeDate='" + getCloseDate() + "'" +
            "}";
    }
}
