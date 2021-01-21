import React from 'react';
import { NavLink } from 'react-router-dom';

import { LinkBase, useTheme } from '@aragon/ui';
// import logoUrl from '../../assets/DEOXLogo.png';
import { ReactComponent as DEOXLogo } from '../../assets/DEOX.svg';
import textLogo from '../../assets/DEOXText.png';
import styles from './navbar.module.scss';

function NavBar() {
  const currentTheme = useTheme();
  // const logoUrl = `./logo/logo_${currentTheme._name === 'light' ? 'black' : 'white'}.svg`;

  return (
    <>
      <div
        style={{
          borderTop: '1px solid ' + currentTheme.border,
          backgroundColor: 'none',
          textAlign: 'center',
          height: '128px',
          width: '100%',
          fontSize: '14px',
        }}
      >
        <div style={{ maxWidth: '1100px', marginLeft: 'auto', marginRight: 'auto' }}>
          <div style={{ display: 'flex', paddingTop: '24px' }}>
            <div style={{ width: '20%', textAlign: 'left' }}>
              <NavLink target="_self" to="/" component={LinkBase} style={{ marginRight: '16px', height: '40px', display: 'flex', alignItems: 'center' }}>
                {/* <img src={logoUrl} height="40px" alt="Empty Set Dollar" /> */}
                <DEOXLogo height="40px" />
                <img src={textLogo} height="25px" alt="Deox Text" style={{ marginLeft: 15 }} />
              </NavLink>
            </div>
            <div style={{ width: '80%', textAlign: 'right' }}>
              <LinkButton title="DASHBOARD" to="//" />
              <LinkButton title="STAKE" to="/stake/" />
              <TwoLinkButton title="LIQUIDITY" />
              {/* <LinkButton title="TRADE" to="/trade/" /> */}

              <a 
                style={{
                  alignItems: 'center',
                  paddingLeft: '8px',
                  height: '22px',
                  opacity: 1,
                  textDecoration: 'auto',
                  width: '100%', padding: '1%', fontSize: '17px'
                }} href="https://app.deus.finance/swap">TRADE</a>
              <LinkButton title="DEUS BONDS" to="/deusbonds/" />
              <LinkButton title="WARP" to="/warp/" />
              {/* <LinkButton title="Governance" to="/governance/" /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

type linkButtonProps = {
  title: string;
  to: string;
};

type twolinkButtonProps = {
  title: string;
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

function TwoLinkButton({ title }: twolinkButtonProps) {
  return (
    <span style={{position: 'relative'}} className={styles.twoNav}>
      <span style={{ padding: '1%', fontSize: '17px' }}>{title}</span>
      <span style={{ position: 'absolute', top: 25, left: 0 }} className={styles.overlay}>
        <NavLink
          to={'/deoxdea/'}
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
          <span style={{ display: 'block', padding: '1%', fontSize: '17px' }}>{'DEOX/DEA'}</span>
        </NavLink>
        <NavLink
          to={'/deoxusdc/'}
          component={LinkBase}
          external={false}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            marginLeft: '8px',
            marginRight: '8px',
            height: '40px',
            opacity: 1,
          }}
          activeStyle={{ opacity: 1, borderRadius: 0 }}
        >
          <span style={{ display: 'block', padding: '1%', fontSize: '17px' }}>{'DEOX/USDC'}</span>
        </NavLink>
      </span>
    </span>
  );
}

export default NavBar;
