package com.yunus.qirimli.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.yunus.qirimli.web.rest.TestUtil;

public class ProjectStateTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProjectState.class);
        ProjectState projectState1 = new ProjectState();
        projectState1.setId(1L);
        ProjectState projectState2 = new ProjectState();
        projectState2.setId(projectState1.getId());
        assertThat(projectState1).isEqualTo(projectState2);
        projectState2.setId(2L);
        assertThat(projectState1).isNotEqualTo(projectState2);
        projectState1.setId(null);
        assertThat(projectState1).isNotEqualTo(projectState2);
    }
}
