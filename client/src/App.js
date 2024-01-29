import { Route, Routes } from "react-router-dom";

// Importing the App Components
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from './components/UpdateCourse';
import PrivateRoute from "./components/PrivateRoute";

// Importing the App Error Components
import NotFound from "./components/NotFound";
import Forbidden from "./components/Forbidden";
import UnhandledError from "./components/UnhandledError";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          {/** Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/courses/create" element={<CreateCourse />} />
            <Route path='/courses/:id/update' element={<UpdateCourse />} />
          </Route>
          {/** Authentication Routes */}
          <Route path="signup" element={<UserSignUp />} />
          <Route path="signin" element={<UserSignIn />} />
          <Route path="signout" element={<UserSignOut />} />
          {/** Error routes paths for displaying user-friendly messages when things go wrong. */}
          <Route path="notfound" element={<NotFound />} />
          <Route path="forbidden" element={<Forbidden />} />
          <Route path="error" element={<UnhandledError />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
