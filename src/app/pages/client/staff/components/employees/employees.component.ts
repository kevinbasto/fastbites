import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../../../../../core/entities/employee';
import { Staff } from '../../../../../core/entities/staff';
import { EmployeesTableConfig, EmployeesTableHeaders } from './employees-table.headers';
import { environment } from '../../../../../../environments/environment';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit, OnChanges {

  form: FormGroup;

  @Input() staff?: Staff;

  headers = EmployeesTableHeaders;
  tableConfig = EmployeesTableConfig;
  options = environment.paginationOptions;
  size = environment.defaultPageSize;
  displayEmployees?: Array<Employee>;
  filteredEmployees?: Array<Employee>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.form = this.fb.group({
      name: [""],
      position: [""]
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      this.filteredEmployees = this.staff?.employees?.filter((employee) => {
        const matchesPosition = value.position === "" || employee.position === value.position;
        const matchesName = value.name === "" || employee.name.toLowerCase().includes(value.name.toLowerCase());
        return matchesPosition && matchesName;
      });
      this.setPage();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['staff'] && this.staff?.employees) {
      this.setPage();
    }
  }

  createEmployee() {
    this.router.navigate(['/client/staff/employee/create']);
  }

  editEmployee(employee: Employee) {
    this.router.navigate([`/client/staff/employee/${employee.uid}`]);
  }

  deleteEmployee(employee: Employee) {
    // Implement delete logic here
  }

  setPage() {
    this.displayEmployees = [];
    const employeesToDisplay = this.filteredEmployees || this.staff?.employees || [];
    for (let i = 0; i < this.size; i++) {
      if (i < employeesToDisplay.length)
        this.displayEmployees.push(employeesToDisplay[i]);
    }
  }

  changePage(page: PageEvent) {
    const startIndex = page.pageIndex * page.pageSize;
    const endIndex = startIndex + page.pageSize;
    if (this.form.value.name || this.form.value.position)
      this.displayEmployees = this.filteredEmployees?.slice(startIndex, endIndex) || [];
    else
      this.displayEmployees = this.staff?.employees?.slice(startIndex, endIndex) || [];
  }
}