import BasePage from '../src/pages/BasePage';
import NewVideo from '../src/pages/NewVideo';
import Home from '../src/pages/Home';
import {BrowserRouter, Routes, Route}  from "react-router-dom";

function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BasePage />}>
                    <Route index element={<Home />}></Route>
                    <Route path="/newVideo" element={<NewVideo />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;