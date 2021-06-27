import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Markdown from '../../utils/Markdown';

const useStyles = makeStyles((theme) => ({
    markdown: {
        ...theme.typography.body2,
        padding: theme.spacing(3, 0),
    },
}));

function MarkdownUI({ content }) {
    const classes = useStyles();
    return <Markdown className={classes.markdown}>{content}</Markdown>;
}

export default MarkdownUI;
