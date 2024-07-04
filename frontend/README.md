# Website Scraping Web App

A web application to scrape company data from websites, display it in a table with pagination, and download it as a CSV file.

## Features

- Scrape data from a website and store it in a MongoDB database.
- Display scraped data in a paginated table.
- Download the company data as a CSV file.
- Delete selected companies from the database.


## Components

- **ScrapeForm**: Form for scraping new websites
- **CompanyTable**: Table displaying scraped companies with delete and view options
- **CompanyDetails**: Details of a specific company
- **CSVDownload**: Download company data as CSV
- **PaginationControls**: Component for navigating between pages of companies


## Installation

### Backend

1. Navigate to the `backend` directory.
2. Run `npm install` to install dependencies.

### Frontend

1. Navigate to the `frontend` directory.
2. Run `npm install` to install dependencies.

## Running the Application

### Backend

1. Navigate to the `backend` directory.
2. Run `npm start` to start the server.

### Frontend

1. Navigate to the `frontend` directory.
2. Run `npm start` to start the React development server.

## Environment Variables

Create a `.env` file in the `backend` directory and add the following variables:

