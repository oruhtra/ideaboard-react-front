import React, { Component } from 'react'
import './idea.css'

class IdeaForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.idea.title,
      body: this.props.idea.body
    }
  }
  handleInput = (event) => {
    this.props.resetNotification()
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  handleBlur = () => {
    const idea = {
      title: this.state.title,
      body: this.state.body
    }
    fetch(`http://localhost:3001/api/v1/ideas/${this.props.idea.id}`,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(
        { idea: idea }
      )
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      this.props.updateIdea(data)
    })
    .catch(error => console.log(error))
  }
  render() {
    return (
      <div className="tile">
        <form onBlur={this.handleBlur} >
          <input className='input' type="text"
            name="title" placeholder='Enter a Title'
            value={this.state.title}
            onChange={this.handleInput}
            ref={this.props.titleRef}/>
          <textarea className='input' name="body"
            placeholder='Describe your idea'
            value={this.state.body}
            onChange={this.handleInput}></textarea>
        </form>
      </div>
    );
  }
}

export default IdeaForm
