import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStory } from "../store/slices/storySlice";

function HomeLayout() {
  const dispatch = useDispatch();
  const { isLoading, isError, data } = useSelector(state => state.story);

  useEffect(()=>{
    dispatch(fetchStory());
  },[])

  return (
    <div className="content">
      <ul>
      {isLoading && <h2>Loading ... </h2>}
      {!isLoading && isError && <h2>!! Error Occured !!</h2>}
      {!isLoading && !isError && data && 
        data.map((storyData, index)=>{
          return(            
              <li key={index}>
                <Link to={`/story/${storyData._id}`}>{storyData.title}</Link>
              </li>            
          )
        })
      }
      </ul>
    </div>
  );
}

export default HomeLayout;
