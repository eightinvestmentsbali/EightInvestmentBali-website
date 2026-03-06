import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ViewPort from '../components/viewport/ViewPort'
import Home from '../pages/home/Home'
import Projects from '../pages/projects/Projects'


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ViewPort />}>
        <Route index element={<Home />} />
        <Route path="project-details" element={<Projects />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes