import React, { Component } from 'react'
import update from 'immutability-helper'
import Idea from './idea'
import IdeaForm from './idea-form'
import './button.css'

class IdeasContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ideas: [],
      editingIdeaId: null,
      notification: ''
    }
  }
  componentDidMount () {
    fetch('http://localhost:3001/api/v1/ideas')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.setState({
        ideas: data
      });
    })
    .catch(error => console.log(error));
  }
  addNewIdea = () => {
    fetch('http://localhost:3001/api/v1/ideas',
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(
        { idea: { title:"", body:"" } }
      )
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const ideas = update(this.state.ideas, {
        $splice: [[0, 0, data]]
      })
      this.setState({
        ideas: ideas,
        editingIdeaId: data.id,
      })
    })
    .catch(error => console.log(error))
  }
  updateIdea = (idea) => {
    const ideaIndex = this.state.ideas.findIndex(x => x.id === idea.id)
    const ideas = update(this.state.ideas, {
      [ideaIndex]: {$set: idea}
    })
    this.setState({
      ideas: ideas,
      notification:'All changes saved'
    })
  }
  resetNotification = () => {
    this.setState({
      notification: ''
    })
  }
  editIdea = (id) => {
    this.setState({
      editingIdeaId: id},
      () => {this.title.focus()}
    )
    this.resetNotification();
  }
  deleteIdea = (id) => {
    fetch(`http://localhost:3001/api/v1/ideas/${id}`,
    {
      method: 'DELETE'
    })
    .then(response => {
      const ideaIndex = this.state.ideas.findIndex(x => x.id === id);
      const ideas = update(this.state.ideas, { $splice: [[ideaIndex, 1]]});
      this.setState({
        ideas: ideas,
        notification:'Idea deleted'
      });
    })
    .catch(error => console.log(error))
  }
  render() {
    return (
      <div>
      <button
      className="newIdeaButton"
      onClick={this.addNewIdea}
      >
        New Idea
      </button>
      <span className="notification">
        {this.state.notification}
      </span>
        <div>
          {this.state.ideas.map((idea) => {
            if (this.state.editingIdeaId !== idea.id) {
              return (
                <Idea idea={idea} key={idea.id}
                editIdea={this.editIdea}
                deleteIdea={this.deleteIdea}>
                </Idea>
              )
            } else {
              return (
                <IdeaForm idea={idea} key={idea.id}
                updateIdea={this.updateIdea}
                resetNotification={this.resetNotification}
                titleRef={input => this.title = input}>
                </IdeaForm>
              )
            }
          })}
        </div>
      </div>
    );
  }
}

export default IdeasContainer
