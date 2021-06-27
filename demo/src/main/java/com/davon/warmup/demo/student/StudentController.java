package com.davon.warmup.demo.student;

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
public class StudentController {
	@Autowired
	private StudentService service;

	@GetMapping("/checkConnection")
	public String connectionTest() {
		return "It works Student";
	}
	
	@GetMapping("/getStudents")
	public List<Student> getAllStudent(){
		return service.getAllStudents();
	}

	@GetMapping("/getStudent/{id}")
	public ResponseEntity<Student> getStudentById(@PathVariable int id){
		Student std = service.getStudentById(id);
		if(std == null) {
			return new ResponseEntity<Student>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Student> (std,HttpStatus.OK);
	}

	@PostMapping("/student/add")
	public ResponseEntity<Student> addStudent(@RequestBody Student student) {
		ResponseEntity<Student> responseEntity = null;
		try {
			responseEntity = new ResponseEntity<Student>(service.addStudent(student),HttpStatus.OK);
		}catch (DatabaseInsertionException e){
			responseEntity = new ResponseEntity<Student>(HttpStatus.NOT_FOUND);
		}
		return responseEntity;
	}

	@PutMapping("/student/{id}")
	public ResponseEntity updateStudent(@PathVariable int id, @RequestBody Student student) {
		ResponseEntity<Student> responseEntity = null;
		try {
			 service.update(id,student);
			responseEntity = new ResponseEntity<Student>(HttpStatus.OK);
		}catch (DatabaseUpdateException e){
			responseEntity = new ResponseEntity<Student>(HttpStatus.NOT_FOUND);
		}
		return responseEntity;
	}


	@DeleteMapping("/student/{id}")
	public void deleteStudent(@PathVariable int id) {
		service.deleteStudentById(id);
	}

}
