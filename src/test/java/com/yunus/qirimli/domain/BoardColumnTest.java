package com.yunus.qirimli.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.yunus.qirimli.web.rest.TestUtil;

public class BoardColumnTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BoardColumn.class);
        BoardColumn boardColumn1 = new BoardColumn();
        boardColumn1.setId(1L);
        BoardColumn boardColumn2 = new BoardColumn();
        boardColumn2.setId(boardColumn1.getId());
        assertThat(boardColumn1).isEqualTo(boardColumn2);
        boardColumn2.setId(2L);
        assertThat(boardColumn1).isNotEqualTo(boardColumn2);
        boardColumn1.setId(null);
        assertThat(boardColumn1).isNotEqualTo(boardColumn2);
    }
}
