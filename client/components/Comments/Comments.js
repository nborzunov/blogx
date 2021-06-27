import { Paper } from '@material-ui/core';
import React from 'react';
import Comment from './Comment';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        padding: '14px',
    },
    section: {
        padding: '40px 20px',
        margin: '20px 0',
    },
    formSection: {
        margin: '20px 0',
    },
}));

function Comments({ comments }) {
    const styles = useStyles();

    return (
        <div className={styles.wrapper}>
            <h1>Comments</h1>
                <TextField
					fullWidth
                    label="Leave a comment.."
					variant='outlined'
                    multiline
                    rowsMax={12}

                />

            <Paper className={styles.section}>
                {comments.map((comment) => (
                    <Comment comment={comment} />
                ))}
            </Paper>
        </div>
    );
}

export default Comments;
