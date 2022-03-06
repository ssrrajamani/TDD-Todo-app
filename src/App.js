import './App.css';
import React from 'react';
import ListItems from './ListItems';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import CreateTask from './CreateTask';

library.add(faTrash);
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: {
        text: '',
        key: ''
      }
    }
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.updateList = this.updateList.bind(this);
  }



  addItem(item) {
    let newItem = item;
    const updatedItemList = [...this.state.items, newItem];
    this.setState({
      items: updatedItemList,
      currentItem: {
        text: "",
        key: ""
      }
    })
  }

  deleteItem(key) {
    let filteredList = this.state.items.filter(
      item => item.key !== key);
    this.setState({
      items: filteredList
    })
  }

  updateList(value, key) {
    let items = this.state.items;
    items.map(
      item => {
        if (item.key === key) {
          item.text = value;
        }
      }
    )
    this.setState({
      items: items
    })
  }


  render() {
    return (
      <div className='App'>
        <header>
          <CreateTask addTask={this.addItem}></CreateTask>
          <ListItems itemList={this.state.items} deleteItem={this.deleteItem} updateList={this.updateList}></ListItems>
        </header>
      </div>
    )
  }
}

export default App;
