package com.davon.warmup.demo.course;

import java.util.List;

import com.davon.warmup.demo.dao.CourseJdbcDao;
import com.davon.warmup.demo.dao.DAO;
import com.davon.warmup.demo.exception.DatabaseInsertionException;
import com.davon.warmup.demo.exception.DatabaseUpdateException;
import com.davon.warmup.demo.student.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

@Service
public class CourseService {

	private static DAO<Course> dao;

	public  CourseService(DAO<Course> dao){
		this.dao = dao;
	}
	public List<Course> getAllCourses(){
		return dao.getAsList();
	}
	
	public Course getCourseById(int id) {
		return dao.getById(id);
	}

	public Course addCourse(Course course) throws DatabaseInsertionException {
		int result = dao.create(course);
		if (result > 0){
			return course;
		}else{
			throw new DatabaseInsertionException("Data could not be inserted");
		}
	}

	public void removeCourseById(int id) {
		dao.deleteById(id);
	}

	public void updateCourse(int id, Course course) throws DatabaseUpdateException {
		int result = dao.update(course,id);
		if (result < 1){
			throw new DatabaseUpdateException("Data could not be updated");
		}
	}

}
