import { Link } from "react-router-dom"


const Header =()=>{
    return(
        <nav>
        <div>
          <ul>
            <li>
              <Link to ={{pathname: "/" }} >Add Order</Link>
            </li>
            <li>
              <Link to ={{pathname: "/analytics" }} >Analytics</Link>
            </li>
          </ul>
        </div>
        </nav>
    )
}
export default Header;



