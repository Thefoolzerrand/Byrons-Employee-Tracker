drop table if exists department; role, employee;

create table department (
    "id" serial NOT NULL,
    "name" varchar(30) NOT NULL,
    constraint department_pk primary key (id)
);

create table role (
    "id" serial NOT NULL,
    "title" varchar(30) NOT NULL,
    "salary" decimal NOT NULL,
    "department_id" integer NOT NULL,
    constraint role_pk primary key (id)
);

create table employee (
    "id" serial NOT NULL,
    "first_name" varchar(30) NOT NULL,
    "last_name" varchar(30) NOT NULL,
    "role_id" integer NOT NULL,
    "manager_id" integer,
    constraint pk_employee primary key (id),
);  

alter table "role" ADD CONSTRAINT fk_department FOREIGN KEY ("department") REFERENCES department (id);
alter table "employee" ADD CONSTRAINT fk_role FOREIGN KEY ("role_id") REFERENCES role (id);
alter table "employee" ADD CONSTRAINT fk_manager FOREIGN KEY ("manager_id") REFERENCES employee (id);