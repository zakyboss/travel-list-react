import './index.css' ;

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 2, description: "Charger", quantity: 1, packed: true },
];
function App() {
  return (
    <div className='app' >
      <Logo/>
      <Form/>
      <PackingList/>
      <Stats/>
    </div>
  );
}

function Logo(){
  return (
    <h1>🌴FAR AWAY 💼</h1>
  )
}
function Form() {
  function handleSubmit(e){
e.preventDefault();
console.log(e)
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip 🤔</h3>
      <select>
       {Array.from({length:20},(_,i)=>i+1).map(num=>
      <option value={num} key={num}>{num}</option>
       )}
      </select>
      <input type='text' placeholder='item..' />
    <button>Add</button>
    </form>
  );
}

function Item({item}) {
  return (
    <li >
      <span style={item.packed?{textDecoration:"line-through"}:{}}>{item.quantity} {item.description}</span>
      <button>❌</button>
    </li>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item key={item.id} item={item} />
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
