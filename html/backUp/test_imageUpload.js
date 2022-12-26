import React from "react";
import { useState } from "react";
import axios from "axios";

function Test() {
  const jwt = localStorage.getItem("jwt");
  const [image, setImage] = useState([]);
  const [category, setCategory] = useState("electronics");
  console.log(image,12);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", "testFinal");
    Array.from(image).forEach((item) => {
        console.log(item)
      formData.append("image", item);
    });

    // formData.append("image", image);
    // console.log(image[0].name)

    const url = "http://localhost:5000/api/TravelDetails";

    axios.post('http://localhost:5000/api/TravelDetails', formData, {
      headers: {
        'token': jwt
      }
    }).then((res)=>{
      console.log(res.data)
    }).catch(err=>{
      console.log(err);
    })

    // try{
    //   const res = await axios.post(url, formData, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       token: jwt,
    //     }
    //   });
    //   console.log(res.data);
    // }catch(err){
    //   console.log(err);
    // }
    
  };

  return (
    <div>
      {Array.from(image).map((item) => {
        return (
          <span>
            <img
              style={{ padding: "10px" }}
              width={150}
              height={100}
              src={item ? URL.createObjectURL(item) : null}
            />
          </span>
        );
      })}

      <input
        onChange={(e) => {
          setImage(e.target.files);
        }}
        multiple
        type="file"
      />
      <input
        onChange={(e) => setCategory(e.target.value)}
        type="text"
        value={category}
      />
      <button onClick={handleSubmit}> SUBMIT</button>
    </div>
  );
}

export default Test;
