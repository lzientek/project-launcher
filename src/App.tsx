import React from 'react';
import { render } from 'react-dom';

import Main from './container/Main';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

const App = () => {
    return (
        <>
            <Main />
        </>
    );
};

render(<App />, mainElement);
