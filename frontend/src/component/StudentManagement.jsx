import React, { Component} from 'react';
import ListCoursesComponent from './ListCoursesComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CourseComponent from './CourseComponent';
import ListStudentComponent from './ListStudentComponent';
import StudentComponent from './StudentComponent';
import ListStudentCoursesComponent from './ListStudentCoursesComponent';
import ListCourseOfStudents from './ListCourseOfStudents';
class StudentManagementApp extends Component {
    render() {
        return (
            <Router >
                <>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="http://localhost:3000/courses">Courses</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <a class="navbar-brand" href="http://localhost:3000/students">Students</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </nav>
                    <h1>StudentManagement Application</h1>
                    <Switch>
                        <Route path="/" exact component={ListCoursesComponent} />
                        <Route path="/courses" exact component={ListCoursesComponent} />
                        <Route path="/courses/:id" component={CourseComponent} />
                        <Route forceRefresh={true} path="/students" exact component={ListStudentComponent} />
                        <Route path="/students/add" exact  component={StudentComponent}/>
                        <Route path="/student/update/:id" component={StudentComponent}/>
                        <Route path="/studentCourses/:id" component={ListStudentCoursesComponent} />
                        <Route path="/getUserList/:id" component={ListCourseOfStudents} />
                    </Switch>
                </>
            </Router>
        )
    }
}

export default StudentManagementApp