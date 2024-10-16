import React from 'react';
import './Admin.css';
import logopng from '../rasm/Frame 146.png'

function Admin() {
  return (
    <div>
      <div className="top">
        <div className="img"><img src={logopng} alt="" /></div>
        <h2 className='h2'>Boshqaruv</h2>
      </div>
      <div className="hr"></div>
    </div>
  );
}

export default Admin;
