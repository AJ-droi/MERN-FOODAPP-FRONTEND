import React, {useEffect} from 'react'
import post from "../../assets/post.svg"
import "./Post.css"
import { useAuth } from '../../context/authcontext'
import {Link} from "react-router-dom"

const Post = () => {
  const {GetAllVendors, getVendors} = useAuth()

  console.log(getVendors)
  useEffect(() => {
    GetAllVendors();
   // eslint-disable-next-line 
  }, [])
  
  return (
    <div className='post'>
        <h3>Recent Post <span><img src={post} alt="" /></span></h3>
        <div className="flexDiv">
         {getVendors.map((elem) => {
          return (
            <>
            
                <div key={elem.id}>
                <Link to={`/restaurant/${elem.id}`}>
                  <img src={elem.coverImage} alt="" />
                  <h3>{elem.restaurantName}</h3>
                  </Link> 
                </div>
              
             
            </>
            
         )})} 
{/* 
          <div>
            <img src={fries} alt="" />
            <h3>Tantalizer </h3>
          </div>

          <div>
            <img src={pizza} alt="" />
            <h3>Dominos</h3>
          </div> */}
        </div>
    </div>
  )
}

export default Post
