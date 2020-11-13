import React, { Fragment } from 'react';

const Nl2Br: React.FC<{ children: string }> = ({ children }) => {
    return (
        <>
            {children.split('\n').map((item, key) => {
                return (
                    <Fragment key={key}>
                        {item}
                        <br />
                    </Fragment>
                );
            })}
        </>
    );
};

export default Nl2Br;
