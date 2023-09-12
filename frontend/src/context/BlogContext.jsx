import { createContext, useReducer } from "react";

export const BlogContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const blogReducer = (state, action ) => {
    switch (action.type) {
        case 'SET_BLOG':
            return { blogs: action.payload }
        case 'CREATE_BLOG':
            return {
                blogs: [ action.payload, ...state.blogs ]
            }

        case 'DELETE_BLOG':
            return {
                blogs: state.blogs.filter((b) => b._id !== action.payload._id)
            }

        case 'EDIT_BLOG':{
            const updatedBlogs = state.blogs.map((blog) => {
                if (blog._id === action.payload._id) {
                return { ...blog, ...action.payload.updatedData }
                }
                return blog;
            })
            return {
                blogs: updatedBlogs
            };}
        default:
            return state
    }
}

// eslint-disable-next-line react/prop-types
export const BlogContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(blogReducer, {
        blogs: null
    })

    return (
        <BlogContext.Provider value={{...state, dispatch}}>
            { children }
        </BlogContext.Provider>
    )
}