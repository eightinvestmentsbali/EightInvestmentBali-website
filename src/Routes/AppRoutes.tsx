import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ViewPort from '../components/viewport/ViewPort'
import Home from '../pages/home/Home'
import AboutUs from '../pages/aboutUs/AboutUs'
import Projects from '../pages/projects/Projects'
import Services from '../pages/services/Services'
import Team from '../pages/team/Team'
import CardSectionExample from '../pages/home/components/CardSectionExample/CardSectionExample'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ViewPort />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="projects" element={<Projects />} />
        <Route path="services" element={<Services />} />
        <Route path="team" element={<Team />} />
        <Route path="card-section-example" element={<CardSectionExample />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes