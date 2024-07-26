import {Routes,Route} from 'react-router-dom'
import NavigationPage from './components/NavigationPage'
import GetStarted from './pages/AuthPage/GetStarted'
import Home from './pages/Home'
import AllCourse from './pages/AllCourse'
import BuyPage from './pages/BuyPage'
import MyLearning from './pages/MyLearning'
function App() {
  return (
    <>
    <NavigationPage/>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<GetStarted/>}></Route>
      <Route path="/course" element={<AllCourse/>}></Route>
      <Route path="/course" element={<AllCourse/>}></Route>
      <Route path="/learning" element={<MyLearning/>}></Route>
      <Route path="/courses/:id" element={<BuyPage/>}></Route>
    </Routes>
    </>
  )
}

export default App
