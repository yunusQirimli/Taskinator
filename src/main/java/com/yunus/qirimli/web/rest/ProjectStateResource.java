package com.yunus.qirimli.web.rest;

import com.yunus.qirimli.domain.ProjectState;
import com.yunus.qirimli.repository.ProjectStateRepository;
import com.yunus.qirimli.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.yunus.qirimli.domain.ProjectState}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProjectStateResource {

    private final Logger log = LoggerFactory.getLogger(ProjectStateResource.class);

    private static final String ENTITY_NAME = "projectState";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProjectStateRepository projectStateRepository;

    public ProjectStateResource(ProjectStateRepository projectStateRepository) {
        this.projectStateRepository = projectStateRepository;
    }

    /**
     * {@code POST  /project-states} : Create a new projectState.
     *
     * @param projectState the projectState to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new projectState, or with status {@code 400 (Bad Request)} if the projectState has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/project-states")
    public ResponseEntity<ProjectState> createProjectState(@RequestBody ProjectState projectState) throws URISyntaxException {
        log.debug("REST request to save ProjectState : {}", projectState);
        if (projectState.getId() != null) {
            throw new BadRequestAlertException("A new projectState cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProjectState result = projectStateRepository.save(projectState);
        return ResponseEntity.created(new URI("/api/project-states/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /project-states} : Updates an existing projectState.
     *
     * @param projectState the projectState to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated projectState,
     * or with status {@code 400 (Bad Request)} if the projectState is not valid,
     * or with status {@code 500 (Internal Server Error)} if the projectState couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/project-states")
    public ResponseEntity<ProjectState> updateProjectState(@RequestBody ProjectState projectState) throws URISyntaxException {
        log.debug("REST request to update ProjectState : {}", projectState);
        if (projectState.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProjectState result = projectStateRepository.save(projectState);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, projectState.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /project-states} : get all the projectStates.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of projectStates in body.
     */
    @GetMapping("/project-states")
    public List<ProjectState> getAllProjectStates() {
        log.debug("REST request to get all ProjectStates");
        return projectStateRepository.findAll();
    }

    /**
     * {@code GET  /project-states/:id} : get the "id" projectState.
     *
     * @param id the id of the projectState to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the projectState, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/project-states/{id}")
    public ResponseEntity<ProjectState> getProjectState(@PathVariable Long id) {
        log.debug("REST request to get ProjectState : {}", id);
        Optional<ProjectState> projectState = projectStateRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(projectState);
    }

    /**
     * {@code DELETE  /project-states/:id} : delete the "id" projectState.
     *
     * @param id the id of the projectState to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/project-states/{id}")
    public ResponseEntity<Void> deleteProjectState(@PathVariable Long id) {
        log.debug("REST request to delete ProjectState : {}", id);
        projectStateRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
