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
  return (
    <div className='app' >
      <Logo/>
      <Form onAddItems={handleAddItems}/>
      <PackingList items={items}  onDeleteItem={handleOnDeleteItem} onToggleItem={handleOnToggleItem}/>
      <Stats/>
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

function PackingList({items, onDeleteItem, onToggleItem}) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item}  onDeleteItem={onDeleteItem} onToggleItem={onToggleItem}/>
        ))}
      </ul>
    </div>
  );
}
function Stats(){
  return (
    <footer className='stats'>
     <em> You have X items on your list , and you already packed C % </em>
    </footer>
  )
}
export default App;
