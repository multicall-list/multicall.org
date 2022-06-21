import React, { useState, useCallback } from 'react'
import './index.scss';
import * as networks from '../../networks.json';
import { debounce } from '../../debounce';

export const Home: React.FC = () => {
  const [copied, setCopied] = useState(-1)
  const debouncedSwitchCopied = debounce(() => setCopied(-1), 3000)

  const onCopyInfo = useCallback((id: number, text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(id)
        debouncedSwitchCopied()
      })
      .catch(console.error)


    setCopied(id)
    debouncedSwitchCopied()
  }, [debouncedSwitchCopied])

  return (
    <div className='container'>
      <aside className='container--aside'>
        <h1>Multicall List</h1>
        <p>A website that lists multicall contract addresses for various networks.</p>
        <button><a href="/" rel="noopener noreferrer" target="_blank">View Code</a></button>
      </aside>
      <section className='container--networks'>
        {Object.values(networks).map(({name, address}, index) => (
          <div className='network' key={index}>
            <div className='network--text-content'>
              <h3>{name}</h3>
              <button onClick={() => onCopyInfo(index, address)}>
                {copied === index && (
                  <span className='copied'>
                    Copied!
                  </span>
                )}
                {copied !== index && (
                  <span>
                    Copy contract address
                  </span>
                )}
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}