# TechTracker

# Summary 

The initial idea was a tech tracker app, then I wanted to expand its application so I made it a general activity tracker app. I believe this makes the application both more enjoyable and easier to use. The project was a simple react native app with a login/signup functionality and four stack screens once logged in. I used drawer navigation for this application, to get between the Home, Session, Statistics, and Inspiration page. The inspiration page is simply a webview of my blog where I can post thought-provoking content, and also view my portfolio. I'll talk about the specifics.

 + Login / Signup Page
 + Home
 + Session
 + Statistics
 + Inspiration

## Login / Signup Page

These two pages were simple; just a form using React-Native-Elements for the input fields, and I used local state management for these two pages. When a user is created they are stored in a users collection, and when pulled, we get document_id, first name, last name, email, and password. Only the id, email, and first name are enocoded and sent back when a user logs in. The encoding is using JWT; stored in either the client machines local or asynchronous storage. Then when the user uses the internal application, authentication middleware is used in my server to ensure these requests have a token heading them. If not, they are blocked. Once a user successfully logs in, they have access to the home page.

## Home Page

The home page is just a summary explaining the idea for the app, what I hope it does, and how to use it. For this page I simply added some font styling to the text, and added a scroll view to the page to make sure all the text was visible. A header saying "Welcome home" was added to the page. 

## Session Page

The session page is the center of the app, but the simplest page. You can add an activity to the drop down by just clicking add activity, typing the activity, then pressing the create activity button that appears. Then you can choose an activity, press start and then press stop when finished with the activity. Once stopped, then the session is sent to the backend where the final duration, hour and day are calculated and stored in MongoDB. From all this information, we can fill our statistics page with data.

## Statistics Page

This page is where we extract insight from the session objects specific to this user. Each session object is tagged with a specific user ID so only those sessions are retrieved from the backend. You just choose an activity from the drop-down here, then click get stats. Two graphs, a line graph and a bar chart appear with the data they respresent for the particular activity. 

##

The inspiration page was just a webview of my blog, as stated above.

# Conclusion

There were a few things I would refine if I had more time.

1) Organize all the activities in the drop down alphabetically, or even implement an activity search
2) Create more reactive charts in plotly.js, as the chart kit library I used was not very interactive.
3) The user interface is rudementary and my last priority when creating this project; I would go back and spend more time on user experience. 

Overall, I'm extremely happen with the project. The final powerpoint is in the repository named FinalPresentation.pptx
