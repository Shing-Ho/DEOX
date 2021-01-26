import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box, LinkBase, Tag,
} from '@aragon/ui';
import EpochBlock from "../common/EpochBlock";
import LOCK from '../../assets/LockIcon.png';
import DEOXDEA from '../../assets/DEOXDEA.png';
import DEOXUSDC from '../../assets/DEOXUSDC.png';
import TRADE from '../../assets/TRADE.png';
import DEUSBONDS from '../../assets/DEUSBONDS.png';
import REGULATION from '../../assets/REGULATION.png';
import Weight from '../../assets/weight.png';

function epochformatted() {
  const epochStart = 1599148800;
  const epochPeriod = 8 * 60 * 60;
  const hour = 60 * 60;
  const minute = 60;
  const unixTimeSec = Math.floor(Date.now() / 1000);

  let epochRemainder = unixTimeSec - epochStart
  const epoch = Math.floor(epochRemainder / epochPeriod);
  epochRemainder -= epoch * epochPeriod;
  const epochHour = Math.floor(epochRemainder / hour);
  epochRemainder -= epochHour * hour;
  const epochMinute = Math.floor(epochRemainder / minute);
  epochRemainder -= epochMinute * minute;
  return `${epoch}-0${epochHour}:${epochMinute > 9 ? epochMinute : "0" + epochMinute.toString()}:${epochRemainder > 9 ? epochRemainder : "0" + epochRemainder.toString()}`;
}

type HomePageProps = {
  user: string
};

function HomePage({user}: HomePageProps) {
  const history = useHistory();

  const [epochTime, setEpochTime] = useState("0-00:00:00");

  useEffect(() => {
    let isCancelled = false;

    async function updateUserInfo() {
      if (!isCancelled) {
        setEpochTime(epochformatted())
      }
    }
    updateUserInfo();
    const id = setInterval(updateUserInfo, 1000);

    // eslint-disable-next-line consistent-return
    return () => {
      isCancelled = true;
      clearInterval(id);
    };
  }, [user]);

  return (
    <>
      <div style={{ marginBottom: 50, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <img src={Weight} alt="weight" />
        <div style={{ fontFamily: 'Edu Monument Grotesk Semi-Mono', fontSize: 30, color: 'white' }}>
          DEOX THE STABLE COIN OF DEUS
        </div>
        <div style={{ fontFamily: 'Edu Monument Grotesk Semi-Mono', fontSize: 15, color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
          Buy, sell, and provide liquidity for DEOX to earn.
        </div>
        <div style={{ fontFamily: 'Edu Monument Grotesk Semi-Mono', fontSize: 15, color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
          This should be some text explaining everything briefly.
        </div>
      </div>
      <div style={{ padding: '1%', display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flexBasis: '30%', flexGrow: 1, marginLeft: '2%', textAlign: 'left'}}>
          <Box style={{ background: 'linear-gradient(90deg, #DFF4FE 0%, #8EB5FF 100%)' }}>
            <EpochBlock epoch={epochTime}/>
          </Box>
        </div>
        <div style={{ flexBasis: '68%' }} />
      </div>
      <div style={{ padding: '1%', display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flexBasis: '30%', marginRight: '1%', marginLeft: '2%'  }}>
          <MainButton
            title="LOCK"
            description="Earn rewards for locking DEOX"
            icon={<img src={LOCK} alt="lock" style={{width: 35}} />}
            onClick={() => {
              history.push('/stake/');
            }}
          />
        </div>

        <div style={{ flexBasis: '30%' }}>
          <MainButton
            title="LP Rewards"
            description="Earn rewards for providing liquidity"
            icon={<img src={DEOXDEA} alt="deoxdea" />}
            onClick={() => {
              history.push('/deoxdea/');
            }}
          />
        </div>

        <div style={{ flexBasis: '30%', marginLeft: '1%' }}>
          <MainButton
            title="LP Rewards"
            description="Earn rewards for providing liquidity"
            icon={<img src={DEOXUSDC} alt="deoxusdc" />}
            onClick={() => {
              history.push('/deoxusdc/');
            }}
          />
        </div>
      </div>
      <div style={{ padding: '1%', display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flexBasis: '30%', marginRight: '1%', marginLeft: '2%' }}>
          <MainButton
            title="Trade"
            description="Trade DEOX"
            icon={<img src={TRADE} alt="trade" />}
            onClick={() => {
              history.push('/governance/');
            }}
          />
        </div>

        <div style={{ flexBasis: '30%' }}>
          <MainButton
            title="DEUS BONDS"
            description="Purchase and redeem coupons"
            icon={<img src={DEUSBONDS} alt="deusbonds" />}
            onClick={() => {
              history.push('/deusbonds/');
            }}
          />
        </div>

        <div style={{ flexBasis: '30%', marginLeft: '1%'  }}>
          <MainButton
            title="REGULATION"
            description="Network supply regulations statistics"
            icon={<img src={REGULATION} alt="regulation" />}
            onClick={() => {
              history.push('/deusbonds/');
            }}
          />
        </div>
      </div>
    </>
  );
}

type MainButtonPropx = {
  title: string,
  description: string,
  icon: any,
  onClick: Function,
  tag?:string
}

function MainButton({
  title, description, icon, onClick, tag,
}:MainButtonPropx) {
  return (
    <LinkBase onClick={onClick} style={{ width: '100%' }}>
      <Box style={{ backgroundColor: '#d7eefe' }}>
        <div style={{ padding: 0, fontSize: 25, fontWeight: 400, color: 'black' }}>
          {title}
          {tag ? <Tag>{tag}</Tag> : <></>}
        </div>
        <span style={{ fontSize: 48 }}>
          {icon}
        </span>
        {/*<img alt="icon" style={{ padding: 10, height: 64 }} src={iconUrl} />*/}
        <div style={{ paddingTop: 5, opacity: 0.5, color: 'rgba(0,0,0,0.5)', fontSize: 15, fontWeight: 400 }}>
          {' '}
          {description}
          {' '}
        </div>

      </Box>
    </LinkBase>
  );
}

export default HomePage;
