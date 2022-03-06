import React, { Component } from 'react'
class CreateTask extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentItem: {
                text: "",
                key: ""
            }
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInput(e) {
        this.setState({
            currentItem: {
                text: e.target.value,
                key: Date.now()
            }

        })
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.currentItem.text) {
            this.props.addTask(this.state.currentItem);
            this.setState({
                currentItem: {
                    text: "",
                    key: ""
                }
            })
        }
    }
    render() {
        return (
            <div>
                <form id="to-do-form" onSubmit={this.handleSubmit}>
                    <input id="Enter The Value" data-testid='notes-input' onChange={this.handleInput} value={this.state.currentItem.text} placeholder='Enter the text here'></input>
                    <button data-testid='addSubmit' id='add-button' type="submit" >ADD</button>
                </form>
            </div>
        )
    }
}

export default CreateTask