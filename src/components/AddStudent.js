import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SERVER_URL } from '../constants.js'

// user selects from a list of  (year, semester) values
class AddStudent extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false, student: { name: "", email: "", statusCode: 0 } };
    };

    addStudent = (student) => {
  
      fetch(`${SERVER_URL}student`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(student)
        })
        .then(res => {
          if (res.ok) {
            console.log("Student Added");
          } else {
            console.error('Error: ' + res.status);
          }
        })
        .catch(err => {
          console.error(err);
        })
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleNameChange = (event) => {
        this.setState({
            student: { email: this.state.student.email, name: event.target.value, statusCode: this.state.student.statusCode },
        });
    };

    handleEmailChange = (event) => {
        this.setState({
            student: { email: event.target.value, name: this.state.student.name, statusCode: this.state.student.statusCode },
        });
    };

    // Save course and close modal form
    handleAdd = () => {
        this.addStudent(this.state.student);
        this.handleClose();
    };

    render() {
      return (
          <div>
              <Button variant="outlined" color="primary" style={{ margin: 10 }} onClick={this.handleClickOpen}>
                  Add Student
              </Button>
              <Dialog open={this.state.open} onClose={this.handleClose}>
                  <DialogTitle>Add Student</DialogTitle>
                  <DialogContent style={{ paddingTop: 20 }} >
                      <TextField autoFocus fullWidth label="name" name="name" onChange={this.handleNameChange} />
                      <br />
                      <TextField autoFocus fullWidth label="email" name="email" onChange={this.handleEmailChange} />
                  </DialogContent>
                  <DialogActions>
                      <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                      <Button id="Add" color="primary" onClick={this.handleAdd}>Add</Button>
                  </DialogActions>
              </Dialog>
          </div>
      );
  }
}

AddStudent.propTypes = {
  addStudent: PropTypes.func.isRequired
}

export default AddStudent;