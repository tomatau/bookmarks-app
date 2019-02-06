import React from 'react'

const BookmarksContext = React.createContext({
  bookmarks: [],
  addBookmark: () => {},
  deleteBookmark: () => {},
  updateBookmark: () => {},
})

export default BookmarksContext
