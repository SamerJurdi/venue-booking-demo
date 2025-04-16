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

-- Venue 1: Conference Room 101

-- Day 13 (Two reservations)
INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-13 09:00:00', '2025-04-13 10:00:00', TRUE,
 'Faculty Council Meeting',
 'A meeting of faculty members discussing curriculum innovations.',
 'meetingReservation', 2, 1, NULL);

INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-13 10:30:00', '2025-04-13 11:30:00', TRUE,
 'Academic Strategy Session',
 'Strategic planning for upcoming academic challenges and opportunities.',
 'meetingReservation', 4, 1, NULL);

-- Day 14 (One reservation)
INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-14 09:00:00', '2025-04-14 10:00:00', TRUE,
 'University Innovation Forum',
 'A forum dedicated to exploring new educational technologies.',
 'conferenceReservation', 4, 1, NULL);

-- Day 15 (Two reservations)
INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-15 09:00:00', '2025-04-15 10:00:00', TRUE,
 'Departmental Workshop',
 'Interactive workshop focusing on innovative teaching methods.',
 'meetingReservation', 2, 1, NULL);

INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-15 10:30:00', '2025-04-15 11:30:00', TRUE,
 'Campus Research Symposium',
 'Showcase of latest research and interdisciplinary projects.',
 'conferenceReservation', 4, 1, NULL);

-- Day 16 (One reservation)
INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-16 09:00:00', '2025-04-16 10:00:00', TRUE,
 'Lecture Series Kickoff',
 'Opening lecture on emerging trends in higher education.',
 'eventReservation', 2, 1, NULL);

-- Day 17 (Two reservations)
INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-17 09:30:00', '2025-04-17 10:30:00', TRUE,
 'Interfaculty Roundtable',
 'Discussion among various departments to spark new ideas.',
 'meetingReservation', 4, 1, NULL);

INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-17 11:00:00', '2025-04-17 12:00:00', TRUE,
 'Academic Planning Session',
 'Planning and setting goals for the upcoming semester.',
 'meetingReservation', 2, 1, NULL);

-- Day 18 (One reservation)
INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-18 09:00:00', '2025-04-18 10:00:00', TRUE,
 'Student-Faculty Meetup',
 'A casual meetup to foster collaboration and mentorship.',
 'eventReservation', 4, 1, NULL);

-- Day 19 (Two reservations)
INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-19 10:00:00', '2025-04-19 11:00:00', TRUE,
 'Innovation Brainstorming',
 'Session for generating creative solutions to academic challenges.',
 'meetingReservation', 2, 1, NULL);

INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-19 11:30:00', '2025-04-19 12:30:00', TRUE,
 'Alumni Guest Lecture',
 'Distinguished alumni share their insights on career paths and education.',
 'eventReservation', 4, 1, NULL);

-- Day 20 (One reservation)
INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-20 08:30:00', '2025-04-20 09:30:00', TRUE,
 'Morning Briefing',
 'Early morning briefing on university initiatives and research funding.',
 'meetingReservation', 2, 1, NULL);

-- Venue 2: Room 101 in Block 2

-- Day 13 (One reservation)
INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-13 11:00:00', '2025-04-13 12:00:00', TRUE,
 'Interdisciplinary Seminar',
 'A seminar exploring connections between different academic disciplines.',
 'meetingReservation', 2, 2, NULL);

-- Day 14 (Two reservations)
INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-14 10:00:00', '2025-04-14 11:00:00', TRUE,
 'Curriculum Enhancement Forum',
 'Discussing innovative ideas to boost curriculum effectiveness.',
 'conferenceReservation', 4, 2, NULL);

INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-14 11:30:00', '2025-04-14 12:30:00', TRUE,
 'Faculty Meet-and-Greet',
 'Networking session for faculty to share research and ideas.',
 'meetingReservation', 2, 2, NULL);

-- Day 15 (One reservation)
INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-15 09:00:00', '2025-04-15 10:00:00', TRUE,
 'Research Showcase',
 'Presentation of current research projects and findings.',
 'eventReservation', 4, 2, NULL);

-- Day 16 (Two reservations)
INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-16 09:00:00', '2025-04-16 10:00:00', TRUE,
 'Department Strategy Meeting',
 'Strategy session for departmental goals and resource allocation.',
 'meetingReservation', 2, 2, NULL);

INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-16 10:30:00', '2025-04-16 11:30:00', TRUE,
 'Innovation Roundtable',
 'Roundtable discussion on creative teaching and research methods.',
 'conferenceReservation', 4, 2, NULL);

-- Day 17 (One reservation)
INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-17 11:00:00', '2025-04-17 12:00:00', TRUE,
 'Administrative Briefing',
 'Briefing on operational plans and administrative updates.',
 'meetingReservation', 2, 2, NULL);

-- Day 18 (Two reservations)
INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-18 10:00:00', '2025-04-18 11:00:00', TRUE,
 'Faculty Development Workshop',
 'Workshop focused on professional development and pedagogical skills.',
 'conferenceReservation', 4, 2, NULL);

INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-18 11:30:00', '2025-04-18 12:30:00', TRUE,
 'Campus Vision Meeting',
 'Meeting to outline the long-term vision and goals of the campus.',
 'meetingReservation', 2, 2, NULL);

-- Day 19 (One reservation)
INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-19 09:30:00', '2025-04-19 10:30:00', TRUE,
 'Academic Advisory Session',
 'A session to discuss academic policies and student success strategies.',
 'meetingReservation', 2, 2, NULL);

-- Day 20 (Two reservations)
INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-20 10:00:00', '2025-04-20 11:00:00', TRUE,
 'Student Innovation Forum',
 'An interactive forum where students present their innovative projects.',
 'eventReservation', 4, 2, NULL);

INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-20 11:15:00', '2025-04-20 12:15:00', TRUE,
 'Faculty Collaboration Meeting',
 'Meeting to foster collaboration and share best teaching practices.',
 'meetingReservation', 2, 2, NULL);

-- Venue 3: Room 203 in Block 2

-- Day 13 (Two reservations)
INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-13 14:00:00', '2025-04-13 15:00:00', TRUE,
 'Digital Learning Seminar',
 'Exploring the integration of digital tools in modern education.',
 'conferenceReservation', 4, 3, NULL);

INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-13 15:15:00', '2025-04-13 16:15:00', TRUE,
 'Innovative Teaching Workshop',
 'Hands-on workshop with new educational technology trends.',
 'meetingReservation', 2, 3, NULL);

-- Day 14 (One reservation)
INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-14 14:30:00', '2025-04-14 15:30:00', TRUE,
 'Campus Policy Briefing',
 'Briefing on updated academic policies and procedures.',
 'meetingReservation', 2, 3, NULL);

-- Day 15 (Two reservations)
INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-15 13:00:00', '2025-04-15 14:00:00', TRUE,
 'Student Success Seminar',
 'Seminar on strategies to enhance student learning outcomes.',
 'eventReservation', 4, 3, NULL);

INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-15 14:30:00', '2025-04-15 15:30:00', TRUE,
 'Faculty Roundtable',
 'Roundtable discussion on research and effective teaching.',
 'meetingReservation', 2, 3, NULL);

-- Day 16 (One reservation)
INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-16 15:00:00', '2025-04-16 16:00:00', TRUE,
 'Academic Excellence Workshop',
 'Workshop on best practices for achieving academic excellence.',
 'conferenceReservation', 4, 3, NULL);

-- Day 17 (Two reservations)
INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-17 13:00:00', '2025-04-17 14:00:00', TRUE,
 'Interdepartmental Collaboration',
 'Meeting to encourage collaboration across departments.',
 'meetingReservation', 2, 3, NULL);

INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-17 14:15:00', '2025-04-17 15:15:00', TRUE,
 'Global Education Panel',
 'Panel discussion on global trends in higher education.',
 'conferenceReservation', 4, 3, NULL);

-- Day 18 (One reservation)
INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-18 15:00:00', '2025-04-18 16:00:00', TRUE,
 'Scholarship Forum',
 'Forum on opportunities for scholarships and educational grants.',
 'meetingReservation', 2, 3, NULL);

-- Day 19 (Two reservations)
INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-19 14:00:00', '2025-04-19 15:00:00', TRUE,
 'Sustainability in Education',
 'Seminar on sustainable practices within academic institutions.',
 'conferenceReservation', 4, 3, NULL);

INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-19 15:30:00', '2025-04-19 16:30:00', TRUE,
 'Research and Innovation Meeting',
 'Meeting discussing innovative research methods and initiatives.',
 'meetingReservation', 2, 3, NULL);

-- Day 20 (One reservation)
INSERT INTO "Reservation" (start_datetime, end_datetime, is_visible, title, description, type_id, organizer_id, venue_id, parent_reservation_id)
VALUES
('2025-04-20 13:30:00', '2025-04-20 14:30:00', TRUE,
 'University Global Summit',
 'Summit focusing on global educational trends and international collaboration.',
 'conferenceReservation', 4, 3, NULL);
