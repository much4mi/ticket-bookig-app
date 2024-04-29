import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import Signin from "./pages/Signin";
import AddStadium from "./pages/AddStadium";
import { useAppContext } from "./contexts/Appcontext";
import Mystadiums from "./pages/Mystadiums";
import EditStadium from "./pages/Editstadium";

const Home = () => <h1>Home Page</h1>;
const About = () => <h1>About Page</h1>;
const Contact = () => <h1>Contact Page</h1>;

const App = () => {
  const  isLoggedIn = useAppContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/register" element={<Layout>
          <Register/>
          </Layout>
          } />


<Route path="/signin" element={<Layout>
          <Signin/>
          </Layout>
          } />
         
          
          {isLoggedIn &&(<><Route path ="/add-Stadium" element={<Layout><AddStadium/></Layout>}/>
          <Route path="/stadium" element={<Layout>
          <Mystadiums/>
          </Layout>
       
          
          } />
          <Route 
    path="/edit-stadium/:stadiumId" 
    element={
        <Layout>
            <EditStadium/>
        </Layout>
    } 
/>

       
          
          } />
          </>)}
        <Route path="/about" element={<About></About>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
