import { useEffect, useState } from "react";
import { api } from "../utils/apiHelper";
import { Link, useParams, useNavigate } from "react-router-dom";
import Markdown from "react-markdown";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await api(`/courses/${id}`, 'GET');
        const detail = await response.json();
        if (response.status === 200) {
          setCourse(detail);
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
  console.log(course);
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
              <h4 className="course--name">{/** title */}</h4>
              <p></p>
              <Markdown>{/** Description */}</Markdown>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{/** Time */}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">{/** Materials */}</ul>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CourseDetail;
