import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Layout from './components/layout/Layout.jsx'
import Course from './pages/Course.jsx'
import Catalog from './pages/Catalog.jsx'

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// src/App.jsx (only the new bits)
import AdminLayout from "./routes/admin.jsx";
import InstructorLayout from "./routes/instructor.jsx";
import AdminCategories from "./pages/admin/Categories.jsx";
import AdminCatalog from "./pages/admin/Catalog.jsx";
import AdminCourses from "./pages/admin/Courses.jsx";
import InstructorCourses from "./pages/instructor/Courses.jsx";
import CourseEditor from "./pages/shared/CourseEditor.jsx";
import { Demo } from './pages/Demo.jsx'



export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/demo' element={<Demo />} />

        <Route path="/course/:id" element={<Course />} />
        <Route path="/catalog/:id" element={<Catalog />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="categories" element={<AdminCategories />} />
          <Route path="catalog" element={<AdminCatalog />} />
          <Route path="courses" element={<AdminCourses />} />
        </Route>

        <Route path="/instructor" element={<InstructorLayout />}>
          <Route path="courses" element={<InstructorCourses />} />
          <Route path="courses/:id/edit" element={<CourseEditor />} />
        </Route>

      </Routes>
    </Layout>
  )
}
