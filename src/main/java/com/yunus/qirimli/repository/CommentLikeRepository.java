package com.yunus.qirimli.repository;

import com.yunus.qirimli.domain.CommentLike;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CommentLike entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {
}
