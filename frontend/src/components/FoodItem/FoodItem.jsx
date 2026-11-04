import React from 'react';
import MenuCard from '../Menu/MenuCard';

const FoodItem = ({ id, name, price, description, image, category }) => {
  return (
    <MenuCard
      item={{
        _id: id,
        name,
        price,
        description,
        image,
        category: category || 'Ethiopian Traditional'
      }}
    />
  );
};

export default FoodItem;
