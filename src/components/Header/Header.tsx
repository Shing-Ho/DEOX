import React from 'react';
import { NavLink } from 'react-router-dom';

import { LinkBase, useTheme } from '@aragon/ui';
import ConnectButton from '../NavBar/ConnectButton';
import { ReactComponent as DeusLogo } from '../../assets/DEUS Logo V1.0.svg';
import { ReactComponent as DownIcon } from '../../assets/Down_Icon.svg';
import styles from './Header.module.scss';


type HeaderProps = {
  hasWeb3: boolean;
  user: string;
  setUser: Function;
};

export default function Header({ hasWeb3, user, setUser }: HeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <DeusLogo />
        <span className={styles.finance}>finance</span>
        {/* {address ? (
          <div className={styles.accountInfo}>
            <div className={styles.accountInfoText}>
              {address}
            </div>
            <div className={styles.accountInfoRightText}>
              {address.slice(address.length - 2)}
            </div>
          </div>
        ) : null} */}
        <div style={{ marginLeft: 20, width: '20%', textAlign: 'right' }}>
          <ConnectButton hasWeb3={hasWeb3} user={user} setUser={setUser} />
        </div>
      </div>
      <div className={styles.right}>
        <TwoLinkButton
          title="DEOX"
          items={[
            { title: 'DASHBOARD', link: '//' },
            { title: 'LOCK', link: '/stake/' },
            { title: 'LP DEOX/DEA', link: '/deoxdea' },
            { title: 'LP DEOX/USDC', link: '/deoxusdc/' },
            { title: 'TRADE', link: 'https://app.deus.finance/swap' },
            { title: 'DEUS BONDS', link: '/deusbonds/' },
            { title: 'WARP', link: '/warp/' },
          ]}
        />
        <div className={styles.rowItem}>
          <span className={styles.text}>LEARN</span>
          <DownIcon />
        </div>
        <div className={styles.rowItem}>
          <span className={styles.text}>APP</span>
          <DownIcon />
        </div>
      </div>
    </div>
  )
};


type linkButtonProps = {
  title: string;
  to: string;
};

type twolinkButtonProps = {
  title: string;
  items: Array<{link: string, title: string}>;
};

function LinkButton({ title, to }: linkButtonProps) {
  return (
    <NavLink
      to={to}
      component={LinkBase}
      external={false}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        marginLeft: '8px',
        marginRight: '8px',
        height: '22px',
        opacity: 1,
      }}
      activeStyle={{ opacity: 1, borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: 'white', borderRadius: 0 }}
    >
      <span style={{ display: 'block', padding: '1%', fontSize: '17px' }}>{title}</span>
    </NavLink>
  );
}

function TwoLinkButton({ title, items }: twolinkButtonProps) {
  return (
    <span style={{position: 'relative'}} className={styles.twoNav}>
      <span className={styles.text}>{title}</span>
      <DownIcon />
      <span className={styles.overlay}>
        {
          items.map(item => {
            return (
              <NavLink
                to={item.link}
                component={LinkBase}
                external={false}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  paddingLeft: '8px',
                  marginRight: '8px',
                  height: '40px',
                  opacity: 1,
                  borderBottomWidth: 2, borderBottomStyle: 'solid', borderBottomColor: '#1b1b1b',
                  width: '100%'
                }}
                activeStyle={{ opacity: 1, borderRadius: 0 }}
              >
                <span style={{ display: 'block', padding: '1%', fontSize: '17px' }}>{item.title}</span>
              </NavLink>
            )
          })
        }
      </span>
    </span>
  );
}