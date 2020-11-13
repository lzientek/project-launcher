import { useRef, useState } from 'react';
import { Project } from '../services/project';

export const useProject = (p: Project): [string, boolean, Record<string, boolean>, Project] => {
    const { current: project } = useRef(p);

    project.onNewLogs = () => {
        setLogs(project.logs);
    };

    project.onRunChange = (isRunning) => {
        setRunning(isRunning);
    };

    project.onActionChange = (action, isRunning) => {
        setRunningAction({ ...runningAction, [action]: isRunning });
    };

    const [logs, setLogs] = useState(project.logs);
    const [isRunning, setRunning] = useState(false);
    const [runningAction, setRunningAction] = useState<Record<string, boolean>>({});

    return [logs, isRunning, runningAction, project];
};
