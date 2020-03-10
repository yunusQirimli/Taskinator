package com.yunus.qirimli.web.rest;

import com.yunus.qirimli.domain.CommentLike;
import com.yunus.qirimli.repository.CommentLikeRepository;
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
 * REST controller for managing {@link com.yunus.qirimli.domain.CommentLike}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CommentLikeResource {

    private final Logger log = LoggerFactory.getLogger(CommentLikeResource.class);

    private static final String ENTITY_NAME = "commentLike";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CommentLikeRepository commentLikeRepository;

    public CommentLikeResource(CommentLikeRepository commentLikeRepository) {
        this.commentLikeRepository = commentLikeRepository;
    }

    /**
     * {@code POST  /comment-likes} : Create a new commentLike.
     *
     * @param commentLike the commentLike to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new commentLike, or with status {@code 400 (Bad Request)} if the commentLike has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/comment-likes")
    public ResponseEntity<CommentLike> createCommentLike(@RequestBody CommentLike commentLike) throws URISyntaxException {
        log.debug("REST request to save CommentLike : {}", commentLike);
        if (commentLike.getId() != null) {
            throw new BadRequestAlertException("A new commentLike cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CommentLike result = commentLikeRepository.save(commentLike);
        return ResponseEntity.created(new URI("/api/comment-likes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /comment-likes} : Updates an existing commentLike.
     *
     * @param commentLike the commentLike to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated commentLike,
     * or with status {@code 400 (Bad Request)} if the commentLike is not valid,
     * or with status {@code 500 (Internal Server Error)} if the commentLike couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/comment-likes")
    public ResponseEntity<CommentLike> updateCommentLike(@RequestBody CommentLike commentLike) throws URISyntaxException {
        log.debug("REST request to update CommentLike : {}", commentLike);
        if (commentLike.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CommentLike result = commentLikeRepository.save(commentLike);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, commentLike.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /comment-likes} : get all the commentLikes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of commentLikes in body.
     */
    @GetMapping("/comment-likes")
    public List<CommentLike> getAllCommentLikes() {
        log.debug("REST request to get all CommentLikes");
        return commentLikeRepository.findAll();
    }

    /**
     * {@code GET  /comment-likes/:id} : get the "id" commentLike.
     *
     * @param id the id of the commentLike to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the commentLike, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/comment-likes/{id}")
    public ResponseEntity<CommentLike> getCommentLike(@PathVariable Long id) {
        log.debug("REST request to get CommentLike : {}", id);
        Optional<CommentLike> commentLike = commentLikeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(commentLike);
    }

    /**
     * {@code DELETE  /comment-likes/:id} : delete the "id" commentLike.
     *
     * @param id the id of the commentLike to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/comment-likes/{id}")
    public ResponseEntity<Void> deleteCommentLike(@PathVariable Long id) {
        log.debug("REST request to delete CommentLike : {}", id);
        commentLikeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
