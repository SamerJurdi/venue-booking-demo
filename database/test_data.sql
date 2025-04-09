-- Insert types
INSERT INTO "Type" (name, description) VALUES 
('Admin', 'Administrative role'),
('Regular User', 'Standard access'),
('Participant', 'A reservation participant'),
('Confirmed', 'Confirmed participant status');

-- Insert users
INSERT INTO "User" (username, first_name, last_name, email, password_hash)
VALUES 
('jdoe', 'John', 'Doe', 'jdoe@example.com', 'hashedpassword1'),
('asmith', 'Alice', 'Smith', 'asmith@example.com', 'hashedpassword2');

-- User types
INSERT INTO "UserType" (user_id, type_id) VALUES 
(1, 1),
(2, 2);

-- Insert venue
INSERT INTO "Venue" (reference, name, description)
VALUES 
('room101', 'Room 101', 'Main conference room');

-- Venue type
INSERT INTO "VenueType" (venue_id, type_id) VALUES 
(1, 1);

-- Insert reservation
INSERT INTO "Reservation" (start_datetime, end_datetime, type_id, organizer_id, venue_id)
VALUES 
('2025-04-10 09:00:00', '2025-04-10 10:00:00', 1, 1, 1);

-- Reservation participants
INSERT INTO "ReservationParticipants" (reservation_id, user_id, type_id, status_id)
VALUES 
(1, 2, 3, 4);
