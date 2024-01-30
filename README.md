# Treehouse FSJS Techdegree
### Project 10: Full Stack App with React and a REST API
Author - Hans Steffens: <a href="https://www.linkedin.com/in/hanscode/" target="_blank">LinkedIn</a>

## Project Overview
This project is about a full stack web application that provides an intuitive way for users to administer a school database containing information about courses: users can interact with the database by retrieving a list of courses, viewing detail for a specific course, as well as creating, updating, and deleting courses in the database.

Developed using React, this client interface uses a fictional school database connecting to a REST API I created in a previous project: <a href="https://github.com/hanscode/rest-api-sql-v3" target="_blank">REST API using Express</a>

![Screenshot on 2024-01-30 at 17_52_10](https://github.com/hanscode/full_stack_app_react_rest_api-v1/assets/3813749/0ebe5ea8-e387-4f11-b4f1-1cd31d3b442d)


## Technologies used
HTML, CSS, JavaScript, Node.js, Express, Sequelize, React, JSX, React Router, React Context API, Fetch API and Create React App

## 🛠 Installation & Set Up

This project is set up in two different folders that both need to run: `/api` (Back End) and `/client`(Front End) 

1. Install dependencies

   ```sh
   npm install
   ```

2. Start the development server

   ```sh
   npm start

> [!NOTE]  
> <b>Additional note for macOS Monterey (or higher) users:</b> <br />
> Apple introduced some changes with AirPlay when they launched macOS Monterey. Now, the AirPlay Receiver uses ports 5000 and 7000. You will need to follow <a href="https://support.apple.com/en-bw/guide/mac-help/mchl15c9e4b5/mac" target="_blank">these instructions</a> to turn off the AirPlay receiver, to be able to use port 5000 with this project.
