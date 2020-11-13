import { useEffect, useRef, useState } from 'react';
import { App, Config } from '../services/app';

export const useApp = (): [App, Config] => {
    const { current: app } = useRef(new App());
    const [config, setConfig] = useState(app.config);

    useEffect(() => {
        app.load().then(() => {
            setConfig(app.config);
        });
    }, []);

    return [app, config];
};
