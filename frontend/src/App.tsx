
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import Signin from "./pages/Signin";
import AddStadium from "./pages/AddStadium";
import { useAppContext } from "./contexts/Appcontext";
import Mystadiums from "./pages/Mystadiums";
import EditStadium from "./pages/Editstadium";
import Search from "./pages/Search";
import Detail from "./pages/Detail";


const App = () => {
    const { isLoggedIn } = useAppContext();

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Search />} />
                </Route>
                <Route path="/register" element={<Layout><Register /></Layout>} />
                <Route path="/search" element={<Layout><Search /></Layout>} />
                <Route path="/detail/:stadiumId" element={<Layout><Detail /></Layout>} />
                <Route path="/signin" element={<Layout><Signin /></Layout>} />

                {isLoggedIn && (
                    <>
                        <Route path="/add-stadium" element={<Layout><AddStadium /></Layout>} />
                        <Route path="/stadium" element={<Layout><Mystadiums /></Layout>} />
                        <Route path="/edit-stadium/:stadiumId" element={<Layout><EditStadium /></Layout>} />
                    </>
                )}

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default App;




