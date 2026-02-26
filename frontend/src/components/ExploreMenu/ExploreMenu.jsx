import React from 'react'
import {menu_list} from '../../assets/assets'
import './ExploreMenu.css'
function ExploreMenu({catagory,setCatagory}) {
  return (
    <div className='explore-menu' id='exploler-menu'>
      <h2> Explore Our Menu</h2>
      <p className='explore-menu-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate aliquid neque, accusamus blanditiis quisquam excepturi, cumque fuga ad inventore enim natus.</p>
       <div className="explore-menu-list">
       {
        menu_list.map((item,index)=>{
          return  (
            <div onClick={()=>setCatagory(
              prev=>prev===item.menu_name?"All":item.menu_name
            )} key={index} className="explore-menu-list-item">
             <img className={catagory===item.menu_name?"active":""} src={item.menu_image} alt="" />
             <p>{item.menu_name}</p>
            </div>
          )
        })
       }
       </div>
       <hr />
        </div>
  )
}

export default ExploreMenu