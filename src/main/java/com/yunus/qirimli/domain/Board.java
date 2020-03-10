package com.yunus.qirimli.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A Board.
 */
@Entity
@Table(name = "board")
public class Board implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "board")
    private Set<BoardColumn> boardColumns = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("boards")
    private ApplicationUser applicationUser;

    @ManyToOne
    @JsonIgnoreProperties("boards")
    private Project project;

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

    public Board name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<BoardColumn> getBoardColumns() {
        return boardColumns;
    }

    public Board boardColumns(Set<BoardColumn> boardColumns) {
        this.boardColumns = boardColumns;
        return this;
    }

    public Board addBoardColumns(BoardColumn boardColumn) {
        this.boardColumns.add(boardColumn);
        boardColumn.setBoard(this);
        return this;
    }

    public Board removeBoardColumns(BoardColumn boardColumn) {
        this.boardColumns.remove(boardColumn);
        boardColumn.setBoard(null);
        return this;
    }

    public void setBoardColumns(Set<BoardColumn> boardColumns) {
        this.boardColumns = boardColumns;
    }

    public ApplicationUser getApplicationUser() {
        return applicationUser;
    }

    public Board applicationUser(ApplicationUser applicationUser) {
        this.applicationUser = applicationUser;
        return this;
    }

    public void setApplicationUser(ApplicationUser applicationUser) {
        this.applicationUser = applicationUser;
    }

    public Project getProject() {
        return project;
    }

    public Board project(Project project) {
        this.project = project;
        return this;
    }

    public void setProject(Project project) {
        this.project = project;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Board)) {
            return false;
        }
        return id != null && id.equals(((Board) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Board{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
