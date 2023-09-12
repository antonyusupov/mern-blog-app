import { BlogContext } from "../context/BlogContext";
import { useContext } from "react";

export const useBlogContext = () => {
    const context = useContext(BlogContext);

    if(!context) {
        throw Error('You must use the useBlogContext insede a BlogContextProvider')
    }

    return context
}