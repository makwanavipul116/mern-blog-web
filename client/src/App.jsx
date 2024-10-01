import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import About from './page/About'
import SignIn from './page/SignIn'
import SignUp from './page/SignUp'
import Projects from './page/Projects'
import DashBoard from './page/DashBoard'
import Header from './components/Header'
import FooterCom from './components/FooterCom'
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import CreatePost from './page/CreatePost'
import UpdatePost from './page/UpdatePost'
import PostPage from './page/PostPage'
import Search from './page/Search'
import ScrollToTop from './components/ScrollToTop'

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/search' element={<Search />} />
        <Route path='/projects' element={<Projects />} />

        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<DashBoard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>

        <Route path='/post/:postSlug' element={<PostPage />} />
      </Routes>
      <FooterCom />
    </BrowserRouter>

  )
}

export default App