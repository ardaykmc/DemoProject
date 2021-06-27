package com.davon.warmup.demo.dao;

import com.davon.warmup.demo.course.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CourseJdbcDao implements DAO<Course> {

    private JdbcTemplate jdbcTemplate;
    public CourseJdbcDao(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    RowMapper<Course> courseRowMapper = (rs, rowCount) ->{
        Course course = new Course();
        course.setId(rs.getInt("id"));
        course.setName(rs.getString("name"));
        course.setDescription(rs.getString("description"));
        return course;
    };
    @Override
    public List<Course> getAsList() {
        String sql = "select id,name,description from Course";
        return jdbcTemplate.query(sql,courseRowMapper);
    }

    @Override
    public int create(Course course) {
        String sql = "insert into Course(name,description) values (?,?)";
        return jdbcTemplate.update(sql,course.getName(),course.getDescription());
    }

    @Override
    public Course getById(int id) {
        Course course = null;
        String sql = "select id,name,description from Course where id = ?";
        try{
            course = jdbcTemplate.queryForObject(sql,new Object[]{id},courseRowMapper);
        }catch (DataAccessException e){
            course = null;
            System.out.println("Error occurred while fetching data");
        }
        return course;
    }

    @Override
    public int update(Course course, int id) {
        String sql = "update Course set name = ?, description = ? where id = ?";
        return jdbcTemplate.update(sql,course.getName(),course.getDescription(),id);
    }

    @Override
    public void deleteById(int id) {
        jdbcTemplate.update("delete from Course where id = ?",id);
    }
}
