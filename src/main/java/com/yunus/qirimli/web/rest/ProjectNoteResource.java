package com.yunus.qirimli.web.rest;

import com.yunus.qirimli.domain.ProjectNote;
import com.yunus.qirimli.repository.ProjectNoteRepository;
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
 * REST controller for managing {@link com.yunus.qirimli.domain.ProjectNote}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProjectNoteResource {

    private final Logger log = LoggerFactory.getLogger(ProjectNoteResource.class);

    private static final String ENTITY_NAME = "projectNote";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProjectNoteRepository projectNoteRepository;

    public ProjectNoteResource(ProjectNoteRepository projectNoteRepository) {
        this.projectNoteRepository = projectNoteRepository;
    }

    /**
     * {@code POST  /project-notes} : Create a new projectNote.
     *
     * @param projectNote the projectNote to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new projectNote, or with status {@code 400 (Bad Request)} if the projectNote has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/project-notes")
    public ResponseEntity<ProjectNote> createProjectNote(@RequestBody ProjectNote projectNote) throws URISyntaxException {
        log.debug("REST request to save ProjectNote : {}", projectNote);
        if (projectNote.getId() != null) {
            throw new BadRequestAlertException("A new projectNote cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProjectNote result = projectNoteRepository.save(projectNote);
        return ResponseEntity.created(new URI("/api/project-notes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /project-notes} : Updates an existing projectNote.
     *
     * @param projectNote the projectNote to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated projectNote,
     * or with status {@code 400 (Bad Request)} if the projectNote is not valid,
     * or with status {@code 500 (Internal Server Error)} if the projectNote couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/project-notes")
    public ResponseEntity<ProjectNote> updateProjectNote(@RequestBody ProjectNote projectNote) throws URISyntaxException {
        log.debug("REST request to update ProjectNote : {}", projectNote);
        if (projectNote.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProjectNote result = projectNoteRepository.save(projectNote);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, projectNote.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /project-notes} : get all the projectNotes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of projectNotes in body.
     */
    @GetMapping("/project-notes")
    public List<ProjectNote> getAllProjectNotes() {
        log.debug("REST request to get all ProjectNotes");
        return projectNoteRepository.findAll();
    }

    /**
     * {@code GET  /project-notes/:id} : get the "id" projectNote.
     *
     * @param id the id of the projectNote to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the projectNote, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/project-notes/{id}")
    public ResponseEntity<ProjectNote> getProjectNote(@PathVariable Long id) {
        log.debug("REST request to get ProjectNote : {}", id);
        Optional<ProjectNote> projectNote = projectNoteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(projectNote);
    }

    /**
     * {@code DELETE  /project-notes/:id} : delete the "id" projectNote.
     *
     * @param id the id of the projectNote to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/project-notes/{id}")
    public ResponseEntity<Void> deleteProjectNote(@PathVariable Long id) {
        log.debug("REST request to delete ProjectNote : {}", id);
        projectNoteRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
