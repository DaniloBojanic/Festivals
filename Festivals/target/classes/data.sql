  
INSERT INTO `user` (id, username, password, role)
              VALUES (1,'miroslav','$2y$12$NH2KM2BJaBl.ik90Z1YqAOjoPgSd0ns/bF.7WedMxZ54OhWQNNnh6','ADMIN');
INSERT INTO `user` (id, username, password, role)
              VALUES (2,'tamara','$2y$12$DRhCpltZygkA7EZ2WeWIbewWBjLE0KYiUO.tHDUaJNMpsHxXEw9Ky','USER');
INSERT INTO `user` (id, username, password, role)
              VALUES (3,'petar','$2y$12$i6/mU4w0HhG8RQRXHjNCa.tG2OwGSVXb0GYUnf8MZUdeadE4voHbC','USER');
              
              INSERT INTO place (id,country,city) VALUES (1, 'SRB', 'Novi Sad');
INSERT INTO place (id,country,city) VALUES (2, 'BIH', 'Banja Luka');
INSERT INTO place (id,country,city) VALUES (3, 'MNE', 'Budva');
INSERT INTO place (id,country,city) VALUES (4, 'CZE', 'Prague');

INSERT INTO festival (id,available_tickets,ticket_price,date_start,date_end,name,place_id)
				VALUES (1, 15,1200,'2021-07-23','2021-07-29','Exit',1);
INSERT INTO festival (id,available_tickets,ticket_price,date_start,date_end,name,place_id)
				VALUES (2, 215,1400,'2021-01-01','2021-01-15','Tamburica Fest',1);
INSERT INTO festival (id,available_tickets,ticket_price,date_start,date_end,name,place_id)
				VALUES (3, 500,5000,'2021-07-01','2021-07-15','SeaDance',3);
INSERT INTO festival (id,available_tickets,ticket_price,date_start,date_end,name,place_id)
				VALUES (4, 220,2500,'2021-08-01','2021-08-15','BeerFest',2);
				
INSERT INTO reservation (id,bought_tickets,total_price,festival_id) VALUES (1,4,4800,1);
INSERT INTO reservation (id,bought_tickets,total_price,festival_id) VALUES (2,3,4200,2);
INSERT INTO reservation (id,bought_tickets,total_price,festival_id) VALUES (3,5,12500,4);
INSERT INTO reservation (id,bought_tickets,total_price,festival_id) VALUES (4,8,40000,3);

