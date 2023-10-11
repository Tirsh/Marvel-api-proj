import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; 

import AppHeader from "../appHeader/AppHeader";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import { MainPage, ComicsPage } from "../pages";

const App = () => {

    return (
        <Router>
            <div className="app">
                <ErrorBoundary>
                    <AppHeader/>
                </ErrorBoundary>            
                <main>
                    <Switch>
                        <Route exact path="/">
                            <MainPage/>
                        </Route>
                        <Route exact path="/comics">
                            <ComicsPage/>
                        </Route> 
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App;