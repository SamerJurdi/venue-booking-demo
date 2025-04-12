# Venue Booking Demo
This project demonstrates a venue booking system for an educational organization built with PostgreSQL, Node.js, and Vue.js with Tailwind CSS.

# Project Plan
Users are assigned different access levels based on their roles. Depending on the role, users can block time slots, reserve a venue, or join an existing reservation.

## Role Based Access
There are three main roles: Admins, Professors, and Students.
### Admins:
- Define blocked booking hours, either as one-time occurrences or on recurring schedules (daily, weekly, or annually).
- Add users, venues (halls/rooms), and new roles.
### Professors:
- Book available time slots, including recurring reservations.
- Edit or cancel their own bookings.
- Restrict a reservation to certain groups or individuals.
- Approve join requests for reservations.
- View participant statuses (e.g., Confirmed, Tentative, Not Attending)
### Students:
- View available bookings and participant lists.
- Join open reservations.
- Apply for closed resrevations.
- Cancel their participation.

# Tech Layers
This project is divided into three distinct layers, each treated as an independent project:
- `database`: Contains the database schema, demo data, and a setup guide.
- `server`: A Node.js backend that manages communication and session management between the client and the database.
- `client`: A front-end application built with Vue.js using the Vite framework and fully styled with Tailwind CSS.

Each layer is independent, allowing us to scale them at different rates or change a layer if needed, as long as the data structures remain consistent.