import React, { Component } from  'react';
import './AddBookmark.css';

const Required = () => (
  <span className='AddBookmark__required'>*</span>
)

const URL = `https://thinkful-list-api.herokuapp.com/tomht/bookmarks`

class AddBookmark extends Component {
  static defaultProps = {
    onAddBookmark: () => {}
  };

  state = {
    error: null,
  };

  handleSubmit = e => {
    e.preventDefault()
    // get the form fields from the event
    const { title, url, desc, rating } = e.target
    const bookmark = {
      title: title.value,
      url: url.value,
      desc: desc.value,
      rating: rating.value,
    }
    this.setState({ error: null })
    fetch(URL, {
      method: 'POST',
      body: JSON.stringify(bookmark),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        title.value = ''
        url.value = ''
        desc.value = ''
        rating.value = ''
        this.props.onAddBookmark(data)
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  render() {
    const { error } = this.state
    const { onClickCancel } = this.props
    return (
      <section className='AddBookmark'>
        <h2>Create a bookmark</h2>
        <form
          className='AddBookmark__form'
          onSubmit={this.handleSubmit}
        >
          <div className='AddBookmark__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='title'>
              Title
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='title'
              id='title'
              placeholder='Great website!'
              required
            />
          </div>
          <div>
            <label htmlFor='url'>
              URL
              {' '}
              <Required />
            </label>
            <input
              type='url'
              name='url'
              id='url'
              placeholder='https://www.great-website.com/'
              required
            />
          </div>
          <div>
            <label htmlFor='desc'>
              Description
            </label>
            <textarea
              name='desc'
              id='desc'
            />
          </div>
          <div>
            <label htmlFor='rating'>
              Rating
              {' '}
              <Required />
            </label>
            <input
              type='number'
              name='rating'
              id='rating'
              defaultValue='1'
              min='1'
              max='5'
              required
            />
          </div>
          <div className='AddBookmark__buttons'>
            <button type='button' onClick={onClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default AddBookmark;
