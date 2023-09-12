import { useState } from "react";
import { useAuthContext } from "../customHooks/useAuthContext";
import { useBlogContext } from '../customHooks/useBlogContext';


// eslint-disable-next-line react/prop-types
const BlogDetails = ( {props} ) => {
  // eslint-disable-next-line react/prop-types
  const { title, content, username, createdAt, _id } = props

  const [active, setActive] = useState('')
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const [showFullContent, setShowFullContent] = useState(false)
  const { user } = useAuthContext()
  const { dispatch } = useBlogContext()

  const fullScreen = document.getElementById(`${_id}`);

  // formatted date 

  const formatDate = (createdAt) => {
    const date = new Date(createdAt)
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }
    return date.toLocaleString('en-US', options);
  }
  
  const formattedDate = formatDate(createdAt)
// Making Fullscreen view
  const handleDetailsClick = () => {
    
    if(fullScreen.classList.contains(active)) {
      fullScreen.classList.remove(active)
      setActive('')

    } else {
      fullScreen.classList.add('active')
      setActive('active')

    }
  }
  // Closing Fullscreen view
  const closeBtn = () => {
    const activeBlog = document.getElementById(`${_id}`) 
    activeBlog.classList.remove(active)
    setActive('')
  }
  // Togles the Fullscreen view and close
  const toggleActive = () => {
    const isFullScreenActive = fullScreen.classList.contains(active)
    if(!isFullScreenActive) {
      handleDetailsClick()
      setShowFullContent(!showFullContent)
    } else {
      closeBtn()
      setShowFullContent(!showFullContent)
    }
  }
// deleting the blog
  const handleDelete = async () => {
    if(!user) {
      return
    }

    const response = await fetch('/api/blogs/' + _id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if(response.ok) {
      dispatch({type: 'DELETE_BLOG', payload: json})
    } else {
      console.log(json)
    }
  }
// editing the blog
  const handleEditClick = () => {
    if(!user) {
      return
    }
    setIsEditing(true);
  };
// saves the blog to database after the editing
  const handleSave = async () => {
    
    if(!user) {
      return
    }

    const editedBlogData = {
      title: editedTitle,
      content: editedContent,
    };

    const response = await fetch(`/api/blogs/${_id}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify(editedBlogData),
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({
        type: 'EDIT_BLOG',
        payload: {
          _id: _id, // the ID of the edited blog post
          updatedData: {
            title: editedTitle,
            content: editedContent
          }
        }
      });
      setIsEditing(false);
    } else {
      console.log(json);
    }
  };
  


  return (
    <div id={_id} className="text-white my-10 relative flex flex-col justify-center items-start w-full bg-gray-800 rounded-xl px-2 py-4 transition-opacity">
      {isEditing ? (
        <div className="z-50 flex flex-col w-full justify-start p-4 bg-gray-600">
          <label className="text-2xl">Title</label>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="text-black text-3xl my-7 w-full px-2 rounded-lg"
          />
          <label className="text-2xl">Content</label>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="my-4 text-lg text-black w-full px-2 rounded-lg"
          ></textarea>
          <button className="mt-4 p-1 bg-orange-500 rounded-lg outline-none text-black font-semibold w-2/4" onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-start">
          <h2 className="text-white text-3xl my-14 w-full text-start">{title}</h2>
          {/*  eslint-disable-next-line react/prop-types */}
          <p className="my-2 text-lg text-start w-full">{showFullContent ? content : content.slice(0, 100) + '...'}</p>
        </div>
      )}
      <strong className="mr-3 text-start w-full my-2">Username: {username}</strong>
      <span className="mr-3 text-start w-full my-2">Created at: {formattedDate}</span>

      <div className="flex flex-col absolute top-3 right-8">
        <button
          id="openClose"
          className="mt-4 p-1 bg-orange-500 rounded-lg outline-none text-black font-semibold"
          onClick={toggleActive}
        >
          {active === 'active' ? 'Close' : 'Details'}
        </button>
      </div>
      <div className="w-full mt-6">
        {user && <div className="w-full">
        {user.username === username ? (
          <div className="flex justify-evenly w-full">
            {isEditing ? (
              <button className="mt-4 p-1 bg-orange-500 rounded-lg outline-none text-black font-semibold" onClick={() => setIsEditing(false)}>Cancel</button>
            ) : (
              <button className="mt-4 px-2 py-1 bg-orange-500 rounded-lg outline-none text-black font-semibold" onClick={handleEditClick}>Edit</button>
            )}
            <button className="mt-4 p-1 bg-orange-500 rounded-lg outline-none text-black font-semibold" onClick={handleDelete}>Delete</button>
          </div>
        ) : (
          ''
        )}
        </div>}
      </div>
    </div>
  );
}

export default BlogDetails