import { Avatar, Grid } from '@material-ui/core';
import React from 'react';
import moment from 'moment';

function Comment({ comment }) {
    return (
        <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
                <Avatar alt={comment.author} src={comment.authorImage} />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: 'left' }}>
                    {comment.author}
                </h4>
                <p style={{ textAlign: 'left' }}>`{comment.text} `</p>
                <p style={{ textAlign: 'left', color: 'gray' }}>
                    {moment().startOf(comment.date).fromNow()}
                </p>
            </Grid>
        </Grid>
    );
}

export default Comment;
