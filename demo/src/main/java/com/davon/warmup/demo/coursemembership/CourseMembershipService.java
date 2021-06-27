package com.davon.warmup.demo.coursemembership;

import com.davon.warmup.demo.course.Course;
import com.davon.warmup.demo.dao.DAO;
import com.davon.warmup.demo.exception.DatabaseInsertionException;
import com.davon.warmup.demo.student.Student;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CourseMembershipService {

    private static DAO<CourseMembership> dao;
    private static DAO<Student> studentDAO;
    private static DAO<Course> courseDAO;
    public CourseMembershipService(DAO<CourseMembership> dao,DAO<Student> studentDAO){
        this.dao = dao;
        this.studentDAO = studentDAO;
        this.courseDAO = courseDAO;
    }

    public List<CourseMembership> getJoinedTable(){
        return dao.getAsList();
    }

    public CourseMembership enrollCourse(CourseMembership courseMembership) throws DatabaseInsertionException {
        int result =  dao.create(courseMembership);
        if (result > 1){
            return courseMembership;
        }else{
            throw new DatabaseInsertionException("Value can not be inserted");
        }
    }

    public void unrollCourse(int id){
        dao.deleteById(id);
    }
}
