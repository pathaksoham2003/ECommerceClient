import {BrowserRouter as Router , Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Product from "./components/Product";
import AllProducts from "./components/AllProducts";
import Categories from "./components/Categories";
import Profile from "./components/Profile";
import Root from "./components/Root";
import Store from "./components/Store";
import CreateProduct from "./components/CreateProducts";
import EditProfile from "./components/EditProfile";

function App() {
  return (
    <><Router>
      <Routes>
        <Route path="/" element={<Root />}> 
          <Route index element={<AllProducts />} />
          <Route path="/login" element={<Login />} />
          <Route path= "/store" element = {<Store/>}/>
          <Route path="/createproduct" element={<CreateProduct/>}/>
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/useredit/:id" element={<EditProfile />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/product/:cat/:productID" element={<Product />} />
        </Route>
      </Routes>
      </Router>
    </>
  );
}

export default App;
