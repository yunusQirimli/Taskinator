package com.yunus.qirimli.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.yunus.qirimli.web.rest.TestUtil;

public class CommentLikeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CommentLike.class);
        CommentLike commentLike1 = new CommentLike();
        commentLike1.setId(1L);
        CommentLike commentLike2 = new CommentLike();
        commentLike2.setId(commentLike1.getId());
        assertThat(commentLike1).isEqualTo(commentLike2);
        commentLike2.setId(2L);
        assertThat(commentLike1).isNotEqualTo(commentLike2);
        commentLike1.setId(null);
        assertThat(commentLike1).isNotEqualTo(commentLike2);
    }
}
