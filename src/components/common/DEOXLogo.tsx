import React from 'react';

import Logo from '../../assets/DEOXLogo.png';
import Text from '../../assets/DEOXText.png';

export default function DEOXLogo() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img src={Logo} alt="deoxlogo" style={{height: 27, marginRight: 10}} />
      <img src={Text} alt="deoxtext" style={{height: 27}} />
    </div>
  )
}