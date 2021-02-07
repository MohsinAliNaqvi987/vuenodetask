Instructions to run this project:

1. First open your code editor in any folder you want to clone the project.
2. After cloning, go to the cloned folder by running "cd vuenodetask".
3. Run command "npm install" to install dependencies.
4. You have to create your own Google O-auth client id to check Google Authentication.
5. For that, go to Google Developers Console and create a New Project.
6. Give it any name and click create.
7. Then go to Credentials tab on left side and then click Create Credentials and choose OAuth client Id.
8. After that it will ask you to Configure Conscent Screen click on that button.
9. Choose External User Type from there and click Create.
10. Then OAuth Conscent Screen will appear.
11. Give any name in App name and give email address (also in provide Developer Contact information email address.)
12. Click on Save and Continue.
13. In Scopes screen click on Add Or Remove Scopes.
14. Choose first three scopes.
    .../auth/userinfo.email	
    .../auth/userinfo.profile
    openid
    and click on Update.
15. Then Click on Save and Continue.
16. In Test Users screen directly click on Save and Continue.
17. Then on Summary Screen click on Back to Dashboard.
18. Then again from Credentials tab click on Create Credentials and choose OAuth client Id.
19. Select Application type as Web Application.
20. And click on Add Url Button in Authorised JavaScript origins
21. And provide "http://localhost:4000" there and then click Create button.
22. Your Client Id will be created. Copy this Client Id and paste in the below files.
    With in Data variables names "params"
        Signup.vue Line Number 48.
        Login.vue Line Number 39. 
23. Now run "npm run dev" to run front end.
24. Open a second terminal in your editor and from vuenodetask folder, go to the server 
   folder by running "cd server".
25. Now run server by running "node server.js".
