import React from 'react'
import menu_list from '../../assets/assets'
import './ExploreMenu.css'
function ExploreMenu() {
  return (
    <div className='explolerMenu'>
      <h2> Explore Menu</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate aliquid neque, accusamus blanditiis quisquam excepturi, cumque fuga ad inventore enim natus. Ipsum magni ullam ad, ducimus temporibus repellendus! Quisquam, suscipit.</p>
       <div className="menu-item">
       {
        menu_list.map((list,index)=>{
          return (
            <div key={index} className="menu-item-container">
             <img src={list.menu_image} alt="" />
             <p>{list.name}</p>
            </div>
          )
        })
       }
       </div>
        </div>
  )
}

export default ExploreMenu