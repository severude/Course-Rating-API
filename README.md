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
6) npm test - Tests that the project is setup correctly and that the user authenticaton works.

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
---
It's finished, Dale!!

Shout for joy, run around the block, buy yourself something awesome--do something for yourself! Finishing project 11th is such a huge accomplishment. It really is a tough one so I commend you for getting this far. The accomplishment is not a small one to take lightly, this is some elite stuff. You were so thorough through your FIRST (let me emphasize, because this is a notorious project if it's the first time creating an API) submission.

Reading, snatching data from, and creating APIs will be a part of your career as a developer, so read up more on what APIs have to offer that you have yet to explore. I know I'm going to build an API to attach to any one of my projects for some added practice.

Moving on to the final project! Finally, you've made it to the end. Review any technologies and topics that have baffled you. As an extra (of course this is up to you), you can use the technology that you had trouble with before and create your last project with it. Whatever you do, you'll be propelling yourself in another higher category of achievers.

We're excited to see what you'll do for your final project!