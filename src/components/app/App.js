import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 

import AppHeader from "../appHeader/AppHeader";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import { MainPage, ComicsPage, ComicPage, Page404 } from "../pages";

const App = () => {

    return (
        <Router>
            <div className="app">
                <ErrorBoundary>
                    <AppHeader/>
                </ErrorBoundary>            
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/comics" element={<ComicsPage/>}/>
                        <Route path="/comics/:comicId" element={<ComicPage/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;