package com.davon.warmup.demo.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import com.davon.warmup.demo.student.Student;
import org.springframework.stereotype.Service;

@Service
public class StudentJdbcDao implements DAO<Student>{

	private JdbcTemplate jdbcTemplate;
	public StudentJdbcDao(JdbcTemplate jdbcTemplate){
		this.jdbcTemplate = jdbcTemplate;
	}

	RowMapper<Student> studentRowMapper = (rs,rowNumber) ->{
		Student student = new Student();
		student.setId(rs.getInt("id"));;
		student.setName(rs.getString("name"));
		student.setEmail(rs.getString("email"));
		return student;
	};

	@Override
	public List<Student> getAsList() {
		String sql = "SELECT id,name,email from Student";
		return jdbcTemplate.query(sql, studentRowMapper);
	}

	@Override
	public int create(Student t) {
		String sql = "insert into Student(name,email) values (?,?)";
		return jdbcTemplate.update(sql,t.getName(),t.getEmail());
	}

	@Override
	public Student getById(int id) {
		String sql = "Select id,name,email from Student where id = ?";
		Student  student = null;
		try {
			student = jdbcTemplate.queryForObject(sql,new Object[]{id},studentRowMapper);
		}catch (DataAccessException e){
			System.out.println("Error occurred while fetching data");
		}
		return student;
	}

	@Override
	public int update(Student t, int id) {
		String sql = "update Student set name=?,email=? where id = ?";
		return jdbcTemplate.update(sql,t.getName(),t.getEmail(),id);
	}

	@Override
	public void deleteById(int id) {
		jdbcTemplate.update("delete from Student where id = ?",id);
	}

}
