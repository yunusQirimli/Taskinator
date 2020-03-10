package com.yunus.qirimli.web.rest;

import com.yunus.qirimli.TaskinatorApp;
import com.yunus.qirimli.domain.BoardColumn;
import com.yunus.qirimli.repository.BoardColumnRepository;

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
 * Integration tests for the {@link BoardColumnResource} REST controller.
 */
@SpringBootTest(classes = TaskinatorApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class BoardColumnResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private BoardColumnRepository boardColumnRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBoardColumnMockMvc;

    private BoardColumn boardColumn;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BoardColumn createEntity(EntityManager em) {
        BoardColumn boardColumn = new BoardColumn()
            .name(DEFAULT_NAME);
        return boardColumn;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BoardColumn createUpdatedEntity(EntityManager em) {
        BoardColumn boardColumn = new BoardColumn()
            .name(UPDATED_NAME);
        return boardColumn;
    }

    @BeforeEach
    public void initTest() {
        boardColumn = createEntity(em);
    }

    @Test
    @Transactional
    public void createBoardColumn() throws Exception {
        int databaseSizeBeforeCreate = boardColumnRepository.findAll().size();

        // Create the BoardColumn
        restBoardColumnMockMvc.perform(post("/api/board-columns")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(boardColumn)))
            .andExpect(status().isCreated());

        // Validate the BoardColumn in the database
        List<BoardColumn> boardColumnList = boardColumnRepository.findAll();
        assertThat(boardColumnList).hasSize(databaseSizeBeforeCreate + 1);
        BoardColumn testBoardColumn = boardColumnList.get(boardColumnList.size() - 1);
        assertThat(testBoardColumn.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createBoardColumnWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = boardColumnRepository.findAll().size();

        // Create the BoardColumn with an existing ID
        boardColumn.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBoardColumnMockMvc.perform(post("/api/board-columns")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(boardColumn)))
            .andExpect(status().isBadRequest());

        // Validate the BoardColumn in the database
        List<BoardColumn> boardColumnList = boardColumnRepository.findAll();
        assertThat(boardColumnList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllBoardColumns() throws Exception {
        // Initialize the database
        boardColumnRepository.saveAndFlush(boardColumn);

        // Get all the boardColumnList
        restBoardColumnMockMvc.perform(get("/api/board-columns?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(boardColumn.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getBoardColumn() throws Exception {
        // Initialize the database
        boardColumnRepository.saveAndFlush(boardColumn);

        // Get the boardColumn
        restBoardColumnMockMvc.perform(get("/api/board-columns/{id}", boardColumn.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(boardColumn.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingBoardColumn() throws Exception {
        // Get the boardColumn
        restBoardColumnMockMvc.perform(get("/api/board-columns/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBoardColumn() throws Exception {
        // Initialize the database
        boardColumnRepository.saveAndFlush(boardColumn);

        int databaseSizeBeforeUpdate = boardColumnRepository.findAll().size();

        // Update the boardColumn
        BoardColumn updatedBoardColumn = boardColumnRepository.findById(boardColumn.getId()).get();
        // Disconnect from session so that the updates on updatedBoardColumn are not directly saved in db
        em.detach(updatedBoardColumn);
        updatedBoardColumn
            .name(UPDATED_NAME);

        restBoardColumnMockMvc.perform(put("/api/board-columns")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBoardColumn)))
            .andExpect(status().isOk());

        // Validate the BoardColumn in the database
        List<BoardColumn> boardColumnList = boardColumnRepository.findAll();
        assertThat(boardColumnList).hasSize(databaseSizeBeforeUpdate);
        BoardColumn testBoardColumn = boardColumnList.get(boardColumnList.size() - 1);
        assertThat(testBoardColumn.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingBoardColumn() throws Exception {
        int databaseSizeBeforeUpdate = boardColumnRepository.findAll().size();

        // Create the BoardColumn

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBoardColumnMockMvc.perform(put("/api/board-columns")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(boardColumn)))
            .andExpect(status().isBadRequest());

        // Validate the BoardColumn in the database
        List<BoardColumn> boardColumnList = boardColumnRepository.findAll();
        assertThat(boardColumnList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBoardColumn() throws Exception {
        // Initialize the database
        boardColumnRepository.saveAndFlush(boardColumn);

        int databaseSizeBeforeDelete = boardColumnRepository.findAll().size();

        // Delete the boardColumn
        restBoardColumnMockMvc.perform(delete("/api/board-columns/{id}", boardColumn.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<BoardColumn> boardColumnList = boardColumnRepository.findAll();
        assertThat(boardColumnList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
