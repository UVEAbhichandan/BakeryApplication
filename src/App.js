import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const handleClick = async() =>{
    try {
      const response = await axios.post('https://3000-uveabhichan-bakeryappli-kw5yw7zcjqn.ws-us107.gitpod.io/api/orders', {
        itemType: 'cake',
    orderState: 'created',
    lastUpdateTime: new Date(),
    bId: '111',
    cId: '990',
    price: '100'
      });
      console.log('Order ID:', response.data.orderId);
    } catch (error) {
      console.error('Error creating order:', error.response ? error.response.data : error.message);
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div
          className="App-link"
          onClick={()=>handleClick()}
        >
          Learn React
        </div>
      </header>
    </div>
  );
}

export default App;
