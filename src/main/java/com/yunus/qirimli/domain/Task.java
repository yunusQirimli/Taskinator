package com.yunus.qirimli.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.yunus.qirimli.domain.enumeration.Color;

/**
 * A Task.
 */
@Entity
@Table(name = "task")
public class Task implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "color")
    private Color color;

    @Column(name = "create_date")
    private LocalDate createDate;

    @Column(name = "modification_date")
    private LocalDate modificationDate;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "complete_date")
    private LocalDate completeDate;

    @OneToMany(mappedBy = "parentTask")
    private Set<Task> subTasks = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("subTasks")
    private Task parentTask;

    @ManyToOne
    @JsonIgnoreProperties("tasks")
    private BoardColumn boardColumn;

    @ManyToOne
    @JsonIgnoreProperties("tasks")
    private ApplicationUser applicationUser;

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

    public Task name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Task description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Color getColor() {
        return color;
    }

    public Task color(Color color) {
        this.color = color;
        return this;
    }

    public void setColor(Color color) {
        this.color = color;
    }

    public LocalDate getCreateDate() {
        return createDate;
    }

    public Task createDate(LocalDate createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(LocalDate createDate) {
        this.createDate = createDate;
    }

    public LocalDate getModificationDate() {
        return modificationDate;
    }

    public Task modificationDate(LocalDate modificationDate) {
        this.modificationDate = modificationDate;
        return this;
    }

    public void setModificationDate(LocalDate modificationDate) {
        this.modificationDate = modificationDate;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public Task dueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
        return this;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public Task startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getCompleteDate() {
        return completeDate;
    }

    public Task completeDate(LocalDate completeDate) {
        this.completeDate = completeDate;
        return this;
    }

    public void setCompleteDate(LocalDate completeDate) {
        this.completeDate = completeDate;
    }

    public Set<Task> getSubTasks() {
        return subTasks;
    }

    public Task subTasks(Set<Task> tasks) {
        this.subTasks = tasks;
        return this;
    }

    public Task addSubTasks(Task task) {
        this.subTasks.add(task);
        task.setParentTask(this);
        return this;
    }

    public Task removeSubTasks(Task task) {
        this.subTasks.remove(task);
        task.setParentTask(null);
        return this;
    }

    public void setSubTasks(Set<Task> tasks) {
        this.subTasks = tasks;
    }

    public Task getParentTask() {
        return parentTask;
    }

    public Task parentTask(Task task) {
        this.parentTask = task;
        return this;
    }

    public void setParentTask(Task task) {
        this.parentTask = task;
    }

    public BoardColumn getBoardColumn() {
        return boardColumn;
    }

    public Task boardColumn(BoardColumn boardColumn) {
        this.boardColumn = boardColumn;
        return this;
    }

    public void setBoardColumn(BoardColumn boardColumn) {
        this.boardColumn = boardColumn;
    }

    public ApplicationUser getApplicationUser() {
        return applicationUser;
    }

    public Task applicationUser(ApplicationUser applicationUser) {
        this.applicationUser = applicationUser;
        return this;
    }

    public void setApplicationUser(ApplicationUser applicationUser) {
        this.applicationUser = applicationUser;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Task)) {
            return false;
        }
        return id != null && id.equals(((Task) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Task{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", color='" + getColor() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", modificationDate='" + getModificationDate() + "'" +
            ", dueDate='" + getDueDate() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", completeDate='" + getCompleteDate() + "'" +
            "}";
    }
}
