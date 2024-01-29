import { useEffect, useState } from "react";
import { api } from "../utils/apiHelper";
import { Link, useNavigate } from "react-router-dom";

// Importing App Components
import Course from "./Course";

const Courses = () => {
  const [courses, setCourses] = useState(null);
  const navigate = useNavigate();
  let allCourses;

  // Trigger calling the GET api for all courses at rendering
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api("/courses", "GET");
        const jsonData = await response.json();
        if (response.status === 200) {
          setCourses(jsonData);
        } else if (response.status === 500) {
          navigate(`/error`);
        }
      } catch (error) {
        console.log(`Error fetching and parsing the data`, error);
        navigate("/error");
      }
    };
    // Call async api function
    fetchCourses();
  }, [navigate]);

  if (courses) {
    allCourses = courses.map((course) => {
      return (
        <Course
          url={"/courses/" + course.id}
          title={course.title}
          key={course.id}
        />
      );
    });
  } else {
    allCourses = <h2>No courses found!</h2>;
  }

  return (
    <div className="wrap main--grid">
      {allCourses}
      <Link
        className="course--module course--add--module"
        to="/courses/create"
      >
        <span className="course--add--title">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 13 13"
            className="add"
          >
            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
          </svg>
          New Course
        </span>
      </Link>
    </div>
  );
};

export default Courses;
