import React, { Component } from  'react';
import BookmarksContext from '../BookmarksContext';
import config from '../config'
import BookmarkForm from '../BookmarkForm/BookmarkForm';

class EditBookmark extends Component {
  static contextType = BookmarksContext;

  state = {
    error: null,
  };

  handleSubmit = (bookmark, resetFieldsCallback) => {
    this.setState({ error: null })
    fetch(`${config.API_ENDPOINT}/${bookmark.id}`, {
      method: 'PATCH',
      body: JSON.stringify(bookmark),
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))

        return res.json()
      })
      .then(data => {
        resetFieldsCallback(data)
        this.context.updateBookmark(data)
        this.props.history.push('/')
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  handleClickCancel = () => {
    this.props.history.push('/')
  };

  getBookmark() {
    const { bookmarks } = this.context
    const { bookmarkId } = this.props.match.params
    return bookmarks.find(bm => bm.id === bookmarkId)
  }

  render() {
    const { error } = this.state
    return (
      <section className='EditBookmark'>
        <h2>Create a bookmark</h2>
        <BookmarkForm
          onSubmit={this.handleSubmit}
          onCancel={this.handleClickCancel}
          error={error}
          bookmark={this.getBookmark()}
        />
      </section>
    );
  }
}

export default EditBookmark;
