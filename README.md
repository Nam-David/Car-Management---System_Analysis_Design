Chạy phía frontend tại /car-management-frontend với npm start

Chạy phía backend tại /car-management-backend với node /src/app.js

Đang nghiên cứu cách chạy song song bằng concurrently



HOW FRONTEND BE ORGANIZED
/**
Your frontend application, located in the car-management-frontend directory, is structured as follows:

public/: This directory contains static files that are not processed by Webpack. These include the HTML file that serves your app, images, and other assets.

src/: This is the main directory where your React code resides. It includes the following subdirectories and files:

components/: This directory contains reusable React components like CarDetails and CarList.
pages/: This directory contains React components that represent different pages in your application, such as CarDetailsPage and HomePage.
App.jsx: This is the main React component that acts as the root of your app.
index.jsx: This is the JavaScript entry point file where your React app is rendered into the HTML.
package.json: This file contains metadata about your app, such as its name, version, and dependencies.

.gitignore: This file specifies which files and directories should not be tracked by Git.

README.md: This file provides information about your project and how to use it.
**/



HOW BACKEND BE ORGANIZED
/**
The backend of your project is organized in a typical MVC (Model-View-Controller) structure. Here's a brief overview:

src/ - This is the main directory where your source code resides.
app.js - This is the entry point of your application.
config/ - This directory contains configuration files such as db.js (database configuration), schema.sql (SQL schema), and seed.sql (seed data).
controllers/ - This directory contains controller files. Controllers handle the logic for routes. For example, carController.js handles requests related to cars.
models/ - This directory contains model files. Models represent the data in your application. For example, carModel.js represents a car in your application.
routes/ - This directory contains route files. Routes define the endpoints of your application. For example, carRoutes.js defines the endpoints for cars.
The package.json file at the root of the backend directory defines the project metadata and dependencies.

The .gitignore file specifies the files and directories that should be ignored by Git.
**/
