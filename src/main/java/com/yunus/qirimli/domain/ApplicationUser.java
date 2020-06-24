package com.yunus.qirimli.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A ApplicationUser.
 */
@Entity
@Table(name = "application_user")
public class ApplicationUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    @JsonIgnoreProperties(allowSetters = true)
    private User user;

    @OneToMany(mappedBy = "applicationUser", fetch=FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonIgnoreProperties(value = "applicationUser", allowSetters = true)
    private Set<Board> boards = new HashSet<>();

    @OneToMany(mappedBy = "applicationUser", fetch=FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonIgnoreProperties(value = "applicationUser", allowSetters = true)
    private Set<Task> tasks = new HashSet<>();

    @OneToMany(mappedBy = "applicationUser", fetch=FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonIgnoreProperties(value = "applicationUser", allowSetters = true)
    private Set<CommentLike> commentLikes = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "application_user_teams",
               joinColumns = @JoinColumn(name = "application_user_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "teams_id", referencedColumnName = "id"))
    private Set<Team> teams = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "application_user_projects",
               joinColumns = @JoinColumn(name = "application_user_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "projects_id", referencedColumnName = "id"))
    private Set<Project> projects = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public ApplicationUser user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Board> getBoards() {
        return boards;
    }

    public ApplicationUser boards(Set<Board> boards) {
        this.boards = boards;
        return this;
    }

    public ApplicationUser addBoards(Board board) {
        this.boards.add(board);
        board.setApplicationUser(this);
        return this;
    }

    public ApplicationUser removeBoards(Board board) {
        this.boards.remove(board);
        board.setApplicationUser(null);
        return this;
    }

    public void setBoards(Set<Board> boards) {
        this.boards = boards;
    }

    public Set<Task> getTasks() {
        return tasks;
    }

    public ApplicationUser tasks(Set<Task> tasks) {
        this.tasks = tasks;
        return this;
    }

    public ApplicationUser addTasks(Task task) {
        this.tasks.add(task);
        task.setApplicationUser(this);
        return this;
    }

    public ApplicationUser removeTasks(Task task) {
        this.tasks.remove(task);
        task.setApplicationUser(null);
        return this;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }

    public Set<CommentLike> getCommentLikes() {
        return commentLikes;
    }

    public ApplicationUser commentLikes(Set<CommentLike> commentLikes) {
        this.commentLikes = commentLikes;
        return this;
    }

    public ApplicationUser addCommentLikes(CommentLike commentLike) {
        this.commentLikes.add(commentLike);
        commentLike.setApplicationUser(this);
        return this;
    }

    public ApplicationUser removeCommentLikes(CommentLike commentLike) {
        this.commentLikes.remove(commentLike);
        commentLike.setApplicationUser(null);
        return this;
    }

    public void setCommentLikes(Set<CommentLike> commentLikes) {
        this.commentLikes = commentLikes;
    }

    public Set<Team> getTeams() {
        return teams;
    }

    public ApplicationUser teams(Set<Team> teams) {
        this.teams = teams;
        return this;
    }

    public ApplicationUser addTeams(Team team) {
        this.teams.add(team);
        team.getApplicationUsers().add(this);
        return this;
    }

    public ApplicationUser removeTeams(Team team) {
        this.teams.remove(team);
        team.getApplicationUsers().remove(this);
        return this;
    }

    public void setTeams(Set<Team> teams) {
        this.teams = teams;
    }

    public Set<Project> getProjects() {
        return projects;
    }

    public ApplicationUser projects(Set<Project> projects) {
        this.projects = projects;
        return this;
    }

    public ApplicationUser addProjects(Project project) {
        this.projects.add(project);
        project.getApplicationUsers().add(this);
        return this;
    }

    public ApplicationUser removeProjects(Project project) {
        this.projects.remove(project);
        project.getApplicationUsers().remove(this);
        return this;
    }

    public void setProjects(Set<Project> projects) {
        this.projects = projects;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ApplicationUser)) {
            return false;
        }
        return id != null && id.equals(((ApplicationUser) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ApplicationUser{" +
            "id=" + getId() +
            "}";
    }
}
