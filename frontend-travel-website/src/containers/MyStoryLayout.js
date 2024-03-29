import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Card from "../components/Card";
import AddCard from "../components/AddCard";

function MyStoryLayout() {
  let history = useNavigate();
  const [storyList, setStoryList] = useState("");
  const host = process.env.REACT_APP_API_URL;

  const callStory = async (token) => {
    const res = await fetch(`${host}/api/myStory`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
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

  const settings = {
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    lazyLoad: true,
    // slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: true,
    centerPadding: "60px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="content">
      <Slider {...settings}>
        <AddCard url={"/addStory"} />
        {storyList &&
          storyList.map((story, index) => {
            return <Card storyData={story} />;
          }).reverse()}
      </Slider>
    </div>
  );
}

export default MyStoryLayout;
