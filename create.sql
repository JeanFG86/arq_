drop table jg.product;
drop table jg.coupon;
drop schema jg;

create schema jg;
create table jg.product (
	id_product integer primary key,
	description text,
	price numeric,
	width integer,
	height integer,
	length integer,
	weight integer
);

insert into jg.product (id_product, description, price, width, height, length, weight) values (1, 'A', 1000, 100, 30, 10, 3);
insert into jg.product (id_product, description, price, width, height, length, weight) values (2, 'B', 5000, 50, 50, 50, 20);
insert into jg.product (id_product, description, price, width, height, length, weight) values (3, 'C', 30, 10, 10, 10, 1);

create table jg.coupon (
	code text primary key,
	percentage numeric,
	expire_date timestamp
);

insert into jg.coupon (code, percentage, expire_date) values ('VALE20', 20, '2024-04-01T10:00:00');
insert into jg.coupon (code, percentage, expire_date) values ('VALE20_EXPIRED', 20, '2024-02-01T10:00:00');