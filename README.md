# Cheque Management Web App

## Overview

The Cheque Management Web App is a comprehensive solution designed to manage a company's incoming and outgoing cheques efficiently. This application allows users to add, view, and modify cheque details, filter cheques based on date periods and status, and provides a summary of pending and upcoming cheques on the home page.

## Features

### Version 1.0

- **Incoming Cheques Management**:
  - Add cheque details.
  - View and modify cheque information.
  - Filter cheques by date period and status.
  - Dashboard:
    - View the total amount of pending cheques.
    - Display cheques for the upcoming week.

## Technologies Used

### Frontend

- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Material-Tailwind-React**: Components library that integrates Material Design with Tailwind CSS.

### Backend

- **Spring Boot**: Version 3.2.3, a framework for building Java-based applications.

### Database

- **MySQL**: Relational database management system.

## Getting Started

### Prerequisites

- Node.js and npm (for frontend)
- Java Development Kit (JDK) 11 or higher (for backend)
- MySQL server

### Installation

#### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd cheque-management-system-ui
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

#### Backend

1. Navigate to the frontend directory:
   ```bash
   cd cheque-management-app
   ```
2. Build the project using Maven:
   ```bash
   mvn clean install
   ```
3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

#### Database

1. Set up your MySQL database and create the necessary schema.
2. Build the project using Maven:
   ```bash
   mvn clean install
   ```
3. Update the database configuration in the Spring Boot application (application.properties).

## Usage

Once the frontend and backend servers are running, you can access the application via your web browser. The home page will display a summary of pending cheques and cheques for the upcoming week. Use the navigation options to add new cheques, view details, and apply filters.

## Demo

Below are screenshots of some of the pages in the Employee Management System Web App:

1. **Home Page**:
   ![Home Page](/ss/home.png)

2. **Add Cheque Page**:
   ![Add Cheque Page](/ss/AddCheque.png)

3. **Update Cheque Page**:
   ![Edit Cheque Page](/ss/updateCheque.png)

4. **Cheque List Page**:
   ![Cheque List Page](/ss/chequeList.png)

5. **Add customer pop-up Page**:
   ![Add customer Page](/ss/AddCustomer.png)
