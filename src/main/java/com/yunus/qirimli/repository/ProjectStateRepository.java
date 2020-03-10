package com.yunus.qirimli.repository;

import com.yunus.qirimli.domain.ProjectState;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ProjectState entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProjectStateRepository extends JpaRepository<ProjectState, Long> {
}
