import Item from "./Item";
import { useState } from "react";
import './index.css'
export default 
function PackingList({items, onDeleteItem, onToggleItem, onClearList}) {
const [sortBy,setSortBy]= useState('input')
let sortedItems;
if(sortBy==='input') sortedItems=items.slice();
if(sortBy==='description') sortedItems=items.slice().sort((a,b)=>a.desc.localeCompare(b.desc));
if(sortBy==='packed') sortedItems=items.slice().sort((a,b)=> Number(a.packed)-Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item key={item.id} item={item}  onDeleteItem={onDeleteItem} onToggleItem={onToggleItem}/>
        ))}
      </ul> 
      <div className='actions'>
        <select value={sortBy}  onChange={(e)=> setSortBy(e.target.value)}>
          <option value='input'>Sort By order of Input</option>
          <option value='description'>Sort By Alphabetical order </option>
          <option value='packed'>Sort By Packed Status </option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}