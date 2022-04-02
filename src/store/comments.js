import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../service/comment.service";

const commentSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        createCommentRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        createCommentSuccess: (state, action) => {
            state.entities.push(action.payload);
        },
        deleteCommentSuccess: (state, action) => {
            state.entities = state.entities.filter((c) => c._id !== action.payload);
        },
        deleteCommentRequestFailed: (state, action) => {
            state.error = action.payload;
        }
    }
});

const { reducer: commentsReducer, actions } = commentSlice;
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFailed,
    createCommentRequestFailed,
    createCommentSuccess,
    deleteCommentSuccess,
    deleteCommentRequestFailed
} = actions;

const createCommentRequested = createAction("users/createCommentRequested");
const deleteCommentRequested = createAction("users/deleteCommentRequested");

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};
export const createComments = (payload) => async (dispatch) => {
    dispatch(createCommentRequested());
    try {
        const { content } = await commentService.createComment(payload);
        dispatch(createCommentSuccess(content));
    } catch (error) {
        dispatch(createCommentRequestFailed(error.message));
    }
};
export const removeComment = (commentId) => async (dispatch) => {
    dispatch(deleteCommentRequested());
    try {
        await commentService.removeComment(commentId);
        dispatch(deleteCommentSuccess(commentId));
    } catch (error) {
        dispatch(deleteCommentRequestFailed(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading;

export default commentsReducer;
