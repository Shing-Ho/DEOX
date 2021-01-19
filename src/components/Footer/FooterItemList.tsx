import React from 'react';
import { LinkBase } from '@aragon/ui';

import styles from './FooterItemList.module.scss';

export default function FooterItemList({ title, items }) {
  return (
    <div className={styles.main}>
      <div className={styles.title}>{title}</div>
      <div className={styles.items}>
        {
          items.map(item => (
            <LinkBase href={item.url} key={item.title}>
              <span>{item.title}</span>
            </LinkBase>
          ))
        }
      </div>
    </div>
  )
}