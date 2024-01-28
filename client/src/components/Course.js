const Course = (props) => (
    <a className="course--module course--link" href={props.url}>
        <h2 className="course--label">Course</h2>
        <h3 className="course--title">{props.title}</h3>
    </a>
);

export default Course;
