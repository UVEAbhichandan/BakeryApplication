import { useState } from "react";
import { itemType, orderState } from "../constants";
import axios from "axios";
import Header from "./Header";


export default function AddOrder(){
    const [formData, setFormData] = useState({
        itemType: '',
        orderState: '',
        lastUpdateTime: '',
        bId: '',
        cId: '',
        price: ''
      });


      const handleClick = async(e) =>{
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3000/api/orders', formData);
          console.log(response)
        } catch (error) {
          console.error('Error creating order:', error.response ? error.response.data : error.message);
        }
      }
   
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
   
      return (
        <>
        <Header />
        <div className="form-container">
          <h2>Order Form</h2>
          <form onSubmit={handleClick}>
            <div className="form-group">
              <label htmlFor="itemType">Item Type:</label>
              <select
              id="itemType"
              name="itemType"
              value={formData.itemType}
              onChange={handleChange}
              required
            >
              <option value="">Select a role</option>
              <option value={itemType.CAKE}>{itemType.CAKE}</option>
              <option value={itemType.COOKIES}>{itemType.COOKIES}</option>
              <option value={itemType.MUFFINS}>{itemType.MUFFINS}</option>
            </select>
            </div>
   
            <div className="form-group">
          <label htmlFor="orderState">Order State:</label>
          <select
            id="orderState"
            name="orderState"
            value={formData.orderState}
            onChange={handleChange}
            required
          >
            <option value="">Select a role</option>
            <option value={orderState.CREATED}>{orderState.CREATED}</option>
            <option value={orderState.SHIPPED}>{orderState.SHIPPED}</option>
            <option value={orderState.DELIVERED}>{orderState.DELIVERED}</option>
            <option value={orderState.CANCELLED}>{orderState.CANCELLED}</option>
          </select>
        </div>
   
            <div className="form-group">
              <label htmlFor="email">Last Update Time:</label>
              <input
                type="date"
                id="lastUpdateTime"
                name="lastUpdateTime"
                value={formData.lastUpdateTime}
                onChange={handleChange}
                required
              />
            </div>


            <div className="form-group">
              <label htmlFor="bId">Branch ID:</label>
              <input
                type="text"
                id="bId"
                name="bId"
                value={formData.bId}
                onChange={handleChange}
                required
              />
            </div>


            <div className="form-group">
              <label htmlFor="cId">Customer ID:</label>
              <input
                type="text"
                id="cId"
                name="cId"
                value={formData.cId}
                onChange={handleChange}
                required
              />
            </div>


            <div className="form-group">
              <label htmlFor="price">Order Price:</label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
   
            <button type="submit">Submit</button>
          </form>
        </div>
        </>
      );
}

