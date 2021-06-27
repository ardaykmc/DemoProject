package com.davon.warmup.demo.coursemembership;

import com.davon.warmup.demo.exception.DatabaseInsertionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
public class CourseMembershipController {
    @Autowired
    CourseMembershipService service;

    @GetMapping("/joinCheck")
    public String test(){
        return "Works join";
    }

    @GetMapping("/getMembershipTable")
    public List<CourseMembership> getCourseMembershipAsList(){
        return service.getJoinedTable();
    }

    @GetMapping("/getCoursesOfStudent/{id}")
    public List<Integer> getStudentCourses(@PathVariable int id){
        List<CourseMembership> courseMemberships = getCourseMembershipAsList();
        List<Integer> coursesIdList = new ArrayList<>();
        for (int i = 0; i < courseMemberships.size(); i++){
            if(courseMemberships.get(i).getStudentId() == id){
                coursesIdList.add(courseMemberships.get(i).getCourseId());
            }
        }
        return coursesIdList;
    }

    @GetMapping("/getStudentsOfCourse/{id}")
    public List<Integer> getCoursesOfStudents(@PathVariable int id){
        List<CourseMembership> courseMemberships = getCourseMembershipAsList();
        List<Integer> studentIdList = new ArrayList<>();
        for (int i = 0; i < courseMemberships.size(); i++){
            if (courseMemberships.get(i).getCourseId() == id){
                studentIdList.add(courseMemberships.get(i).getStudentId());
            }
        }
        return  studentIdList;
    }

    @GetMapping("/getStudentIdOfHasMaxCourse")
    public int getMaxEnrolledStudentId(){
        int id = 0 ;
        int maxCounter = 0;
        List<CourseMembership> courseMemberships = getCourseMembershipAsList();
        for (CourseMembership courseMembership : courseMemberships){
            int tmpId = courseMembership.getStudentId();
            int tmpCounter = 0;
            for (CourseMembership courseMembershipInner : courseMemberships){
                if (courseMembershipInner.getStudentId() == tmpId){tmpCounter++;}
            }
            if (tmpCounter > maxCounter) {maxCounter = tmpCounter;id = tmpId;}
        }
        return id;
    }
    @PostMapping("/enrollStudent")
    public ResponseEntity<CourseMembership> enrollStudent(@RequestBody CourseMembership courseMembership){
        ResponseEntity<CourseMembership> responseEntity = null;
        try {
            return responseEntity = new ResponseEntity<CourseMembership>(service.enrollCourse(courseMembership), HttpStatus.OK);
        }catch (DatabaseInsertionException exception){
            return responseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/unrollCourse/{id}")
    public void unroll(@PathVariable int id){
        service.unrollCourse(id);
    }
}

