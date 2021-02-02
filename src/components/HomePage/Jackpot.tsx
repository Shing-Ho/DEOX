import React from 'react';

type JackpotProps = {
  price: string
}

function Jackpot({ price }: JackpotProps) {
  return (
    <>
      <div style={{ fontSize: 12.5, padding: 5, color: 'rgba(0,0,0,0.75)' }}>Jackpot - for the cycle</div>
      <div style={{ fontSize: 30, padding: 3, fontWeight: 400, color: 'black' }}>{price}</div>
      <div style={{ fontSize: 12.5, fontWeight: 400, lineHeight: 0.5, color: 'rgba(0,0,0,0.5)' }}>(in DEOX, DEA, USDC)</div>
    </>
  );
}

export default Jackpot;
