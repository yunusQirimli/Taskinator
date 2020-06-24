package com.yunus.qirimli.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Comment.
 */
@Entity
@Table(name = "comment")
public class Comment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "content")
    private String content;

    @Column(name = "create_date")
    private LocalDate createDate;

    @OneToMany(mappedBy = "comment", fetch=FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<CommentLike> likes = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("comments")
    private ApplicationUser applicationUser;

    @ManyToOne
    @JsonIgnoreProperties("comments")
    private Task task;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public Comment content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDate getCreateDate() {
        return createDate;
    }

    public Comment createDate(LocalDate createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(LocalDate createDate) {
        this.createDate = createDate;
    }

    public Set<CommentLike> getLikes() {
        return likes;
    }

    public Comment likes(Set<CommentLike> commentLikes) {
        this.likes = commentLikes;
        return this;
    }

    public Comment addLikes(CommentLike commentLike) {
        this.likes.add(commentLike);
        commentLike.setComment(this);
        return this;
    }

    public Comment removeLikes(CommentLike commentLike) {
        this.likes.remove(commentLike);
        commentLike.setComment(null);
        return this;
    }

    public void setLikes(Set<CommentLike> commentLikes) {
        this.likes = commentLikes;
    }

    public ApplicationUser getApplicationUser() {
        return applicationUser;
    }

    public Comment applicationUser(ApplicationUser applicationUser) {
        this.applicationUser = applicationUser;
        return this;
    }

    public void setApplicationUser(ApplicationUser applicationUser) {
        this.applicationUser = applicationUser;
    }

    public Task getTask() {
        return task;
    }

    public Comment task(Task task) {
        this.task = task;
        return this;
    }

    public void setTask(Task task) {
        this.task = task;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Comment)) {
            return false;
        }
        return id != null && id.equals(((Comment) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Comment{" +
            "id=" + getId() +
            ", content='" + getContent() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            "}";
    }
}
