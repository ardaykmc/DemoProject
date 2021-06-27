import React , {Component} from "react";
import StudentDataService from "../service/StudentDataService"

class ListStudentComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            students : [],
            message : ""
        };
        this.refreshComponent = this.refreshComponent.bind(this);
        this.deleteStudentClicked = this.deleteStudentClicked.bind(this);
        this.updateCourseClicked = this.updateCourseClicked.bind(this);
        this.addStudentClicked = this.addStudentClicked.bind(this);
    }

    componentDidMount(){
        this.refreshComponent();
    }

    refreshComponent(){
        // get data from api 
        StudentDataService.retriveAllStudent("student").then(response =>{
            this.setState({students : response.data});
        });
    }
    
    deleteStudentClicked(id){
        StudentDataService.deleteStudent("student",id).then(repsonse=>{
            this.setState({message : "Student deleted"});
            this.refreshComponent();
        });
    }
    updateCourseClicked(id){
        console.log(`update` + id)
        this.props.history.push(`/student/update/${id}`);
    }
    addStudentClicked(){
        console.log("student add");
        this.props.history.push(`/students/add`);
    }
    getStudentCourses(id){
        console.log(`user id ${id}`);
        this.props.history.push(`/studentCourses/${id}`);
    }
    
    render(){
        console.log('render')
        return (
            <div className="container">
                <h3>All Students</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Update</th>
                                <th>Delete</th>
                                <th>Enrolled Courses</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.students.map(
                                    student =>
                                        <tr key={student.id}>
                                            <td>{student.id}</td>
                                            <td>{student.name}</td>
                                            <td>{student.email}</td>
                                            <td><button className="btn btn-success" onClick={()=>this.updateCourseClicked(student.id)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={()=> this.deleteStudentClicked(student.id)} >Delete</button></td>
                                            <td><button className="btn btn-dark" onClick={()=>this.getStudentCourses(student.id)}>Get Courses List</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addStudentClicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListStudentComponent