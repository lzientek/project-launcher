import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useApp } from '../hooks/useApp';
import Project from './Project';

const Main: React.FC = () => {
    const [app] = useApp();

    return (
        <Grid container spacing={3}>
            {Array.from(app.projects).map(([name, project]) => (
                <Project key={name} name={name} project={project} />
            ))}
        </Grid>
    );
};

export default Main;
