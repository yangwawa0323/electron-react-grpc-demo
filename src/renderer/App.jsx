import './scss/App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Blank from './pages/Blank'
import Dashboard from './pages/Dashboard'
import MainLayout from './layout/MainLayout'
import GrpcPannel from './components/grpc-pannel/GrpcPannel'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="grpc" element={<GrpcPannel />} />
                    <Route path="settings" element={<Blank />} />
               
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
