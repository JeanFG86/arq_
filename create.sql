drop table jg.product;
drop table jg.coupon;
drop schema jg;

create schema jg;
create table jg.product (
	id_product integer primary key,
	description text,
	price numeric
);

insert into jg.product (id_product, description, price) values (1, 'A', 1000);
insert into jg.product (id_product, description, price) values (2, 'B', 5000);
insert into jg.product (id_product, description, price) values (3, 'C', 30);

create table jg.coupon (
	code text primary key,
	percentage numeric
);

insert into jg.coupon (code, percentage) values ('VALE20', 20);