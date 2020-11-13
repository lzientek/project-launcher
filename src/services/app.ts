import path from 'path';
import { Project, ProjectConfig } from './project';
const remote = window.require('electron').remote;
const { promises: fs } = remote.require('fs');

export interface Config {
    shell?: string;
    projects: {
        [key: string]: ProjectConfig;
    };
}

export class App {
    config: Config = { projects: {} };
    projects: Map<string, Project> = new Map();
    onChange?: (type: string, data: any) => void | Promise<void>;

    async load(): Promise<void> {
        this.config = JSON.parse(
            await fs.readFile(
                path.join('/Users/lucas/Proj/lzientek/launcher', './config.json'),
                'utf8',
            ),
        );

        Object.entries(this.config.projects).forEach(([name, data]) => {
            this.projects.set(name, new Project(data, this));
        });
    }

    get(projectName: string): Project | undefined {
        return this.projects.get(projectName);
    }
}
