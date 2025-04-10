# Step-by-Step Instructions for Windows (Using Git Bash)
## Requirements:
### Install Git Bash:
Download and install Git Bash from:
https://gitforwindows.org/

### Install PostgreSQL v17:
Download PostgreSQL v17 from:
https://www.postgresql.org/download/windows/
During installation, make sure to check the box that adds PostgreSQL's bin folder to your PATH.
If not added automatically, note the installation path (e.g., C:\Program Files\PostgreSQL\17\bin) and add it to your Windows PATH variable.

## Setting up the database:
Launch Git Bash from the Start Menu and navigate into the databse folder.

### Create the Database:
In Git Bash, run the following command:

```bash
createdb venue_booking_db
```
If createdb is not found, try the alternative using psql:

```bash
psql -U postgres -c "CREATE DATABASE venue_booking_db;"
```
This creates a new database named venue_booking_db.

### Initialize the Database Schema:

```bash
psql -U postgres -d venue_booking_db -f schema.sql
```
This connects to venue_booking_db and executes the SQL commands inside schema.sql to create all tables and constraints.

### Verify the Setup (Optional):

```bash
psql -U postgres -d venue_booking_db -c "\dt"
```
This lists all tables in the database so you can confirm that the tables were created correctly.
 ### Claering the database (Optional):
  ```bash
 psql -U postgres -d venue_booking_demo -c 'TRUNCATE TABLE "ReservationParticipants", "Reservation", "VenueType", "Venue", "UserType", "Type", "User" CASCADE;'
 ```
 This deletes all the mentioned tables and their data.