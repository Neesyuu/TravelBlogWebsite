import React from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function MyStoryLayout() {
  let history = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if(!jwt){
      history('/login');
    }
  }, [])
  

  return (
    <div className="content">
        <ul>
            <li>My Story 1</li>
            <li>My Story 2</li>
            <li>My Story 3</li>
            <li><Link to="/addStory">Add Your Story</Link></li>
        </ul>
    </div>
  )
}

export default MyStoryLayout
