🏫 NAAC – University Accreditation Management System

A Spring Boot–based accreditation management platform designed to help universities store, manage, and verify NAAC-related data including programs, semesters, students, faculty, and departmental submissions.

🚀 Features

Program & semester structure management

Bulk student import via Excel (Apache POI)

Student status tracking (Active / Dropout / Graduated)

Automated semester assignment based on admission year

Program-name normalization for accurate imports

MySQL cloud + local support

REST APIs for all modules

Ready for university domain deployment

🛠️ Tech Stack

Backend: Spring Boot, Java, JPA/Hibernate
Database: MySQL
Excel Processing: Apache POI
Deployment: Railway / University Server
Build Tool: Maven

📦 Environment Variables

Your project depends on the following environment variables.
(These map exactly to your current application.properties)

Variable	Description
SPRING_DATASOURCE_URL	Your MySQL database URL (e.g., jdbc:mysql://host:3306/dbname)
SPRING_DATASOURCE_USERNAME	Database username
SPRING_DATASOURCE_PASSWORD	Database password
SPRING_JPA_HIBERNATE_DDL_AUTO	JPA schema mode (update, validate, etc.)
SPRING_JPA_SHOW_SQL	Enable SQL logs (true/false)
SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT	Hibernate dialect (usually MySQL8Dialect)
SERVER_PORT (optional)	Custom port (default = 8080)

⚠️ Do NOT commit .env or credentials in GitHub.

🔧 Local Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/yourusername/naac-system.git
cd naac-system

2️⃣ Configure Environment Variables

Create a .env file (not committed to GitHub):

SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/naac_system
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=yourpassword
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_JPA_SHOW_SQL=true
SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT=org.hibernate.dialect.MySQL8Dialect

3️⃣ Run Application
./mvnw spring-boot:run

📁 Excel Import Format

Your bulk student import requires the following columns in this exact order:

Column Index	Column Name
1	Admission ID
3	Student Name
5	Program
6	Batch (e.g., 2021–2025)
14	Gender
20	Student Status

Program names are auto-normalized (spaces removed, case-insensitive).

🌐 Deployment
🚀 Railway Deployment

Connect repo

Add all environment variables in Railway → Variables

Deploy service

Attach MySQL (if using Railway DB)

Done

🏫 University Domain Deployment

IT department provides SSH/server access

Upload Spring Boot JAR

Set environment variables in server

Run:

java -jar naac-system.jar


University IT maps domain → server port

👥 Team Members

Harshit Atri — Backend Development

(Add others if required)

📜 License

Internal academic project — university use only.
