import React from 'react'
import { Link } from 'react-router-dom'
import "./css/AddStory.css"

function AddStoryLayout() {
  return (
    <div className="content">
        <h2 className="sub_title">Add Your Story</h2>
        <div className="formBg">
            <div className="closeBTN">
                <Link to="/myStory">Close</Link>
            </div>
            <div className="form">
                <span>Description</span>
                <br/>
                <textarea></textarea>
                <div className="subDescription">
                    <div className="subDes1">

                        <div className="subDes1p1">
                            <div className="titleName">Title : </div>
                            <div className="textBox">
                                <input style={{width: "90%"}}/>
                            </div>
                        </div>

                        <div className="subDes1p2">
                            <div className="titleName1">Location : </div>
                            <div className="textBox1">
                                <input style={{width: "90%"}}/>
                            </div>
                            <div className="titleName2">Days : </div>
                            <div className="textBox2">
                                <input style={{width: "78%"}}/>
                            </div>
                        </div>

                        <div className="subDes1p2">
                            <div className="titleName1">Budget : </div>
                            <div className="textBox1">
                                <input style={{width: "90%"}}/>
                            </div>
                        </div>

                        <div className="subDes1p3">
                            <h3>Image</h3>
                            <div className="imageBox">
                                <ul>
                                    <li>Image 1</li>
                                    <li><button>Upload Image</button></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className="subDes2">
                        <h2>Image Here</h2>
                    </div>
                </div>
                <div className="submitBtn">
                    <button>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddStoryLayout
