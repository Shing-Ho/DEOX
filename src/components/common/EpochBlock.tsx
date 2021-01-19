import React from 'react';

type EpochBlockProps = {
  epoch: string
}

function EpochBlock({ epoch }: EpochBlockProps) {
  return (
    <>
      <div style={{ fontSize: 12.5, padding: 3, color: 'black' }}>Epoch</div>
      <div style={{ fontSize: 30, padding: 3, fontWeight: 600, color: 'black' }}>#001</div>
      <div style={{ fontSize: 30, padding: 3, fontWeight: 600, lineHeight: 1.5, color: 'black', marginBottom: 20 }}>{epoch}</div>
    </>
  );
}

export default EpochBlock;
