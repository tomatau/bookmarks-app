import React from 'react';

export default function Nav(props) {
  return (
    <nav className='Nav'>
      <button onClick={() => props.clickPage('list')}>
        Bookmark List
      </button>
      {' '}
      <button onClick={() => props.clickPage('add')}>
        Add Bookmark
      </button>
    </nav>
  );
}
