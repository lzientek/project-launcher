import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Project as P } from '../services/project';
import { useProject } from '../hooks/useProject';
import Nl2Br from '../components/Nl2Br';

const Project: React.FC<{ project: P; name: string }> = ({ project, name }) => {
    const [logs, isRunning, runningActions] = useProject(project);

    return (
        <Grid item xs={12}>
            <Typography>{name}</Typography>
            {isRunning ? (
                <Button color="secondary" onClick={() => project.killProject()}>
                    stop
                </Button>
            ) : (
                <Button color="primary" onClick={() => project.run()}>
                    run
                </Button>
            )}

            <Button disabled={runningActions.install} onClick={() => project.execute('install')}>
                install
            </Button>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Typography>Logs</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <Nl2Br>{logs}</Nl2Br>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Grid>
    );
};

export default Project;
