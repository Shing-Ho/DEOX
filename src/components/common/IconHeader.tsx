import React from 'react';

import {
  Header,
} from '@aragon/ui';

type IconHeaderProps = {
  icon: any,
  text: string
  small?: boolean
}

function IconHeader({ icon, text, small }: IconHeaderProps) {
  return (
    <>
      <div style={{ padding: '1%', display: 'flex', alignItems: 'center' }}>
        <div style={small ? { marginRight: '1%', fontSize: 32 } : { marginRight: '2%', fontSize: 48 }}>
          {icon}
        </div>
        <div>
          <Header primary={text} />
        </div>
      </div>
    </>
  );
}

export default IconHeader;
