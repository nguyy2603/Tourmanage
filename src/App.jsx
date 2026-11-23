

import './App.css'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { News } from './pages/News'
import { NotFound } from './pages/NotFound'
import { TourManagement } from './pages/TourManagement'
import { Routes, Route } from 'react-router-dom'
function App() {
  

  return (
    <>
     <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tin-tuc" element={<News/>} />
          <Route path="quan-ly-tour" element={<TourManagement />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
