import { useContext, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../utils/apiHelper";

import ErrorsDisplay from "./ErrorsDisplay";
import UserContext from "../context/UserContext";
import NotFound from "./NotFound";
import Forbidden from "./Forbidden";

/**
 * This component provides the "Update Course" screen by rendering a form that allows 
 * a user to update one of their existing courses.
 * 
 * The component also renders an "Update Course" button that when clicked sends 
 * a PUT request to the REST API's /api/courses/:id route. 
 * 
 * This component also renders a "Cancel" button that returns the user to the "Course Detail" screen.
 * 
 * @returns UpdateCourse Component.
 */
const UpdateCourse = () => {
  const { authUser } = useContext(UserContext);
  const { id } = useParams();
  const [course, setCourse] = useState();
  const navigate = useNavigate();

  // GET individual course detail.
  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await api(`/courses/${id}`, "GET");
        const jsonData = await response.json();
        if (response.status === 200) {
          setCourse(jsonData);
        }
      } catch (error) {
        console.log(`Error fetching and parsing the data`, error);
      }
    };

    fetchCourseDetail();
  }, [id]);

  // State
  const title = useRef(null);
  const description = useRef(null);
  const estimatedTime = useRef(null);
  const materialsNeeded = useRef(null);
  const [errors, setErrors] = useState([]);

  // Event handlers
  const handleSubmit = async (event) => {
    event.preventDefault();

    const course = {
      userId: authUser.id,
      title: title.current.value,
      description: description.current.value,
      estimatedTime: estimatedTime.current.value,
      materialsNeeded: materialsNeeded.current.value,
    };

    // PUT requets that will update the individual course.
    try {
      const response = await api(`/courses/${id}`, "PUT", course, authUser);
      if (response.status === 204) {
        navigate(`/courses/${id}`);
      } else if (response.status === 403) {
        navigate(`/forbidden`);
      } else if (response.status === 500) {
        navigate(`/error`);
      } else {
        const data = await response.json();
        setErrors(data.errors);
      }
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate(`/courses/${id}`);
  };

  if (course) {
    // Redirect users to the /forbidden path if the requested course isn't owned by the authenticated user.
    if (authUser.id !== course.User.id) {
      return <Forbidden />;
    } else {
      // If the authenticated user is owner of the course. Then, display course details to be updated.
      return (
        <div className="wrap">
          <h2>Update Course</h2>
          <ErrorsDisplay errors={errors} />
          <form onSubmit={handleSubmit}>
            <div className="main--flex">
              <div>
                <label htmlFor="courseTitle">Course Title</label>
                <input
                  id="courseTitle"
                  name="courseTitle"
                  type="text"
                  ref={title}
                  defaultValue={course.title}
                />

                <p>
                  By {course.User.firstName} {course.User.lastName}
                </p>

                <label htmlFor="courseDescription">Course Description</label>
                <textarea
                  id="courseDescription"
                  name="courseDescription"
                  ref={description}
                  defaultValue={course.description}
                />
              </div>
              <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input
                  id="estimatedTime"
                  name="estimatedTime"
                  type="text"
                  ref={estimatedTime}
                  defaultValue={course.estimatedTime}
                />

                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea
                  id="materialsNeeded"
                  name="materialsNeeded"
                  ref={materialsNeeded}
                  defaultValue={course.materialsNeeded}
                />
              </div>
            </div>
            <button className="button" type="submit">
              Update Course
            </button>
            <button className="button button-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        </div>
      );
    }
  } else {
    // Redirect users to the /notfound path if the requested course isn't returned from the REST API.
    return <NotFound />;
  }
};

export default UpdateCourse;
