# GitBuddy


1. What is the problem you’re solving?
An easy way to collect follower emails from GitHub to communicate with fans and production partners.

2. What is the solution?
GitBuddy: A webapp that scrapes your followers and your repos stargazers, saves to a database, and presents you with the results. 

3. What is the MVP scope? (core features you must get working)
Oauth to login/connect with GitHub
API call to gather user info and repo details.
Display repo followers to user.
Create CSV export for user.


4. What are the tough technical challenges involved with solving this problem?
Use of OAuth
APIs - different encoded data
React w/ Async
React Router


5. What are the stretch goals?
Capacity to interact with other APIs, e.g. Soundcloud, Medium, etc.

6. What is the technology stack?
React & React Router
Node/Express
Third Party APIs
Authentication
MongoDB for Users
David & Greg: Front-end
Kushal & Joseph: Back-end

Notes regarding the back end

Client ID, Client secret and Mongo URI are encrypted using dotenv package. You will need to obtain your own Client ID, Client secret and Mongo URI for middleware to function correctly.
Please also note that any API requests to the gitHub API require an Authorization header that includes the access token returned on a successful OAuth login - this allows you to see the email property from any user that has allowed their email to be public. The Authorization header also increases the rate limit for requests to the API.
