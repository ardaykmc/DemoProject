import React, { Component } from 'react'
import CourseDataService from '../service/CourseDataService';
import CourseMembershipDataService from '../service/CourseMembershipDataService';
import StudentDataService from '../service/StudentDataService';
const INSTRUCTOR = 'in28minutes'

class ListCoursesComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            courses: [],
            message: null,
            showMessage :false,
            maxCourseStudent : ""
        }
        this.deleteCourseClicked = this.deleteCourseClicked.bind(this)
        this.updateCourseClicked = this.updateCourseClicked.bind(this)
        this.addCourseClicked = this.addCourseClicked.bind(this)
        this.refreshCourses = this.refreshCourses.bind(this)
        this.listStudentListClicked = this.listStudentListClicked.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.refreshCourses();
    }

    refreshCourses() {
        CourseDataService.retrieveAllCourses(INSTRUCTOR)//HARDCODED
            .then(
                response => {
                    //console.log(response);
                    this.setState({ courses: response.data })
                }
            )
    }

    deleteCourseClicked(id) {
        CourseDataService.deleteCourse(INSTRUCTOR, id)
            .then(
                response => {
                    this.setState({ message: `Delete of course ${id} Successful` })
                    this.refreshCourses()
                }
            )

    }

    addCourseClicked() {
        this.props.history.push(`/courses/-1`)
    }

    updateCourseClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/courses/${id}`)
    }
    listStudentListClicked(id){
        console.log("id", id);
        this.props.history.push(`/getUserList/${id}`);
    }

    async onChange(){
        let studentId = 0;
        let student = "";
        await CourseMembershipDataService.getStudentIdHasMaxCourse().then(response=>{
            studentId = response.data;
        });
        await StudentDataService.retriveStudentById("student",studentId).then(response=>{
            student = response.data;
        });
        console.log(`Student id : ${student.name}`);
        console.log(`showMessage:${this.state.showMessage}`);
        if(this.state.showMessage){
            this.setState({maxCourseStudent : "", showMessage : false});
        }else{
            this.setState({maxCourseStudent : `Student Name :${student.name} and Student Id: ${student.id}`, showMessage : true});
        }
    }
    render() {
        console.log('render')
        return (
            <div className="container">
                <h3>All Courses</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Update</th>
                                <th>Delete</th>
                                <th>Student List</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.courses.map(
                                    course =>
                                        <tr key={course.id}>
                                            <td>{course.id}</td>
                                            <td>{course.name}</td>
                                            <td>{course.description}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateCourseClicked(course.id)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteCourseClicked(course.id)}>Delete</button></td>
                                            <td><button className="btn btn-dark" onClick={()=>this.listStudentListClicked(course.id)}>Get Student List Of Course</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addCourseClicked}>Add</button>
                    </div>
                </div>
                <br/>
                <button className="btn btn-success" onClick={this.onChange}> Show Student That Takes Max Number Of Class</button>
                <p><b name="showMessage">{this.state.maxCourseStudent}</b></p>
            </div>
        )
    }
}

export default ListCoursesComponent