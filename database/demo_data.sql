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
('ADMIN1', NULL, 'Test', 'Admin1', 'admin1@example.com', 'hashedpassword1'),
('PROF1', 'PhD', 'Test', 'Professor1', 'professor1@example.com', 'hashedpassword2'),
('STUD1', NULL, 'Test', 'Student1', 'student1@example.com', 'hashedpassword3');

-- User types
INSERT INTO "UserRole" (user_id, role_id) VALUES 
(1, 'adminRole'),
(2, 'professorRole'),
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
