
        ==> git init - create a new repo
            git status - view the changes to your project code 
            git add - add files to staging area
            git commit - created a new commit with files from staging area
            git log - view recent commits



Remove the package-lock.json : git rm package-lock.json  
To push exiting project  : heroku git:remote -a my-daily-expenses 
final : git push heroku master:master
heroku open

this command add modified files not new files : git commit -am "comment here"


yarn install --production



-heroku config - it print out all of your environment variable
		-heroku config:set KEY=value - it set up the env variable
		-heroku config:unset - remove the env variable	


-npm install --legacy-peer-deps
-npm i -g npm@5.10.0 
-npm root -g
-C:\Users\Neeti\AppData\Roaming\npm\node_modules
-yarn add history@4.7.2

=> user.uid - we need to store the id in redux so we can use this value throwout the application to figure out id someone login if so who .
    for this we need to create new auth reduser file and add some action in action's auth file.

=>PrivateRoute - this will help us to create private routes menas without login we can't able to access the appliation we can do this by modifing the AppRouter's <Router>

=>...Rest - when we creating object we can spread out the operater and it's properties (ex - ...props)
        and when we create destructure the object we use reast operator(...rest) which contain all of staff that we didn't destructured and rest it just name we can change it.

=>firebase db is still read and write by anybody so in order to achually that feature usefull we have to lock down the data.
    there are some rules :
        lean more : docs - guids - realtimeguide feature - security user data
        and we do it in firebase a/c
=>client side validation - give user readable , usefull response quickly
=>serverside validation - make sure nothingsor not valid get save

=>define the rules in the firebase's rule section 
    and enable the authorized Domain in Authentication section
lean more : docs - guids -reference - security -db rules