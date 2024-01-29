import { useEffect, useState, useContext } from "react";
import { api } from "../utils/apiHelper";
import { Link, useParams, useNavigate } from "react-router-dom";
import Markdown from "react-markdown";

// Importing App Components & Context
import UserContext from "../context/UserContext";
import NotFound from "./NotFound";

/**
 * This component provides the "Course Detail" screen by retrieving the detail for a course 
 * from the REST API's /api/courses/:id route and rendering the course. 
 * 
 * The component also renders a "Delete Course" button that when clicked should 
 * send a DELETE request to the REST API's /api/courses/:id route in order to delete a course.
 *  
 * This component also renders an "Update Course" button for navigating to the "Update Course" screen.
 * 
 * @returns CourseDetail Component.
 */

const CourseDetail = () => {
  const { authUser } = useContext(UserContext);
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

  // Delete Event Handler
  const handleDelete = async (event) => {
    event.preventDefault();
    const response = await api(`/courses/${id}`, "DELETE", null, authUser);
    if (response.status === 204) {
      console.log(`Your course has been removed.`);
      navigate(`/`);
    } else if (response.status === 500) {
      navigate(`/error`);
    }
    try {
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  if (course) {
    return (
      <>
        <div className="actions--bar">
          <div className="wrap">
            {/** if the logged in user is the owner, then display the UPDATE and DELETE actions */}
            {authUser && authUser.id === course.User.id ? (
              <>
                <Link className="button" to={`/courses/${id}/update`}>
                  Update Course
                </Link>
                <button className="button" onClick={handleDelete}>
                  Delete Course
                </button>
              </>
            ) : null }

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
                <p>
                  {course.estimatedTime
                    ? course.estimatedTime
                    : "No estimated time defined."}
                </p>

                <h3 className="course--detail--title">Materials Needed</h3>
                {course.materialsNeeded ? (
                  <Markdown className="course--detail--list">
                    {course.materialsNeeded}
                  </Markdown>
                ) : (
                  <Markdown>
                    {
                      "The course owner has not yet defined the materials required for this course."
                    }
                  </Markdown>
                )}
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
