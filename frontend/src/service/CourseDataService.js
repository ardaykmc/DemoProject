import axios from 'axios'

const HOST_API_URL = 'http://localhost:9000'

class CourseDataService {

    retrieveAllCourses(name) {
        //console.log('executed service')
        return axios.get(`${HOST_API_URL}/getCourses`);
    }

    retrieveCourse(name, id) {
        //console.log('executed service')
        return axios.get(`${HOST_API_URL}/getCourse/${id}`);
    }

    deleteCourse(name, id) {
        //console.log('executed service')
        return axios.delete(`${HOST_API_URL}/unrollCourse/${id}`);
    }

    updateCourse(name, id, course) {
        //console.log('executed service')
        return axios.put(`${HOST_API_URL}/course/${id}`, course);
    }

    createCourse(name, course) {
        //console.log('executed service')
        return axios.post(`${HOST_API_URL}/course/add`, course);
    }
}

export default new CourseDataService()
