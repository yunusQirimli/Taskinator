package com.yunus.qirimli.web.rest;

import com.yunus.qirimli.TaskinatorApp;
import com.yunus.qirimli.domain.ProjectNote;
import com.yunus.qirimli.repository.ProjectNoteRepository;

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
 * Integration tests for the {@link ProjectNoteResource} REST controller.
 */
@SpringBootTest(classes = TaskinatorApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ProjectNoteResourceIT {

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    @Autowired
    private ProjectNoteRepository projectNoteRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProjectNoteMockMvc;

    private ProjectNote projectNote;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProjectNote createEntity(EntityManager em) {
        ProjectNote projectNote = new ProjectNote()
            .content(DEFAULT_CONTENT);
        return projectNote;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProjectNote createUpdatedEntity(EntityManager em) {
        ProjectNote projectNote = new ProjectNote()
            .content(UPDATED_CONTENT);
        return projectNote;
    }

    @BeforeEach
    public void initTest() {
        projectNote = createEntity(em);
    }

    @Test
    @Transactional
    public void createProjectNote() throws Exception {
        int databaseSizeBeforeCreate = projectNoteRepository.findAll().size();

        // Create the ProjectNote
        restProjectNoteMockMvc.perform(post("/api/project-notes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(projectNote)))
            .andExpect(status().isCreated());

        // Validate the ProjectNote in the database
        List<ProjectNote> projectNoteList = projectNoteRepository.findAll();
        assertThat(projectNoteList).hasSize(databaseSizeBeforeCreate + 1);
        ProjectNote testProjectNote = projectNoteList.get(projectNoteList.size() - 1);
        assertThat(testProjectNote.getContent()).isEqualTo(DEFAULT_CONTENT);
    }

    @Test
    @Transactional
    public void createProjectNoteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = projectNoteRepository.findAll().size();

        // Create the ProjectNote with an existing ID
        projectNote.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProjectNoteMockMvc.perform(post("/api/project-notes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(projectNote)))
            .andExpect(status().isBadRequest());

        // Validate the ProjectNote in the database
        List<ProjectNote> projectNoteList = projectNoteRepository.findAll();
        assertThat(projectNoteList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProjectNotes() throws Exception {
        // Initialize the database
        projectNoteRepository.saveAndFlush(projectNote);

        // Get all the projectNoteList
        restProjectNoteMockMvc.perform(get("/api/project-notes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(projectNote.getId().intValue())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT)));
    }
    
    @Test
    @Transactional
    public void getProjectNote() throws Exception {
        // Initialize the database
        projectNoteRepository.saveAndFlush(projectNote);

        // Get the projectNote
        restProjectNoteMockMvc.perform(get("/api/project-notes/{id}", projectNote.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(projectNote.getId().intValue()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT));
    }

    @Test
    @Transactional
    public void getNonExistingProjectNote() throws Exception {
        // Get the projectNote
        restProjectNoteMockMvc.perform(get("/api/project-notes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProjectNote() throws Exception {
        // Initialize the database
        projectNoteRepository.saveAndFlush(projectNote);

        int databaseSizeBeforeUpdate = projectNoteRepository.findAll().size();

        // Update the projectNote
        ProjectNote updatedProjectNote = projectNoteRepository.findById(projectNote.getId()).get();
        // Disconnect from session so that the updates on updatedProjectNote are not directly saved in db
        em.detach(updatedProjectNote);
        updatedProjectNote
            .content(UPDATED_CONTENT);

        restProjectNoteMockMvc.perform(put("/api/project-notes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProjectNote)))
            .andExpect(status().isOk());

        // Validate the ProjectNote in the database
        List<ProjectNote> projectNoteList = projectNoteRepository.findAll();
        assertThat(projectNoteList).hasSize(databaseSizeBeforeUpdate);
        ProjectNote testProjectNote = projectNoteList.get(projectNoteList.size() - 1);
        assertThat(testProjectNote.getContent()).isEqualTo(UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void updateNonExistingProjectNote() throws Exception {
        int databaseSizeBeforeUpdate = projectNoteRepository.findAll().size();

        // Create the ProjectNote

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProjectNoteMockMvc.perform(put("/api/project-notes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(projectNote)))
            .andExpect(status().isBadRequest());

        // Validate the ProjectNote in the database
        List<ProjectNote> projectNoteList = projectNoteRepository.findAll();
        assertThat(projectNoteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProjectNote() throws Exception {
        // Initialize the database
        projectNoteRepository.saveAndFlush(projectNote);

        int databaseSizeBeforeDelete = projectNoteRepository.findAll().size();

        // Delete the projectNote
        restProjectNoteMockMvc.perform(delete("/api/project-notes/{id}", projectNote.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProjectNote> projectNoteList = projectNoteRepository.findAll();
        assertThat(projectNoteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
