create database graph_beginner_app;

create table users (
    id serial not null primary key,
    username varchar(50) not null
);

insert into users (username) values ('shirin');