import React from 'react';

import {
  Header,
} from '@aragon/ui';

import styles from './IconHeader.module.scss';

type IconHeaderProps = {
  icon: any,
  text: string
  small?: boolean
}

function IconHeader({ icon, text, small }: IconHeaderProps) {
  return (
    <>
      <div style={{ padding: '1%', display: 'flex', alignItems: 'center' }}>
        <div style={small ? { marginRight: '1%', fontSize: 25 } : { marginRight: '2%', fontSize: 48 }}>
          {icon}
        </div>
        <div>
          <Header primary={text} style={{ fontSize: 25 }} className={styles.header} />
        </div>
      </div>
    </>
  );
}

export default IconHeader;
