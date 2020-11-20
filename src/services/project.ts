import { App } from './app';

const remote = window.require('electron').remote;
const { exec } = remote.require('child_process');

export type Actions = 'run' | 'install' | 'init' | 'init-db';
export interface ProjectConfig {
    name: string;
    path: string;
    actions: Record<Actions, string> & {
        run: string;
    };
    dependencies: string[];
}

export class Project {
    config: ProjectConfig;
    childProcess?: any;
    onNewLogs?: (newLogs: string) => void;
    onRunChange?: (isRunning: boolean) => void;
    onActionChange?: (action: string, isRunning: boolean) => void;
    logs = '';

    constructor(config: ProjectConfig, private app: App) {
        this.config = config;
        this.app = app;
    }

    execute(action: Actions): void {
        this.killProject();
        const env = Object.entries(process.env)
            .filter(([n]) => !n.startsWith('npm'))
            .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

        const childProcess = exec(this.getSh(action), {
            cwd: this.config.path,
            shell: this.app.config.shell || process.env.SHELL,
            env: env,
        });

        childProcess.stdout.on('data', (data: string) => this.addExecLogs(action, data));
        childProcess.stderr.on('data', (data: string) => this.addExecLogs(action, data));
        childProcess.on('exit', (code: number) => {
            console.log(`${this.config.name} ${action} exited with code: ${code}`);
            this.onActionChange?.(action, false);
        });
        this.onActionChange?.(action, true);
    }

    run(): void {
        if (this.childProcess) {
            // todo re run
        }

        this.childProcess = exec(this.config.actions.run, {
            cwd: this.config.path,
            shell: this.app.config.shell,
            env: process.env,
        });

        this.childProcess.stdout.on('data', this.addLogs.bind(this));
        this.childProcess.stderr.on('data', this.addLogs.bind(this));
        this.childProcess.on('exit', (code: number) => {
            console.log(`${this.config.name} exited with code: ${code}`);
            this.onRunChange?.(false);
        });
        this.onRunChange?.(true);
    }

    killProject(): void {
        this.childProcess?.kill('SIGTERM');
    }

    // #region private helper

    private addLogs(data: string) {
        this.logs += data;
        this.onNewLogs ? this.onNewLogs(data) : console.log(this.config.name, data);
    }

    private addExecLogs(action: string, data: string) {
        this.addLogs(`${action} | ${data}`);
    }

    private getSh(action: Actions) {
        return this.app.config.preRunScript
            ? `${this.app.config.preRunScript}; ${this.config.actions[action]}`
            : this.config.actions[action];
    }

    // #endregion
}
