import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Group } from '../../../../../core/entities/group';
import { Staff } from '../../../../../core/entities/staff';
import { GroupsTableConfig, GroupsTableHeaders } from './groups-table.headers';
import { environment } from '../../../../../../environments/environment';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
,
  standalone: false})
export class GroupsComponent implements OnInit, OnChanges {

  form: FormGroup;

  @Input() staff?: Staff;

  headers = GroupsTableHeaders;
  tableConfig = GroupsTableConfig;
  options = environment.paginationOptions;
  size = environment.defaultPageSize;
  displayGroups?: Array<Group>;
  filteredGroups?: Array<Group>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.form = this.fb.group({
      name: [""]
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      this.filteredGroups = this.staff?.groups?.filter((group) => {
        const matchesName = value.name === "" || group.name.toLowerCase().includes(value.name.toLowerCase());
        return matchesName;
      });
      this.setPage();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['staff'] && this.staff?.groups) {
      this.setPage();
    }
  }

  createGroup() {
    this.router.navigate(['/client/staff/group/create']);
  }

  editGroup(group: Group) {
    this.router.navigate([`/client/staff/group/${group.id}`]);
  }

  deleteGroup(group: Group) {
    // Implement delete logic here
  }

  setPage() {
    this.displayGroups = [];
    const groupsToDisplay = this.filteredGroups || this.staff?.groups || [];
    for (let i = 0; i < this.size; i++) {
      if (i < groupsToDisplay.length)
        this.displayGroups.push(groupsToDisplay[i]);
    }
  }

  changePage(page: PageEvent) {
    const startIndex = page.pageIndex * page.pageSize;
    const endIndex = startIndex + page.pageSize;
    if (this.form.value.name)
      this.displayGroups = this.filteredGroups?.slice(startIndex, endIndex) || [];
    else
      this.displayGroups = this.staff?.groups?.slice(startIndex, endIndex) || [];
  }
}