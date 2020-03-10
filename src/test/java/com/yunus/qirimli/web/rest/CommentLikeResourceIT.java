package com.yunus.qirimli.web.rest;

import com.yunus.qirimli.TaskinatorApp;
import com.yunus.qirimli.domain.CommentLike;
import com.yunus.qirimli.repository.CommentLikeRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CommentLikeResource} REST controller.
 */
@SpringBootTest(classes = TaskinatorApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class CommentLikeResourceIT {

    @Autowired
    private CommentLikeRepository commentLikeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCommentLikeMockMvc;

    private CommentLike commentLike;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CommentLike createEntity(EntityManager em) {
        CommentLike commentLike = new CommentLike();
        return commentLike;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CommentLike createUpdatedEntity(EntityManager em) {
        CommentLike commentLike = new CommentLike();
        return commentLike;
    }

    @BeforeEach
    public void initTest() {
        commentLike = createEntity(em);
    }

    @Test
    @Transactional
    public void createCommentLike() throws Exception {
        int databaseSizeBeforeCreate = commentLikeRepository.findAll().size();

        // Create the CommentLike
        restCommentLikeMockMvc.perform(post("/api/comment-likes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commentLike)))
            .andExpect(status().isCreated());

        // Validate the CommentLike in the database
        List<CommentLike> commentLikeList = commentLikeRepository.findAll();
        assertThat(commentLikeList).hasSize(databaseSizeBeforeCreate + 1);
        CommentLike testCommentLike = commentLikeList.get(commentLikeList.size() - 1);
    }

    @Test
    @Transactional
    public void createCommentLikeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = commentLikeRepository.findAll().size();

        // Create the CommentLike with an existing ID
        commentLike.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommentLikeMockMvc.perform(post("/api/comment-likes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commentLike)))
            .andExpect(status().isBadRequest());

        // Validate the CommentLike in the database
        List<CommentLike> commentLikeList = commentLikeRepository.findAll();
        assertThat(commentLikeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCommentLikes() throws Exception {
        // Initialize the database
        commentLikeRepository.saveAndFlush(commentLike);

        // Get all the commentLikeList
        restCommentLikeMockMvc.perform(get("/api/comment-likes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(commentLike.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getCommentLike() throws Exception {
        // Initialize the database
        commentLikeRepository.saveAndFlush(commentLike);

        // Get the commentLike
        restCommentLikeMockMvc.perform(get("/api/comment-likes/{id}", commentLike.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(commentLike.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCommentLike() throws Exception {
        // Get the commentLike
        restCommentLikeMockMvc.perform(get("/api/comment-likes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCommentLike() throws Exception {
        // Initialize the database
        commentLikeRepository.saveAndFlush(commentLike);

        int databaseSizeBeforeUpdate = commentLikeRepository.findAll().size();

        // Update the commentLike
        CommentLike updatedCommentLike = commentLikeRepository.findById(commentLike.getId()).get();
        // Disconnect from session so that the updates on updatedCommentLike are not directly saved in db
        em.detach(updatedCommentLike);

        restCommentLikeMockMvc.perform(put("/api/comment-likes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCommentLike)))
            .andExpect(status().isOk());

        // Validate the CommentLike in the database
        List<CommentLike> commentLikeList = commentLikeRepository.findAll();
        assertThat(commentLikeList).hasSize(databaseSizeBeforeUpdate);
        CommentLike testCommentLike = commentLikeList.get(commentLikeList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingCommentLike() throws Exception {
        int databaseSizeBeforeUpdate = commentLikeRepository.findAll().size();

        // Create the CommentLike

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommentLikeMockMvc.perform(put("/api/comment-likes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commentLike)))
            .andExpect(status().isBadRequest());

        // Validate the CommentLike in the database
        List<CommentLike> commentLikeList = commentLikeRepository.findAll();
        assertThat(commentLikeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCommentLike() throws Exception {
        // Initialize the database
        commentLikeRepository.saveAndFlush(commentLike);

        int databaseSizeBeforeDelete = commentLikeRepository.findAll().size();

        // Delete the commentLike
        restCommentLikeMockMvc.perform(delete("/api/comment-likes/{id}", commentLike.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CommentLike> commentLikeList = commentLikeRepository.findAll();
        assertThat(commentLikeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
