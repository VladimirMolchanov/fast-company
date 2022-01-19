import React from 'react';

export const SearchStatus = (props) => {
    const renderPhrase = (number) => {
        const lastOne = Number(number.toString().slice(-1));
        if (number > 4 && number < 15) return "человек тусанет";
        if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанут";
        if (lastOne === 1) return "человек тусанет";
        return "человек тусанет";
    };

    return (
        <>
            <h2>
                <span
                    className={"badge " + (props.number > 0 ? "bg-primary" : "bg-danger")}
                >
                    {props.number > 0
                        ? `${props.number + " " + renderPhrase(props.number)} с тобой сегодня`
                        : "Никто с тобой не тусанет"}
                </span>
            </h2>
        </>
    )
}