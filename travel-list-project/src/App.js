import { useState } from 'react';
import Stats from './Stats';
import './index.css' ;
import Logo from './Logo';
import Form from './Form';
import PackingList from './PackingList';
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

export default App;
