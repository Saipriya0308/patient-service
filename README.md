# HMIS Patient Service

A full stack patient management app for a hospital management system (HMIS). A Spring Boot REST API stores patient records, and a React front end lets staff log in, register patients, search them, and update their details.

## Screenshots

### Login
![Login page](screenshots/login-page.png)

### Patient list with search and gender filter
![Patient list](screenshots/patient-list.png)

### Register and update a patient
![Register patient](screenshots/register-patient.png)

## Tech stack

- Backend: Java 17, Spring Boot 4, Spring Data JPA, Hibernate, Bean Validation, Lombok
- Database: H2 (in memory, for development)
- API docs: Swagger UI through springdoc-openapi
- Frontend: React with Vite, plain CSS

## Features

- Register a patient, with validation on name, age, gender, phone and email
- Duplicate phone numbers are blocked
- Search patients by name, with partial and case-insensitive matching
- Filter patients by gender
- Update a patient by double clicking their row in the list
- Patient records are never deleted, so the history is kept
- Demo login screen and sidebar navigation
- CORS configured so the React app can call the API

## API endpoints

| Method | Endpoint | What it does |
| --- | --- | --- |
| POST | /api/patients | Register a new patient |
| GET | /api/patients | List all patients |
| GET | /api/patients/{id} | Get one patient by id |
| GET | /api/patients/search?name=pri | Search by name |
| GET | /api/patients/search/gender?gender=female | Filter by gender |
| PUT | /api/patients/{id} | Update a patient |

Full interactive docs are at http://localhost:8080/swagger-ui.html when the backend is running.

## Project structure
patientservice/ src/main/java/...      Spring Boot backend controller/          REST endpoints service/             business logic repository/          database access model/               Patient entity exception/           custom exceptions config/              CORS setup frontend/              React app src/pages/           Dashboard, Register Patient, Patient List screenshots/           images used in this README pom.xml

## How to run

You need Java 17 or newer, Node.js and npm.

### 1. Start the backend

./mvnw spring-boot:run

On Windows, use mvnw.cmd spring-boot:run instead. The API starts on http://localhost:8080. You can also run PatientserviceApplication from IntelliJ.

### 2. Start the frontend

cd frontend npm install npm run dev

Open http://localhost:5173 and sign in with the demo login, username admin and password admin123.

## Roadmap

- Appointment service as a second microservice
- Real login with Spring Security
- Docker and Docker Compose
- PostgreSQL instead of H2

## Author

Nayani Saipriya, Java backend developer, Hyderabad.