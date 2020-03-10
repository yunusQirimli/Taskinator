package com.yunus.qirimli.repository;

import com.yunus.qirimli.domain.ProjectNote;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ProjectNote entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProjectNoteRepository extends JpaRepository<ProjectNote, Long> {
}
