import { useState } from 'react';
import './index.css' ;

function App() {
  const [items,setItems]=useState([]);
  function handleAddItems(item){
    setItems((items)=>[...items,item])
    }

   function handleOnDeleteItem(id){
             setItems(item=>item.filter(item=> item.id!==id));
   }
   function handleOnToggleItem(id){
    setItems(items=> items.map(item=>item.id===id?{...item,packed:!item.packed}:item))
   }
function handleListClearing(){
  const confirmClearAll = window.confirm("Are you sure you wanna clear everything ?")
if(confirmClearAll)  setItems([])
}
  return (
    <div className='app' >
      <Logo/>
      <Form onAddItems={handleAddItems}/>
      <PackingList items={items}  onDeleteItem={handleOnDeleteItem} onToggleItem={handleOnToggleItem} onClearList={handleListClearing}/>
      <Stats items={items}/>
    </div>
  );
}

function Logo(){
  return (
    <h1>🌴FAR AWAY 💼</h1>
  )
}
function Form({onAddItems}) {
  const [desc , setDesc]= useState("");
const [quantity,setQuantity]=useState(1)

  function handleSubmit(e){
e.preventDefault();
if(!desc) return
const newItem = {desc,quantity,packed:false,id:Date.now()}
   console.log(newItem)
   onAddItems(newItem)
   setDesc("");
   setQuantity(1)
}

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip 🤔</h3>
      <select value={quantity} onChange={(e)=> setQuantity(Number(e.target.value))}>
       {Array.from({length:20},(_,i)=>i+1).map(num=>
      <option value={num} key={num}>{num}</option>
       )}
      </select>
      <input type='text' placeholder='item..'  value={desc} onChange={(e)=> setDesc(e.target.value)}/>
    <button >Add</button>
    </form>
  );
}

function Item({item ,onDeleteItem , onToggleItem}) {
  
 return (
    <li >
      <input type='checkbox' checked={item.packed}  onChange={()=> onToggleItem(item.id)}  />
      <span style={item.packed?{textDecoration:"line-through"}:{}}>{item.quantity} {item.desc}</span>
      <button  onClick={()=> onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

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
function Stats({items}){
  const totalItems = items.length;
  const packedItems = items.filter(item=> item.packed).length;
  const percentage = Math.floor(packedItems/totalItems*100)
  if(!items.length) return  <footer className='stats'>
  <em> Start Adding some Items to your List 😋</em>
 </footer>
  if(percentage<100){
    return (
      <footer className='stats'>
       <em> You have {totalItems} items on your list , and you already packed {packedItems} ({percentage}%)  </em>
      </footer>
    )
  }else {
    return  <footer className='stats'>
    <em> You are all set to go baby ✈</em>
   </footer>
  }


 
}
export default App;
