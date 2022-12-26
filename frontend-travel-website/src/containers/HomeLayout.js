import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStory } from "../store/slices/storySlice";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Card from "../components/Card";
import { Helmet } from "react-helmet";
import AddCard from "../components/AddCard";

function HomeLayout() {
  const dispatch = useDispatch();
  const { isLoading, isError, data } = useSelector((state) => state.story);

  useEffect(() => {
    dispatch(fetchStory());
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
    <>
      <div className="content">
        <Helmet>
          <style>{"body { background: #c9cbfb; }"}</style>
        </Helmet>
        {isLoading && <h2>Loading ... </h2>}
        {!isLoading && isError && <h2>!! Error Occured !!</h2>}
        <Slider {...settings}>
        <AddCard url={"/aboutMe"} editCard={true} title='About Me' imageURL='aboutMe.jpg' />
          {!isLoading &&
            !isError &&
            data.map((storyData, index) => {
              return <Card storyData={storyData} />;
            }).reverse()}
        </Slider>
      </div>
    </>
  );
}

export default HomeLayout;
