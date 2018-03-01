import React, { Component } from 'react'
import './tile.css'

class Idea extends Component {
  handleClick = () => {
    this.props.editIdea(this.props.idea.id)
  }
  handleDelete = () => {
    this.props.deleteIdea(this.props.idea.id)
  }
  render () {
    return (
      <div className="tile" key={this.props.idea.id}
      onClick={this.handleClick}>
        <span className="deleteButton" onClick={this.handleDelete}>
          x
        </span>
        <h4>
          {this.props.idea.title}
        </h4>
        <p>
          {this.props.idea.body}
        </p>
      </div>
    )
  }
}

export default Idea
