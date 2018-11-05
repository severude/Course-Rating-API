# Build a Course Rating API With Express

In this project, you’ll create a REST API using Express. The API will provide a way for users to review educational courses: users can see a list of courses in a database; add courses to the database; and add reviews for a specific course.

To complete this project, you’ll use your knowledge of REST API design, Node.js, and Express to create API routes, along with Mongoose and MongoDB for data modeling, validation, and persistence.

# Setup Instructions

1) npm install - Installs all build dependencies
2) From the seed-data directory run the following commands to seed the MongoDB database.
```javascript
mongoimport --db course-api --collection courses --type=json --jsonArray --file courses.json
mongoimport --db course-api --collection users --type=json --jsonArray --file users.json
mongoimport --db course-api --collection reviews --type=json --jsonArray --file reviews.json
```
3) mongod - Runs the primary daemon process for the MongoDB system
4) npm start - Launches the app on port 5000
5) Routes can be verified using the Postman tool for API Development.  The provided CourseAPI.postman_collection.json file contains a a collection of Postman requests.

# Available REST API Endpoints
```javascript
GET /api/users
POST /api/users
GET /api/courses
GET /api/course/:courseId
POST /api/courses
PUT /api/courses/:courseId
POST /api/courses/:courseId/reviews
```