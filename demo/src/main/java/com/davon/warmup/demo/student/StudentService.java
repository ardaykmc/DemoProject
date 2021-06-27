package com.davon.warmup.demo.student;

import java.util.List;

import com.davon.warmup.demo.dao.StudentJdbcDao;
import com.davon.warmup.demo.exception.DatabaseInsertionException;
import com.davon.warmup.demo.exception.DatabaseUpdateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.davon.warmup.demo.dao.DAO;

@Service
public class StudentService {

	private  static DAO<Student> dao;

	public StudentService(DAO<Student> dao){
		this.dao = dao;
	}
	public List<Student> getAllStudents(){
		return dao.getAsList();
	}

	public Student getStudentById(int id) {
		return dao.getById(id);
	}

	public Student addStudent(Student student) throws DatabaseInsertionException {
		if (dao.create(student) > 0){
			return student;
		}else{
			throw new DatabaseInsertionException("Data could not be inserted");
		}
	}
	
	public void deleteStudentById(int id) {
		dao.deleteById(id);
	}
	
	public void update(int id, Student student) throws DatabaseUpdateException {
		int result = dao.update(student,id);
		if (result < 1 ){
			throw new DatabaseUpdateException("Data could not be updated");
		}
	}
}
