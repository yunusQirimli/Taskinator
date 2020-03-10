package com.yunus.qirimli.web.rest;

import com.yunus.qirimli.domain.BoardColumn;
import com.yunus.qirimli.repository.BoardColumnRepository;
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
 * REST controller for managing {@link com.yunus.qirimli.domain.BoardColumn}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BoardColumnResource {

    private final Logger log = LoggerFactory.getLogger(BoardColumnResource.class);

    private static final String ENTITY_NAME = "boardColumn";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BoardColumnRepository boardColumnRepository;

    public BoardColumnResource(BoardColumnRepository boardColumnRepository) {
        this.boardColumnRepository = boardColumnRepository;
    }

    /**
     * {@code POST  /board-columns} : Create a new boardColumn.
     *
     * @param boardColumn the boardColumn to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new boardColumn, or with status {@code 400 (Bad Request)} if the boardColumn has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/board-columns")
    public ResponseEntity<BoardColumn> createBoardColumn(@RequestBody BoardColumn boardColumn) throws URISyntaxException {
        log.debug("REST request to save BoardColumn : {}", boardColumn);
        if (boardColumn.getId() != null) {
            throw new BadRequestAlertException("A new boardColumn cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BoardColumn result = boardColumnRepository.save(boardColumn);
        return ResponseEntity.created(new URI("/api/board-columns/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /board-columns} : Updates an existing boardColumn.
     *
     * @param boardColumn the boardColumn to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated boardColumn,
     * or with status {@code 400 (Bad Request)} if the boardColumn is not valid,
     * or with status {@code 500 (Internal Server Error)} if the boardColumn couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/board-columns")
    public ResponseEntity<BoardColumn> updateBoardColumn(@RequestBody BoardColumn boardColumn) throws URISyntaxException {
        log.debug("REST request to update BoardColumn : {}", boardColumn);
        if (boardColumn.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BoardColumn result = boardColumnRepository.save(boardColumn);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, boardColumn.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /board-columns} : get all the boardColumns.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of boardColumns in body.
     */
    @GetMapping("/board-columns")
    public List<BoardColumn> getAllBoardColumns() {
        log.debug("REST request to get all BoardColumns");
        return boardColumnRepository.findAll();
    }

    /**
     * {@code GET  /board-columns/:id} : get the "id" boardColumn.
     *
     * @param id the id of the boardColumn to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the boardColumn, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/board-columns/{id}")
    public ResponseEntity<BoardColumn> getBoardColumn(@PathVariable Long id) {
        log.debug("REST request to get BoardColumn : {}", id);
        Optional<BoardColumn> boardColumn = boardColumnRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(boardColumn);
    }

    /**
     * {@code DELETE  /board-columns/:id} : delete the "id" boardColumn.
     *
     * @param id the id of the boardColumn to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/board-columns/{id}")
    public ResponseEntity<Void> deleteBoardColumn(@PathVariable Long id) {
        log.debug("REST request to delete BoardColumn : {}", id);
        boardColumnRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
