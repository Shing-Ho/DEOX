import React from 'react';

type EpochBlockProps = {
  epoch: string
}

function EpochBlock({ epoch }: EpochBlockProps) {
  return (
    <>
      <div style={{ fontSize: 12.5, padding: 5, color: 'rgba(0,0,0,0.75)' }}>Epoch</div>
      <div style={{ fontSize: 30, padding: 3, fontWeight: 400, color: 'black' }}>
        #{epoch.split('-')[0]}
        <span style={{ color: 'rgba(0,0,0,0.3)' }}>/21</span>
      </div>
      <div style={{ fontSize: 30, padding: 3, fontWeight: 400, lineHeight: 1, color: 'black', marginBottom: 20 }}>{epoch.split('-')[1]}</div>
    </>
  );
}

export default EpochBlock;
