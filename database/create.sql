drop table jg.item;
drop table jg.product;
drop table jg.coupon;
drop table jg.order;
drop schema jg;

create schema jg;
create table jg.product (
	id_product integer primary key,
	description text,
	price numeric,
	width integer,
	height integer,
	length integer,
	weight numeric,
	currency text
);

insert into jg.product (id_product, description, price, width, height, length, weight, currency) values (1, 'A', 1000, 100, 30, 10, 3, 'BRL');
insert into jg.product (id_product, description, price, width, height, length, weight, currency) values (2, 'B', 5000, 50, 50, 50, 22, 'BRL');
insert into jg.product (id_product, description, price, width, height, length, weight, currency) values (3, 'C', 30, 10, 10, 10, 0.9, 'BRL');
insert into jg.product (id_product, description, price, width, height, length, weight, currency) values (4, 'D', 100, 100, 30, 10, 3, 'USD');

create table jg.coupon (
	code text primary key,
	percentage numeric,
	expire_date timestamp
);

insert into jg.coupon (code, percentage, expire_date) values ('VALE20', 20, '2024-08-01T10:00:00');
insert into jg.coupon (code, percentage, expire_date) values ('VALE20_EXPIRED', 20, '2024-02-01T10:00:00');

create table jg.order (
	id_order serial primary key,
	coupon_code text,
	coupon_percentage numeric,
	code text,
	cpf text,
	email text,
	issue_date timestamp,
	freight numeric,
	total numeric,
	sequence integer
);

create table jg.item (
	id_order integer references jg.order (id_order),
	id_product integer references jg.product (id_product),
	price numeric,
	quantity integer,
	primary key (id_order, id_product)
);

create table jg.zipcode(
  code text primary key,
  street text,
  neighborhood text,
  lat numeric,
  long numeric
);
insert into jg.zipcode (code, street, neighborhood, lat, long) values ('22030060', '', '', -27.5945, -48.5477);
insert into jg.zipcode (code, street, neighborhood, lat, long) values ('88015600', '', '', -22.9129, -43.2003);

create table jg.stock_entry (
	id_stock_entry serial primary key,
	id_product integer references jg.product (id_product),
	operation text,
	quantity integer
);