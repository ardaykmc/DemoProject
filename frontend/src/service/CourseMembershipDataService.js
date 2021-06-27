import axios from "axios";

const HOST_API_URL = 'http://localhost:9000'

class CourseMembershipDataService{


    getJoinedTable(){
        return axios.get(`${HOST_API_URL}/getMembershipTable`);
    }

    getCoursesOfStudent(id){
        return axios.get(`${HOST_API_URL}/getCoursesOfStudent/${id}`);
    }
    
    getStudentsOfCourses(id){
        return axios.get(`${HOST_API_URL}/getStudentsOfCourse/${id}`);
    }

    getStudentIdHasMaxCourse(){
        return axios.get(`${HOST_API_URL}/getStudentIdOfHasMaxCourse`);
    }

    enrollStudent(courseMembership){
        return axios.post(`${HOST_API_URL}/enrollStudent`,courseMembership);
    }

    unrollStudent(id){
        return axios.delete(`${HOST_API_URL}/unrollCourse/${id}`);
    }
}

export default new CourseMembershipDataService()