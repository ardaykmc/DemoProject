import React,{Component} from "react";
import CourseDataService from "../service/CourseDataService";
import CourseMembershipDataService from "../service/CourseMembershipDataService";
import StudentDataService from "../service/StudentDataService";

class ListCourseOfStudents extends Component{
    constructor(props){
        super(props);
        this.state = {
            id : props.match.params.id,
            currentCourse : "",
            students : []
        }
        this.refreshComponent = this.refreshComponent.bind(this);
        this.unrollStudentClicked = this.unrollStudentClicked.bind(this);
    }

    componentDidMount(){
        this.refreshComponent();
    }

    async refreshComponent(){
        //makes api calls 
        let course = "";
        let studentIds = [];
        let enrolledStudents = [];
        await CourseDataService.retrieveCourse("course",this.state.id).then(response=>{
            course = response.data;
        });

        await CourseMembershipDataService.getStudentsOfCourses(course.id).then(response=>{
            studentIds = response.data;
        });

        await StudentDataService.retriveAllStudent("student").then(response=>{
            let studentList = response.data;
            for(let i = 0; i < studentList.length; i++){
                if(studentIds.includes(studentIds[i])){
                    enrolledStudents.push(studentList[i]);
                }
            }
        });
        this.setState({currentCourse : course, students : enrolledStudents});
    }
    

    async unrollStudentClicked(id){
        console.log(id);
        let apiData = [];
        let getIdOfCourseMembership = -1;
        await CourseMembershipDataService.getJoinedTable().then(response=>{
            apiData = response.data;
            console.log(apiData);
        });
        for(let i = 0; i < apiData.length; i++){
            if(apiData[i].studentId === id){
                getIdOfCourseMembership = apiData[i].id;
            }
        }
        console.log(apiData);
        console.log(getIdOfCourseMembership);
        CourseMembershipDataService.unrollStudent(getIdOfCourseMembership).then(response=>{
            this.refreshComponent();
        });    
    }

    render(){
        console.log("render ListCourseOfStudents")
        return(
            <div className="container">
             <h3 className="warning">{this.state.currentCourse.name} student list</h3>
             {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
             <div className="container">
                 <table className="table">
                     <thead>
                         <tr>
                             <th>Id</th>
                             <th>Name</th>
                             <th>Email</th>
                             <th>Delete</th>
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
                                         <td><button className="btn btn-success"  onClick={()=>this.unrollStudentClicked(student.id)}>Unroll</button></td>
                                        
                                     </tr>
                             )
                         }
                     </tbody>
                 </table>
             </div>
         </div>
        );
    }
}

export default ListCourseOfStudents