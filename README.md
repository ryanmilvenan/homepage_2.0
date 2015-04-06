# Homepage_2.0
An aggregator for everything you want online.

##Team Name 

The Grads

##Members

Melissa Bica <br />
Zhihao Wu  <br />
Ryan Milvenan <br />

##Overview

We are going to create an API aggregator that can be used as an online dashboard. Users will be able to choose which APIs they want to display content from and organize/customize this content on their dashboard. We would like each different API to have its own widget, and widgets could be dragged and dropped by the user’s preference. Users will also be able choose to have multiple pages, such as one for finances and one for social networking. Any website that provides an RSS feed will be able to be used with this system, and we also want to incorporate many different social networking APIs, including Gmail, Twitter, and Facebook.

On a user’s initial visit to the site, there will be a default dashboard displayed with a few widgets that will appeal to a wide variety of users (such as news sites). There will be an option to fork/customize the dashboard by creating an account. This is how users will be able to add widgets that are associated with online accounts, such as Gmail. User accounts will be stored in JSON format and will be exportable so that users can share their dashboards with others. When exporting, only public content will be included, and not content associated with other online accounts.

##Technology

NodeJS  <br />
ExpressJS  <br />
ReactJS  <br />
mongoDB <br />
Socket.IO <br />
feedParser <br />
Skeleton <br />
Oauth <br />
Browserify <br />
Gmail API <br />
Twitter API <br />

##Learning 

sessions/user accounts, build automation, UI, oAuth, websockets, import/export to file, various API's

##Responsibilities

Melissa - UI, Import/Export, RSS verification and display
Zhihao - API integrations, Sockets
Ryan - sessions, database, build automation 

##Milestones

1. Create initial server-client communication layer, with build automation, and import/export 
2. Create user system, default content for no sign-in, and multiple tabs to support separate layouts
3. External API integration
4. Improve UI and UX

##Q/As
###Are you making iGoogle? Similar features? 
Yes- limited API support, RSS, user experience, make it personal and customizable

###Is this going to be a Chrome extension or its own website?
Its own website- we are going to use Node, Mongo backend, and React among others
