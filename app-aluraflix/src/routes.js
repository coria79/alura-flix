const {default: Home} = require ('./pages/Home');
const {BrowserRouter, Routes, Route} = require("react-router-dom");

function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;