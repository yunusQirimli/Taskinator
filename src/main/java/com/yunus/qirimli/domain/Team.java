package com.yunus.qirimli.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A Team.
 */
@Entity
@Table(name = "team")
public class Team implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JsonIgnoreProperties("teams")
    private Project project;

    @ManyToMany(mappedBy = "teams")
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

    public Team name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Project getProject() {
        return project;
    }

    public Team project(Project project) {
        this.project = project;
        return this;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Set<ApplicationUser> getApplicationUsers() {
        return applicationUsers;
    }

    public Team applicationUsers(Set<ApplicationUser> applicationUsers) {
        this.applicationUsers = applicationUsers;
        return this;
    }

    public Team addApplicationUsers(ApplicationUser applicationUser) {
        this.applicationUsers.add(applicationUser);
        applicationUser.getTeams().add(this);
        return this;
    }

    public Team removeApplicationUsers(ApplicationUser applicationUser) {
        this.applicationUsers.remove(applicationUser);
        applicationUser.getTeams().remove(this);
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
        if (!(o instanceof Team)) {
            return false;
        }
        return id != null && id.equals(((Team) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Team{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
