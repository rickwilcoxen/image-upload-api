# HipBox Api - ReadMe
## Pitch
  Build an app that allows users to upload images onto a virtual file system. Ordinary users can only read/download an image where as Owners can do anything to the images they own.

## Links
  [Client deployed](https://sei-09-hip-hip-array.github.io/image-upload-client/)
  [Client repo](https://github.com/SEI-09-hip-hip-array/image-upload-client)

  [API deployed](https://aqueous-hamlet-25054.herokuapp.com/)
  [API repo](https://github.com/SEI-09-hip-hip-array/image-upload-api)

  Co-authored by:
  John Lucker github: https://github.com/luckyswims
  Frank Luis-Ravelo github: https://github.com/Frankazo
  Rick Wilcoxen github: https://github.com/rickwilcoxen

# Process
The process began with the following user stories. By looking at the user stories we had an idea of where we needed to start the plan further than needing a front end and backend.

## Git Rules and Culture code
### The Rules
Never merge your own pull request
Always make a new branch! Don’t work in master!
Always commit at the end of the day
Make an issue to work on a feature

### Our Culture code
Don’t be afraid to fail
Ask for help
Check in consistently
Get a third opinion
Don’t change someone else’s code without talking to them

## Our work schedule
### Daily Schedule
Stand up after 9am after morning announcements
9:40-Noon (working time)
12-1 Lunch
1-4:30 working time
4:30 check in/commits
4:50 Announcements / EOD

### Expected Schedule
Day 1 - work on back end
Day 2 - work on front end
Day 3 - debugging & documentation
### Actual Schedule
Day 1
  Work on wireframes, ERD, user stories.
  API Set up with mob programing.
  Basic html set up (one person).
  API -> created resource, set up create action, and set up read action.

Day 2
  API - Update action, delete action, and test resources end points with curl scripts.
  Client - Sign up (curl then web app), Sign in (curl then web app), change password (curl then web app), and sign out (curl then web app).

Day 3
  API - Test your resource's end points with curl scripts
    Add the relationship to a User
    Add User ownership to resource controller
  Client -  All API calls have success or failure messages
    Create resource (curl then web app)
    Get all of their owned resources (curl then web app)
    Delete single resource (curl then web app)
    Update single resource (curl then web app)
  Readme - adding all the things based off notes taken over the past few days.

## MVP User stories
  -As an unregistered user, I would like to sign up with email and password.
  -As a registered user, I would like to sign in with email and password.
  -As a signed in user, I would like to change password.
  -As a signed in user, I would like to sign out.
  -As a signed in user, I would like to upload an image to AWS.
  -As a signed in user, I would like to update the meta-data of my image on AWS.
  -As a signed in user, I would like to see the name of all images on AWS.
  -As a signed in user, I would like to see the thumbnail of all images on AWS.
  -As a signed in user, I would like to delete the reference of my image from the database.
  -As a signed in user, I would like to see the following meta-data for any image:
    date created/uploaded
    date modified
    owner (user who uploaded the image)
    tag

## Wireframes & ERD
![Image of Wireframes](https://user-images.githubusercontent.com/60274472/79871573-89f25980-83b2-11ea-831b-f8dec5616d21.png)

Our wireframes show a simplified version of what we expected to make from our user stories.

We knew that we needed seperate new user versus returning user screens. New users will be able to sign up by inputing their email and a password. Returning users will be able to sign in, and from there be able to change their password, upload an image, update image metadata, delete images, view all images uploaded, and users will also be able to sign out.

![Image of ERD](https://user-images.githubusercontent.com/60274472/79871568-88c12c80-83b2-11ea-9b16-67feb549d189.png)

Our ERD shows the relationship between our user and images. In this case there is one user to many images. A user can upload many different images but will only own and be able to delete the ones they have uploaded themselves.

# Process Continued...
## Tech used
  - Express.js
  - JavaScript
  - AWS
  - Mongodb
  - HTML/CSS
  - Postman
  - Bootstrap
  - Handlebars
  - Heroku
  - Atom teletype
  - Zoom Meetings

From then on we started to divide which dev does what to the project. At first we separated by front/back end. One person worked on client while two others worked on the backend. We were able to utilise atom teletype and Zoom Meetings to be able to share information, as well as work together on the same documents.

Atom teletype was very useful in this project. While using zoom meeting to share screen, one person would "drive" and the other would "navigate" in basic mob programming style. Sometimes communicating which section to work on would be difficult, or in fixing a small typo, one person could simply click and type where needed. By using atom teletype, everyone could type on the same document together.

## Divide and Conquer (Sometimes it worked, sometimes not)
We were able to divide and conquer in some instances, but other times it felt less necessary to divide, and better to conquer as a team.

We attempted to work all separately by being assigned a few different pages, without working on the same page as another. This was interesting and more complicated than it seemed like it was worth. While one worked on the html, another worked on handlebars, and these really need to be worked on in tandem. In working on a few different JavaScript files, it was tough to keep naming the same where needed. We would have to go in and change the names that were different. This was not a terrible issue as we weren't working on very many documents at once. In the future we would need to know which names we were using before starting to write code.

Near the end of the project we ended up working all together on the same files because we had finished the big chunks that would actually could divide and conquer on. Because we were working in a three person group, it was much easier working together rather than separating into thirds.

## Things we discovered / Fixed!
Update on AWS doesn't exist - when you upload the same file again, it just rewrites the upload. While mongodb CRUD has update, in AWS it does not. A very big confusion on our part ended up as an easy-ish fix in the end.

In deployment, we discovered we had forgotten to add the deployed link for our backend to our client. Oops! Easy fix.

## The Process of Working as A Group (In Conclusion)
We worked together really well overall with the combined goal of needing to finish MVP. While some really liked working on one part, other really liked working on another, and we were able to divide and conquer in an aspect that wouldn't conflict. Working together was really great when it came to debugging as well, because one person would see something another didn't. Even the smallest typo would be caught by one where it wasn't caught by two others.

With three people working together, we were able to really easily switch by working in a pair and alone. It was really exciting solving problems and finishing sections as a team. We all shared the excitement of finishing and learning together.

# Later Iterations
## Problems to Fix
Minor CSS clarity changes. Making the site cleaner.

All forms need to clear on submission.

## Additions in Version 2+
The main additions in later versions would be to add more functionality to the website. This would include adding more options for the user to add to the images, and more relationships.

A reach goal includes, "collaborators" which can be chosen for the images; they have permission to read from and write to images.

Another reach goal is that signed in users would be able to download from AWS.

# Dependencies
- [express.js](https://expressjs.com/)
- [mimetypes](https://www.npmjs.com/package/mime-types)
- [multer](https://www.npmjs.com/package/multer)
- [aws sdk](https://www.npmjs.com/package/aws-sdk)
- [passport](https://www.npmjs.com/package/passport)

# Additional Resources

- https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-nodejs.html#getting-started-nodejs-credentials
- https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-environment.html
- https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html
- https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html
