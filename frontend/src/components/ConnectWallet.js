import React from 'react';

import { NetworkErrorMessage } from './NetworkErrorMessage';

export function ConnectWallet({ connectWallet, networkError, dismiss }) {
  return (
    <div className='container'>
      <div className='row justify-content-md-center'>
        <div className='col-12 text-center'>
          {/* Metamask network should be set to Localhost:8545. */}
          {networkError && (
            <NetworkErrorMessage message={networkError} dismiss={dismiss} />
          )}
        </div>
        <div className='col-6 p-4 text-center'>
          <p>Please connect to Metamask</p>
          <button
            className='btn btn-info btn-lg'
            type='button'
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}
