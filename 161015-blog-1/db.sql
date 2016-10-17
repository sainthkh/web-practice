create table users(
	id int not null primary key,
	username varchar(150) not null,
	first_name varchar(30) not null,
	last_name varchar(30) not null,
	email varchar(255),
	password text,
	is_staff boolean,
	is_active boolean,
	is_superuser boolean,
	last_login date,
	date_joined date
);

create table content_types(
	id int not null primary key,
	type varchar(255) not null,
);

create table groups(
	id int not null primary key,
	name varchar(255) not null
);

create table permissions(
	id int not null primary key,
	name varchar(255) not null,
	foreign key (content_type_id) references content_type(id),
	code_name varchar(100) not null
);

create table group_permissions(
	id int not null primary key,
	foreign key (group_id) references groups(id),
	foreign key (permission_id) references permissions(id)
);

create table user_permissions(
	id int not null primary key,
	foreign key (user_id) references users(id),
	foreign key (permission_id) references permissions(id)
)

create table posts(
	id int not null primary key,
	title text not null,
	slug varchar(250) not null,
	foreign key (user_id) references users(id),
	body text,
	publish date not null,
	created date not null,
	updated date not null,
	status varchar(10)
);