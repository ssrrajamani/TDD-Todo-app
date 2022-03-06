import React from 'react'
import './ListItems.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function ListItems(props) {


    let items = props.itemList;
    let list = items.map(item => {
        return (
            <div className='list' key={item.key} >
                <p>
                    <input type="text" data-testid={item.key} id={item.key} value={item.text}
                        onChange={(e) => { props.updateList(e.target.value, item.key) }
                        } />
                    <span>
                        <FontAwesomeIcon className='faicons' data-testid={"deleteButton" + item.key}
                            onClick={() => { props.deleteItem(item.key) }} icon='trash' />
                    </span>
                </p>
            </div>
        )
    })

    return (
        <div>{list}</div>
    )
}
export default ListItems;