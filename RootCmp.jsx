
const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM
const { useEffect } = React
const { Provider } = ReactRedux

import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { TodoIndex } from "./pages/TodoIndex.jsx"
import { TodoDetails } from "./pages/TodoDetails.jsx"
import { TodoEdit } from "./pages/TodoEdit.jsx"
import { AboutTeam } from "./cmps/AboutTeam.jsx"
import { AboutVision } from "./cmps/AboutVision.jsx"
import { Dashboard } from "./pages/Dashboard.jsx"
import { UserDetails } from './pages/UserDetails.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { loadTodos } from "./store/actions/todo.actions.js"
import { store } from './store/store.js'

export function App() {
    // useEffect(()=>{
    //     loadCars()
    // }, [])

    return (
        <Provider store={store}>
            <Router>
            <section className="app main-layout">
            <AppHeader />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />}>
                        <Route path="team" element={<AboutTeam />} />
                        <Route path="vision" element={<AboutVision />} />
                    </Route>
                    <Route path="/todo/:todoId" element={<TodoDetails />} />
                    <Route path="/todo/edit/:todoId" element={<TodoEdit />} />
                    <Route path="/todo/edit" element={<TodoEdit />} />
                    <Route path="/todo" element={<TodoIndex />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path={'/user'} element={<UserDetails />} />
                </Routes>
            </main>

            <AppFooter />
        </section>
            </Router>
        </Provider>
    )
}


