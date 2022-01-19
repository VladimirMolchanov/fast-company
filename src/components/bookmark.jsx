import React from 'react';

export const Bookmark = (props) => {
    return (
        <>
            <button aria-label="bookmark" onClick={() => {props.onBookmark(props.id)}}>
                {props.bookmark
                    ? <i className="bi bi-bookmark-fill"/>
                    : <i className="bi bi-bookmark"/>}
            </button>
        </>
    )
}
