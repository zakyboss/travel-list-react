import './index.css'
export default function Stats({items}){
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