import axios from "axios";

const HOST_API_URL = 'http://localhost:9000'
const INSTRUCTOR_API_URL = `${HOST_API_URL}`


class StudentDataService{
    
    retriveAllStudent(name){
        return axios.get(`${HOST_API_URL}/getStudents`);
    }

    retriveStudentById(name,id){
        return axios.get(`${HOST_API_URL}/getStudent/${id}`);
    }

    deleteStudent(name,id){
        return axios.delete(`${HOST_API_URL}/student/${id}`);
    }

    updateStudent(name,id,student){
        return axios.put(`${HOST_API_URL}/student/${id}`,student);
    }

    createStudent(name,student){
        return axios.post(`${HOST_API_URL}/student/add`,student)
    }
}

export default new StudentDataService();