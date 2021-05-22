
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