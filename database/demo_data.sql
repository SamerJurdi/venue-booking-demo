-- Insert types
INSERT INTO "Type" (id, name, description, parent_type_id) VALUES 
('authorizationRoles', 'Authorization', 'This type groups all authorizartion roles', NULL),
('venueTypes', 'Venue', 'This type groups all venue types', null),
('reservationTypes', 'Reservations', 'This type groups all reservation types', null),
('participationTypes', 'Participation', 'This type groups all reservation participation types', null),
('participationStatusTypes', 'Participation Status', 'This type groups all participation status types', null),
('adminRole', 'Admin', 'Administrative authorization role', 'authorizationRoles'),
('professorRole', 'Professor', 'Professor authorization role', 'authorizationRoles'),
('studentRole', 'Student', 'Student authorization role', 'authorizationRoles'),
('largeVenue', 'Large', 'Large venue with capacity of 200 participants', 'venueTypes'),
('midSizeVenue', 'Mid-Size', 'Mid-sized venue with capacity of 100 participants', 'venueTypes'),
('smallVenue', 'Small', 'Small venue with capacity of 50 participants', 'venueTypes'),
('lectureReservation', 'Lecture', 'Lecture reservation type', 'reservationTypes'),
('conferenceReservation', 'Conference', 'Conference reservation type', 'reservationTypes'),
('meetingReservation', 'Meeting', 'Meeting reservation type', 'reservationTypes'),
('eventReservation', 'Event', 'Event reservation type', 'reservationTypes'),
('disabledReservation', 'Disabled', 'Disabled reservation type', 'reservationTypes'),
('mandatoryParticipation', 'Mandatory', 'Mandatory participation type', 'participationTypes'),
('optionalParticipation', 'Optional', 'Optional participation type', 'participationTypes'),
('pendingParticipationStatus', 'Pending Response', 'Pending Response participation status type', 'participationStatusTypes'),
('requestingParticipationStatus', 'Requesting Access', 'Requesting Access participation status type', 'participationStatusTypes'),
('confirmedParticipationStatus', 'Confirmed Attendance', 'Confirmed Attendance participation status type', 'participationStatusTypes'),
('rejectedParticipationStatus', 'Not Attending', 'Not Attending participation status type', 'participationStatusTypes');

-- Insert users
INSERT INTO "User" (username, prefix, first_name, last_name, email, password_hash) VALUES 
('ADMIN1', NULL, 'Test', 'Admin1', 'admin1@example.com', '$argon2id$v=19$m=65536,t=3,p=4$LmuisRsL7MflnumQqlL3IQ$daPZZhnSlz9F7s8hnwBAMjiT5Bg2knsCnoVYfXFahGY'),
('PROF1', 'Dr.', 'Eleanor', 'Whitman', 'professor1@example.com', '$argon2id$v=19$m=65536,t=3,p=4$YUJrQWCTjHJ6uerurImVNw$FSERiU+5Uhbwa2Cv1e7ECULMc8/uXizQrHLiDNcyDqo'),
('STUD1', NULL, 'Aiden', 'Ramirez', 'student1@example.com', '$argon2id$v=19$m=65536,t=3,p=4$KuNLCqFaBqHLYvwHDHvNIw$t2ZXCWkvjYr1R+3MwSY/0n3pm1uo7G5PO70fpgMHMD4'),
('PROF2', 'Prof.', 'Marcus', 'Delgado', 'professor2@example.com', '$argon2id$v=19$m=65536,t=3,p=4$ocgAwR/lPAz6AhQa1i3ZsA$1lvn47cVJOnL7S5hYtKR0GWL4Z6AgrjxJeIJtHDG5+w');

-- User types
INSERT INTO "UserRole" (user_id, role_id) VALUES 
(1, 'adminRole'),
(2, 'professorRole'),
(4, 'professorRole'),
(3, 'studentRole');

-- Insert venue
INSERT INTO "Venue" (reference, name, description) VALUES 
('BLK1101', 'Conference Room 101', 'Main conference room in block 1'),
('BLK2101', 'Room 101', 'Room 101 in block 2'),
('BLK2203', 'Room 203', 'Room 203 in block 2');

-- Venue type
INSERT INTO "VenueType" (venue_id, type_id) VALUES 
(1, 'largeVenue'),
(2, 'midSizeVenue'),
(3, 'smallVenue');

-- Insert reservation
INSERT INTO "Reservation" (start_datetime, end_datetime, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-16 09:00:00', '2025-04-16 10:00:00', 'Student Committee Meeting', 'A collaborative session where student committee members come together to discuss upcoming events, share updates, and plan initiatives to enhance the campus experience.', 'meetingReservation', 4, 1, NULL),
('2025-04-16 09:00:00', '2025-04-16 10:00:00', 'Student Committee Meeting 1/3', 'A collaborative session where student committee members come together to discuss upcoming events, share updates, and plan initiatives to enhance the campus experience.', 'meetingReservation', 4, 1, 1),
('2025-04-16 11:00:00', '2025-04-16 12:30:00', 'Graduation Ceremony', 'A proud and joyful celebration honoring our graduating students and their incredible journey. Join us as we recognize their hard work, cherished memories, and the exciting adventures that lie ahead.', 'eventReservation', 2, 1, NULL),
('2025-04-17 09:00:00', '2025-04-17 10:00:00', 'Student Committee Meeting 2/3', 'A collaborative session where student committee members come together to discuss upcoming events, share updates, and plan initiatives to enhance the campus experience.', 'meetingReservation', 4, 1, 1),
('2025-04-17 10:00:00', '2025-04-17 11:00:00', 'Music Club Festival', 'An exciting celebration hosted by the Music Club, featuring live performances, student bands, and a vibrant showcase of musical talent from across campus.', 'eventReservation', 4, 1, NULL),
('2025-04-17 13:00:00', '2025-04-17 14:00:00', 'Cybersecurity Workshop', 'An interactive workshop focused on essential cybersecurity practices, threat awareness, and hands-on techniques to help participants protect their digital presence.', 'conferenceReservation', 2, 1, NULL),
('2025-04-18 09:00:00', '2025-04-18 10:00:00', 'Student Committee Meeting 3/3', 'A collaborative session where student committee members come together to discuss upcoming events, share updates, and plan initiatives to enhance the campus experience.', 'meetingReservation', 4, 1, 1),
('2025-04-18 15:00:00', '2025-04-18 16:00:00', 'Local Tech Leaders CON25', 'A gathering of the brightest minds in the local tech scene, CON25 brings together innovators, entrepreneurs, and developers to share ideas, showcase projects, and spark collaboration.', 'conferenceReservation', 4, 1, NULL);
