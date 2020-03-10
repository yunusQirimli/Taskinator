package com.yunus.qirimli.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.yunus.qirimli.web.rest.TestUtil;

public class ProjectNoteTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProjectNote.class);
        ProjectNote projectNote1 = new ProjectNote();
        projectNote1.setId(1L);
        ProjectNote projectNote2 = new ProjectNote();
        projectNote2.setId(projectNote1.getId());
        assertThat(projectNote1).isEqualTo(projectNote2);
        projectNote2.setId(2L);
        assertThat(projectNote1).isNotEqualTo(projectNote2);
        projectNote1.setId(null);
        assertThat(projectNote1).isNotEqualTo(projectNote2);
    }
}
