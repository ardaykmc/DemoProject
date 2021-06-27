package com.davon.warmup.demo.course;

import java.util.List;

import com.davon.warmup.demo.exception.DatabaseInsertionException;
import com.davon.warmup.demo.exception.DatabaseUpdateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
public class CourseController {

	@Autowired
	private CourseService service;

	@GetMapping("/courseCheck")
	public String checkCourseApi() {
		return "It works course";
	}
	
	@GetMapping("/getCourses")
	public List<Course> getAllCourses(){
		return service.getAllCourses();
	}
	
	@GetMapping("/getCourse/{id}")
	public ResponseEntity<Course> getCourseById(@PathVariable int id){
		Course course = service.getCourseById(id);
		if(course == null) {
			return new ResponseEntity<Course> (HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Course> (course,HttpStatus.OK);
	}

	@PostMapping("/course/add")
	public ResponseEntity<Course> addCourse(@RequestBody Course course) {
		ResponseEntity<Course> responseEntity = null;
		try {
			responseEntity = new ResponseEntity<Course>(service.addCourse(course),HttpStatus.OK);
		}catch (DatabaseInsertionException e){
			responseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return responseEntity;
	}

	@DeleteMapping("/course/{id}")
	public void deleteCourse(@PathVariable int id) {
		service.removeCourseById(id);
	}
	
	@PutMapping("/course/{id}")
	public ResponseEntity<Course> updateCourse(@PathVariable int id, @RequestBody Course course) {
		ResponseEntity<Course> responseEntity = null;
		try {
			service.updateCourse(id, course);
			responseEntity = new ResponseEntity<>(HttpStatus.OK);
		}catch (DatabaseUpdateException e){
			responseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return responseEntity;
	}
	
}
