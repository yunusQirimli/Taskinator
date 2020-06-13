package com.yunus.qirimli.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A BoardColumn.
 */
@Entity
@Table(name = "board_column")
public class BoardColumn implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "index")
    private Integer index;

    @OneToMany(mappedBy = "boardColumn")
    private Set<Task> tasks = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("boardColumns")
    private Board board;

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

    public BoardColumn name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getIndex() {
        return index;
    }

    public BoardColumn index(Integer index) {
        this.index = index;
        return this;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }

    public Set<Task> getTasks() {
        return tasks;
    }

    public BoardColumn tasks(Set<Task> tasks) {
        this.tasks = tasks;
        return this;
    }

    public BoardColumn addTasks(Task task) {
        this.tasks.add(task);
        task.setBoardColumn(this);
        return this;
    }

    public BoardColumn removeTasks(Task task) {
        this.tasks.remove(task);
        task.setBoardColumn(null);
        return this;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }

    public Board getBoard() {
        return board;
    }

    public BoardColumn board(Board board) {
        this.board = board;
        return this;
    }

    public void setBoard(Board board) {
        this.board = board;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BoardColumn)) {
            return false;
        }
        return id != null && id.equals(((BoardColumn) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "BoardColumn{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", index=" + getIndex() +
            "}";
    }
}
