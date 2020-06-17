import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';

declare var M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService) { }

  public create = false;
  public inrtxt = "Submit";

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.employeeService.selectedEmployee = {
      _id: "",
      name: "",
      position: "",
      feedback: "",
      salary: null,
      rating:null
    }
  }

  onSubmit(form: NgForm) {
    if(form.invalid){
      alert("Please Enter Valid Details")
      return;
    }
    if (form.value.name==""){
      alert("Enter Valid Name")
      return;
    }
    if (form.value.position==""){
      alert("Enter Valid Position")
      return;
    }
    if (form.value.office==""){
      alert("Enter Valid Office Location")
      return;
    }
    if (form.value.salary==null){
      alert("Enter Valid Salary")
      return;
    }
    if (form.value._id == "") {
      this.employeeService.postEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.employeeService.putEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res as Employee[];
      console.log(res);
    });
  }

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = emp;
    this.create = true;
    this.inrtxt = "Update"
  }

  onDelete(_id: string) {
    if (confirm('Delete ?') == true) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        M.toast({ html: 'Deleted', classes: 'rounded' });
      });
    }
  }
  toogleOn(temp: string){
    this.create = true;
    this.inrtxt = "Submit";
    this.resetForm();
    console.log(this.create);
  }
  toogleOff(){
    this.create = false;
  }
}
