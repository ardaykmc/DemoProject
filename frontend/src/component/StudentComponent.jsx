import React,{Component} from "react";
import StudentDataService from "../service/StudentDataService";
import { Formik, Form, Field, ErrorMessage } from 'formik';


class StudentComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : "",
            email : "",
            id : this.props.match.params.id
        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(values) {
   
        if (typeof(this.state.id) == "undefined") {
            let student = {
                name: values.name,
                email : values.email
            }
            try{
                StudentDataService.createStudent("student",student).then(response =>{ 
                    this.props.history.push("/");
                    this.props.history.push('/students');
                });
            }catch(exeption){
                console.log("Exeption occured !!");
            }finally{
                this.props.history.push("/");
                this.props.history.push("/students");
            }
        }else{
            let student = {
                id : this.state.id,
                name: values.name,
                email : values.email
            } 
            try{
                StudentDataService.updateStudent("student",student.id,student).then(response => {
                   this.props.history.push("/");
                   this.props.history.push("/students");
                });
            }catch(exeption){
                console.log("Exeption occured !!");
            }finally{
                this.props.history.push('/');
            }
        }

        
    }

    render(){
        let {id, name, email} = this.state
        return(
            <div>
            <h3>Course</h3>
            <div className="container">
                <Formik
                    initialValues={{ id , name , email }}
                    onSubmit={this.onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={this.validate}
                    enableReinitialize={true}
                >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="description" component="div"
                                    className="alert alert-warning" />
                                <fieldset className="form-group">
                                    <label>Id</label>
                                    <Field className="form-control" type="text" name="id" disabled/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Name</label>
                                    <Field className="form-control" type="text" name="name" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Email</label>
                                    <Field className="form-control" type="text" name="email" />
                                </fieldset>
                                <button className="btn btn-success" type="submit">Save</button>
                            </Form>
                        )
                    }
                </Formik>

            </div>
        </div>
        )
    }
}

export default StudentComponent