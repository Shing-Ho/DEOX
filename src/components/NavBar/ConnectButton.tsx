import React, { useState } from 'react';
import { useWallet } from 'use-wallet';

import {
  Button, IdentityBadge, IconConnect, Box, IconPower, LinkBase,
} from '@aragon/ui';

import { connect } from '../../utils/web3';
import TotalBalance from "./TotalBalance";
import ConnectModal from './ConnectModal';

type connectButtonProps = {
  hasWeb3: boolean,
  user: string,
  setUser: Function
}

function ConnectButton({ hasWeb3, user, setUser }: connectButtonProps) {
  const { status, reset } = useWallet();

  const [isModalOpen, setModalOpen] = useState(false);

  const connectWeb3 = async (wallet) => {
    connect(wallet.ethereum);
    setUser(wallet.account);
  };

  const disconnectWeb3 = async () => {
    setUser('');
    reset();
  };

  const toggleModal = () => setModalOpen(!isModalOpen);

  return status === 'connected' ? (
    <div style={{display: 'flex' }}>
      <div style={{flex: '1'}}/>
      <div>
        <Box padding={4} style={{width: '192px',  backgroundColor: '#0e1d1d', borderColor: '#234545'}}>
          <div style={{display: 'flex'}}>
            {/* <div>
              <LinkBase onClick={disconnectWeb3} style={{marginRight: '8px', height: '24px'}}>
                <IconPower />
              </LinkBase>
            </div> */}
            <div style={{flex: '1', textAlign: 'center'}}>
              {/* <IdentityBadge entity={user} /> */}
              {user.slice(0,6) + '...' + user.slice(user.length - 4, user.length)}
            </div>
          </div>
          {/* <div style={{display: 'flex'}}>
            <div style={{flex: '1', textAlign: 'right'}}>
              <TotalBalance user={user} />
            </div>
          </div> */}
        </Box>
      </div>
    </div>
  ) : (
    <>
      <ConnectModal visible={isModalOpen} onClose={toggleModal} onConnect={connectWeb3}/>
      <Button label="connect wallet" onClick={toggleModal} disabled={!hasWeb3} style={{ backgroundColor: '#0e1d1d', borderColor: '#234545', borderRadius: 6 }} />
    </>
  );
}


export default ConnectButton;
