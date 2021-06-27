import React,{Component} from "react";
import CourseDataService from "../service/CourseDataService";
import CourseMembershipDataService from "../service/CourseMembershipDataService";
import StudentDataService from "../service/StudentDataService";
class ListStudentCoursesComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            id : props.match.params.id,
            currentStudent : "",
            courses : [],
            unenrolledCourses : [],
            selected : ""
        }
        this.refreshComponent = this.refreshComponent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteCourseClicked = this.deleteCourseClicked.bind(this);
        this.enrollCourse = this.enrollCourse.bind(this);
    }

    componentDidMount(){
        this.refreshComponent();
    }
    enrollCourse(courseIdentifier,studentIdentifier){
        let courseMembership = {
            courseId : courseIdentifier,
            studentId : studentIdentifier
        };
        try{
            CourseMembershipDataService.enrollStudent(courseMembership);
            this.refreshComponent();
        }catch(exception){
            console.log(exception)
        }finally{
            console.log(courseMembership)
        }
        
    }
    async deleteCourseClicked(id){
        let apiData = [];
        let getIdOfCourseMembership = -1;
        await CourseMembershipDataService.getJoinedTable().then(response=>{
            apiData = response.data;
            console.log(apiData);
        });
        for(let i = 0; i < apiData.length; i++){
            if(apiData[i].courseId === id){
                getIdOfCourseMembership = apiData[i].id;
            }
        }
        console.log(apiData);
        console.log(getIdOfCourseMembership);
        CourseMembershipDataService.unrollStudent(getIdOfCourseMembership).then(response=>{
            this.refreshComponent();
        });
    }
    async refreshComponent(){
        //makes 3 api calls 
        // Get current Student
        let currentUser = "";
        let coursesId = [];
        let validCourses = [];
        let notEnrolled = [];
        await StudentDataService.retriveStudentById("student",this.state.id).then(response=>{
            currentUser = response.data;
        })
        
        await CourseMembershipDataService.getCoursesOfStudent(currentUser.id).then(response=>{
            coursesId = response.data;
        });

        await CourseDataService.retrieveAllCourses("course").then(response=>{
            let coursesApiData = response.data;
            for(let i = 0; i < coursesApiData.length; i++){
                if(coursesId.includes(coursesApiData[i].id)){
                    validCourses.push(coursesApiData[i]);
                }else{
                    notEnrolled.push(coursesApiData[i]);
                }
            }
           
        });
        this.setState({currentStudent : currentUser, courses : validCourses, unenrolledCourses : notEnrolled })
    }
    handleChange(event){
        this.setState({ selected : event.target.value});
        console.log(event.target.value);
        console.log(event.taget);
    }
            
    
    render(){
        return(
             <div className="container">
             <h3 className="warning">{this.state.currentStudent.name}'s Enrolled Courses</h3>
             {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
             <div className="container">
                 <table className="table">
                     <thead>
                         <tr>
                             <th>Id</th>
                             <th>Name</th>
                             <th>Description</th>
                             <th>Delete</th>
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
                                         <td><button className="btn btn-warning"  onClick={()=>this.deleteCourseClicked(course.id)}>Unroll</button></td>
                                     </tr>
                             )
                         }
                     </tbody>
                 </table>
                 <select class="form-select" aria-label="Default select example" name="selectCourse" onChange={this.handleChange} value={this.state.selected} >
                    <option selected>Enroll New Course</option>
                    {
                       this.state.unenrolledCourses.map(
                           course=>
                            <option value={course.id}>{course.name}</option>
                       )
                   }
                </select>
                <button className="btn btn-success" onClick={()=>this.enrollCourse(this.state.currentStudent.id, this.state.selected)}>Enroll</button>
             </div>
         </div>
        )
    }
}

export default ListStudentCoursesComponent

