import { useEffect, useState } from "react";
import { api } from "../utils/apiHelper";
import { Link, useParams, useNavigate } from "react-router-dom";
import Markdown from "react-markdown";

// Importing App Components
import NotFound from './NotFound';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await api(`/courses/${id}`, "GET");
        const jsonData = await response.json();
        if (response.status === 200) {
          setCourse(jsonData);
        } else if (response.status === 500) {
          navigate(`/error`);
        }
      } catch (error) {
        console.log(`Error fetching and parsing the data`, error);
        navigate("/error");
      }
    };
    fetchCourseDetail();
  }, [id, navigate]);

  if (course) {
    return (
      <>
        <div className="actions--bar">
          <div className="wrap">
            <Link className="button" to="/">
              Update Course
            </Link>
            <Link className="button" to="/">
              Delete Course
            </Link>
            <Link className="button button-secondary" to="/">
              Return to List
            </Link>
          </div>
        </div>

        <div className="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{course.title}</h4>
                <p>
                  By {course.User.firstName} {course.User.lastName}
                </p>
                <Markdown>{course.description}</Markdown>
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{course.estimatedTime ? course.estimatedTime : 'No estimated time defined.'}</p>

                <h3 className="course--detail--title">Materials Needed</h3>
                <Markdown className="course--detail--list">{
                course.materialsNeeded 
                ? course.materialsNeeded 
                : 'The course owner has not yet defined the materials required for this course.'}
                </Markdown>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  } else {
    return (
      /** Not Course Found */
      <NotFound />
    );
  }
};

export default CourseDetail;
