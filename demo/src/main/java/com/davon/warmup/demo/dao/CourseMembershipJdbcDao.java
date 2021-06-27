package com.davon.warmup.demo.dao;

import com.davon.warmup.demo.coursemembership.CourseMembership;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CourseMembershipJdbcDao implements DAO<CourseMembership> {
    private JdbcTemplate jdbcTemplate;

    public CourseMembershipJdbcDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    RowMapper<CourseMembership> courseMembershipRowMapper = (rs, rowCounter) ->{
        CourseMembership courseMembership = new CourseMembership();
        courseMembership.setId(rs.getInt("id"));
        courseMembership.setCourseId(rs.getInt("courseId"));
        courseMembership.setStudentId(rs.getInt("studentId"));
        return courseMembership;
    };
    @Override
    public List<CourseMembership> getAsList() {
        String sql = "select id,courseId, studentId from CourseMembership";
        return jdbcTemplate.query(sql,courseMembershipRowMapper);
    }

    @Override
    public int create(CourseMembership courseMembership) {
        String sql  = " INSERT INTO `StudentManagement`.`CourseMembership` (`studentId`, `courseId`) VALUES (?, ?);";
        return jdbcTemplate.update(sql,courseMembership.getCourseId(), courseMembership.getStudentId());
    }

    @Override
    public CourseMembership getById(int id) {
        CourseMembership courseMembership = null;
        String sql = "select id,courseId,studentId from CourseMembership where id = ?";
        try {
            courseMembership = jdbcTemplate.queryForObject(sql,new Object[]{id},courseMembershipRowMapper);
        }catch (DataAccessException e){
            courseMembership = null;
        }
        return courseMembership;
    }

    @Override
    public int update(CourseMembership courseMembership, int id) {
        String sql = "update CourseMembership set studentId = ? , courseId = ?";
        return jdbcTemplate.update(sql,courseMembership.getStudentId(),courseMembership.getCourseId());
    }

    @Override
    public void deleteById(int id) {
        jdbcTemplate.update("delete from CourseMembership where id = ?", id);
    }
}