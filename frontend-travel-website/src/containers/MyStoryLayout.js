import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function MyStoryLayout() {
  let history = useNavigate();
  const [storyList, setStoryList] = useState("");

  const callStory = async (token) => {
    const host = "http://localhost:5000";
    const res = await fetch(`${host}/api/myStory`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
    });
    const jsonData = await res.json();
    setStoryList(jsonData);
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      history("/login");
    } else {
      callStory(jwt);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="content">
      <ul>
        {storyList &&
          storyList.map((story, index) => {
            return (
              <li key={index}>
                <Link to={`/story/${story._id}`}>{story.title}</Link>
              </li>
            );
          })}
        <li>
          <Link to="/addStory">Add Your Story</Link>
        </li>
      </ul>
    </div>
  );
}

export default MyStoryLayout;
