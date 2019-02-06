import React, { Component } from  'react';
import './BookmarkForm.css';

const Required = () => (
  <span className='BookmarkForm__required'>*</span>
)

const noop = () => {}

class BookmarkForm extends Component {
  static defaultProps = {
    onSubmit: noop,
    onCancel: noop,
    bookmark: {},
  };

  state = {
    id: this.props.bookmark.id || '',
    title: this.props.bookmark.title || '',
    url: this.props.bookmark.url || '',
    description: this.props.bookmark.description || '',
    rating: this.props.bookmark.rating || 1,
  };

  handleChangeTitle = e => {
    this.setState({ title: e.target.value })
  };

  handleChangeUrl = e => {
    this.setState({ url: e.target.value })
  };

  handleChangeDescription = e => {
    this.setState({ description: e.target.value })
  };

  handleChangeRating = e => {
    this.setState({ rating: e.target.value })
  };

  handleSubmit = e => {
    e.preventDefault()
    const { id, title, url, description, rating } = this.state
    this.props.onSubmit(
      { id, title, url, description, rating },
      this.resetFields
    )
  };

  resetFields = (newFields) => {
    this.setState({
      id: newFields.id || '',
      title: newFields.title || '',
      url: newFields.url || '',
      description: newFields.description || '',
      rating: newFields.rating || '',
    })
  }

  render() {
    const { error, onCancel } = this.props
    const { title, url, description, rating } = this.state
    return (
      <form
        className='BookmarkForm__form'
        onSubmit={this.handleSubmit}
      >
        <div className='BookmarkForm__error' role='alert'>
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
            value={title}
            onChange={this.handleChangeTitle}
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
            value={url}
            onChange={this.handleChangeUrl}
          />
        </div>
        <div>
          <label htmlFor='description'>
            Description
          </label>
          <textarea
            name='description'
            id='description'
            value={description}
            onChange={this.handleChangeDescription}
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
            min='1'
            max='5'
            required
            value={rating}
            onChange={this.handleChangeRating}
          />
        </div>
        <div className='BookmarkForm__buttons'>
          <button type='button' onClick={onCancel}>
            Cancel
          </button>
          {' '}
          <button type='submit'>
            Save
          </button>
        </div>
      </form>
    );
  }
}

export default BookmarkForm;
