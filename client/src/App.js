import { Route, Routes } from "react-router-dom";

// Importing the App Components
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from './components/CourseDetail';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Courses />} />
          <Route path='/courses/:id' element={<CourseDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
