package com.yunus.qirimli.web.rest;

import com.yunus.qirimli.TaskinatorApp;
import com.yunus.qirimli.domain.ProjectState;
import com.yunus.qirimli.repository.ProjectStateRepository;

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
 * Integration tests for the {@link ProjectStateResource} REST controller.
 */
@SpringBootTest(classes = TaskinatorApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ProjectStateResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ProjectStateRepository projectStateRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProjectStateMockMvc;

    private ProjectState projectState;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProjectState createEntity(EntityManager em) {
        ProjectState projectState = new ProjectState()
            .name(DEFAULT_NAME);
        return projectState;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProjectState createUpdatedEntity(EntityManager em) {
        ProjectState projectState = new ProjectState()
            .name(UPDATED_NAME);
        return projectState;
    }

    @BeforeEach
    public void initTest() {
        projectState = createEntity(em);
    }

    @Test
    @Transactional
    public void createProjectState() throws Exception {
        int databaseSizeBeforeCreate = projectStateRepository.findAll().size();

        // Create the ProjectState
        restProjectStateMockMvc.perform(post("/api/project-states")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(projectState)))
            .andExpect(status().isCreated());

        // Validate the ProjectState in the database
        List<ProjectState> projectStateList = projectStateRepository.findAll();
        assertThat(projectStateList).hasSize(databaseSizeBeforeCreate + 1);
        ProjectState testProjectState = projectStateList.get(projectStateList.size() - 1);
        assertThat(testProjectState.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createProjectStateWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = projectStateRepository.findAll().size();

        // Create the ProjectState with an existing ID
        projectState.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProjectStateMockMvc.perform(post("/api/project-states")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(projectState)))
            .andExpect(status().isBadRequest());

        // Validate the ProjectState in the database
        List<ProjectState> projectStateList = projectStateRepository.findAll();
        assertThat(projectStateList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProjectStates() throws Exception {
        // Initialize the database
        projectStateRepository.saveAndFlush(projectState);

        // Get all the projectStateList
        restProjectStateMockMvc.perform(get("/api/project-states?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(projectState.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getProjectState() throws Exception {
        // Initialize the database
        projectStateRepository.saveAndFlush(projectState);

        // Get the projectState
        restProjectStateMockMvc.perform(get("/api/project-states/{id}", projectState.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(projectState.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingProjectState() throws Exception {
        // Get the projectState
        restProjectStateMockMvc.perform(get("/api/project-states/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProjectState() throws Exception {
        // Initialize the database
        projectStateRepository.saveAndFlush(projectState);

        int databaseSizeBeforeUpdate = projectStateRepository.findAll().size();

        // Update the projectState
        ProjectState updatedProjectState = projectStateRepository.findById(projectState.getId()).get();
        // Disconnect from session so that the updates on updatedProjectState are not directly saved in db
        em.detach(updatedProjectState);
        updatedProjectState
            .name(UPDATED_NAME);

        restProjectStateMockMvc.perform(put("/api/project-states")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProjectState)))
            .andExpect(status().isOk());

        // Validate the ProjectState in the database
        List<ProjectState> projectStateList = projectStateRepository.findAll();
        assertThat(projectStateList).hasSize(databaseSizeBeforeUpdate);
        ProjectState testProjectState = projectStateList.get(projectStateList.size() - 1);
        assertThat(testProjectState.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingProjectState() throws Exception {
        int databaseSizeBeforeUpdate = projectStateRepository.findAll().size();

        // Create the ProjectState

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProjectStateMockMvc.perform(put("/api/project-states")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(projectState)))
            .andExpect(status().isBadRequest());

        // Validate the ProjectState in the database
        List<ProjectState> projectStateList = projectStateRepository.findAll();
        assertThat(projectStateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProjectState() throws Exception {
        // Initialize the database
        projectStateRepository.saveAndFlush(projectState);

        int databaseSizeBeforeDelete = projectStateRepository.findAll().size();

        // Delete the projectState
        restProjectStateMockMvc.perform(delete("/api/project-states/{id}", projectState.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProjectState> projectStateList = projectStateRepository.findAll();
        assertThat(projectStateList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
