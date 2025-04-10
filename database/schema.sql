CREATE TABLE "User" (
  id             SERIAL PRIMARY KEY,
  username       VARCHAR(255) NOT NULL UNIQUE,
  prefix         VARCHAR(50),
  first_name     VARCHAR(255) NOT NULL,
  last_name      VARCHAR(255) NOT NULL,
  email          VARCHAR(255) NOT NULL UNIQUE,
  phone_number   VARCHAR(50),
  password_hash  VARCHAR(255) NOT NULL,
  created_at     TIMESTAMP NOT NULL DEFAULT now(),
  updated_at     TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE "Type" (
  id              VARCHAR(255) PRIMARY KEY,
  name            VARCHAR(255) NOT NULL UNIQUE,
  description     TEXT,
  parent_type_id  VARCHAR(255),
  CONSTRAINT fk_parent_type FOREIGN KEY (parent_type_id)
    REFERENCES "Type"(id) ON DELETE SET NULL
);

CREATE TABLE "UserRole" (
  user_id  INTEGER NOT NULL,
  role_id  VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id, role_id),
  CONSTRAINT fk_user FOREIGN KEY (user_id)
    REFERENCES "User"(id) ON DELETE CASCADE,
  CONSTRAINT fk_type FOREIGN KEY (role_id)
    REFERENCES "Type"(id) ON DELETE CASCADE
);

CREATE TABLE "Venue" (
  id          SERIAL PRIMARY KEY,
  reference   VARCHAR(255) NOT NULL UNIQUE,
  name        VARCHAR(255),
  description TEXT,
  created_at  TIMESTAMP NOT NULL DEFAULT now(),
  updated_at  TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE "VenueType" (
  venue_id  INTEGER NOT NULL,
  type_id   VARCHAR(255) NOT NULL,
  PRIMARY KEY (venue_id, type_id),
  CONSTRAINT fk_venue FOREIGN KEY (venue_id)
    REFERENCES "Venue"(id) ON DELETE CASCADE,
  CONSTRAINT fk_type_for_venue FOREIGN KEY (type_id)
    REFERENCES "Type"(id) ON DELETE CASCADE
);

CREATE TABLE "Reservation" (
  id                   SERIAL PRIMARY KEY,
  start_datetime       TIMESTAMP NOT NULL,
  end_datetime         TIMESTAMP NOT NULL,
  type_id              VARCHAR(255) NOT NULL,
  organizer_id         INTEGER,
  venue_id             INTEGER,
  parent_reservation_id INTEGER,
  created_at           TIMESTAMP NOT NULL DEFAULT now(),
  updated_at           TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT fk_reservation_type FOREIGN KEY (type_id)
    REFERENCES "Type"(id),
  CONSTRAINT fk_organizer FOREIGN KEY (organizer_id)
    REFERENCES "User"(id),
  CONSTRAINT fk_reservation_venue FOREIGN KEY (venue_id)
    REFERENCES "Venue"(id),
  CONSTRAINT fk_parent_reservation FOREIGN KEY (parent_reservation_id)
    REFERENCES "Reservation"(id)
);

CREATE TABLE "ReservationParticipants" (
  reservation_id  INTEGER NOT NULL,
  user_id         INTEGER NOT NULL,
  participation_type_id         VARCHAR(255) NOT NULL,
  status_id       VARCHAR(255) NOT NULL,
  PRIMARY KEY (reservation_id, user_id),
  CONSTRAINT fk_reservation_part FOREIGN KEY (reservation_id)
    REFERENCES "Reservation"(id) ON DELETE CASCADE,
  CONSTRAINT fk_user_part FOREIGN KEY (user_id)
    REFERENCES "User"(id) ON DELETE CASCADE,
  CONSTRAINT fk_participant_type FOREIGN KEY (participation_type_id)
    REFERENCES "Type"(id),
  CONSTRAINT fk_status FOREIGN KEY (status_id)
    REFERENCES "Type"(id)
);
