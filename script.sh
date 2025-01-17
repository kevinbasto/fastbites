ng g m pages/client/shifts --routing;
ng g c pages/client/shifts --standalone=false;
ng g s pages/client/shifts/shifts;
git add .;
git commit -m "feat: add employees component and service";

ng g c pages/client/staff/routes/create-employee --standalone=false;
ng g s pages/client/staff/routes/create-employee/create-employee;
git add .;
git commit -m "feat: add create-employee component and service";

ng g c pages/client/staff/routes/edit-employee --standalone=false;
ng g s pages/client/staff/routes/edit-employee/edit-employee;
git add .;
git commit -m "feat: add edit-employee component and service";

ng g c pages/client/staff/components/groups --standalone=false;
ng g s pages/client/staff/components/groups/groups;
git add .;
git commit -m "feat: add groups component and service";

ng g c pages/client/staff/routes/create-group --standalone=false;
ng g s pages/client/staff/routes/create-group/create-group;
git add .;
git commit -m "feat: add create-group component and service";

ng g c pages/client/staff/routes/edit-group --standalone=false;
ng g s pages/client/staff/routes/edit-group/edit-group;
git add .;
git commit -m "feat: add edit-group component and service";

ng g i core/entities/staff;
ng g i core/entities/employee;
ng g i core/entities/group;
git add .;
git commit -m "feat: add staff, employee and group interfaces";

ng g c shared-forms/employee-form --standalone=false;
git add .;
git commit -m "feat: add employee-form component";

ng g c shared-forms/group-form --standalone=false;
git add .;
git commit -m "feat: add group-form component";
