import React from 'react';
import Item from '../Components/Item/Item';
import Search from '../Components/Search/Search';

const Shop = () => {
  return (
    <div>
      <Item /> {/* Bu yerda Item faqat Shop sahifasida ko'rsatiladi */}
      <Search/>
    </div>
  );
};

export default Shop;