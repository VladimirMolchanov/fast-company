import React from 'react';

export const Qualitie = (props) => {
    return (
        <>
            <span className={"ms-2 badge bg-" + props.color}>
                {props.name}
            </span>
        </>
    )
}
