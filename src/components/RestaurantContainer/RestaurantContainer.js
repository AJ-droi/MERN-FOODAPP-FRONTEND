import React, {useEffect} from 'react'
import tableChair from "../../assets/tableChair.svg"
import search from "../../assets/search.svg"
import "./RestaurantContainer.css"
// import hamburger from "../../assets/hamburger.svg"
// import kfc from "../../assets/kfc.png"
// import pizza from "../../assets/pizza-hut.svg"git 
import {useParams} from "react-router"
import { useAuth } from '../../context/authcontext'

const RestaurantContainer = () => {
    let {vendorId} = useParams()
    const {GetAllVendorsFood, getVendorFood} = useAuth()

    useEffect(() => {
        GetAllVendorsFood(vendorId);
       // eslint-disable-next-line
    }, [])
    
  return (
    <div>
        <div className='rest-header'>
            <h3>Restaurants<span><img src={tableChair} alt="" /></span></h3>
            <form className='rest-form'>
                <input type="text" placeholder="Search"  />
                <img src={search} alt="" />
            </form>
        </div>
        {
          getVendorFood.map((elem)=>(
        <section className="restaurant-card" key={elem.id}>
            <img src={elem.image} alt="img" />
            <div>
                <h3>{elem.name}</h3>
                <p>{elem.description}</p>
                <p>{elem.price}</p>
            </div>
        </section>
          ))
        } 
        {/* <section className="restaurant-card">
            <img src={pizza} alt="" />
            <div>
                <h3>Pizza-Hut</h3>
                <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                </p>
            </div>
        </section>
        <section className="restaurant-card">
            <img src={kfc} alt="" />
            <div>
                <h3>KFC</h3>
                <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                </p>
            </div>
        </section> */}

    </div>
  )
}

export default RestaurantContainer