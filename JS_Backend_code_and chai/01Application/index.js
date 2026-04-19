
// Required Module Syntax hai
const express = require('express');

// Command Js 
// import express from 'express';


const app = express();
const port = 4000;


// https://api.github.com/users/hiteshchoudhary

 
// hum ek const vairiable bana dete hai, githubData

const githubData = {
  "login": "hiteshchoudhary",
  "id": 11613311,
  "node_id": "MDQ6VXNlcjExNjEzMzEx",
  "avatar_url": "https://avatars.githubusercontent.com/u/11613311?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/hiteshchoudhary",
  "html_url": "https://github.com/hiteshchoudhary",
  "followers_url": "https://api.github.com/users/hiteshchoudhary/followers",
  "following_url": "https://api.github.com/users/hiteshchoudhary/following{/other_user}",
  "gists_url": "https://api.github.com/users/hiteshchoudhary/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/hiteshchoudhary/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/hiteshchoudhary/subscriptions",
  "organizations_url": "https://api.github.com/users/hiteshchoudhary/orgs",
  "repos_url": "https://api.github.com/users/hiteshchoudhary/repos",
  "events_url": "https://api.github.com/users/hiteshchoudhary/events{/privacy}",
  "received_events_url": "https://api.github.com/users/hiteshchoudhary/received_events",
  "type": "User",
  "user_view_type": "public",
  "site_admin": false,
  "name": "Hitesh Choudhary",
  "company": null,
  "blog": "https://hitesh.ai",
  "location": "India",
  "email": null,
  "hireable": null,
  "bio": "I make coding videos on youtube and for courses. My youtube channel explains my work more. Check that out",
  "twitter_username": "hiteshdotcom",
  "public_repos": 111,
  "public_gists": 5,
  "followers": 46904,
  "following": 0,
  "created_at": "2015-03-23T13:03:25Z",
  "updated_at": "2025-07-28T07:05:10Z"
}



app.get('/', (req,res) => {
    // Res me hm send kr rahe Hello world
    res.send ('Hello World!')
})


app.get ('/twiiter', (req,res) => {
    // Res me hm send kr rahe About page
    res.send ('hiteshdotcom')
})


// Route bana rahe login ka, and callback me res,req bhej rahe
app.get('/login', (res,req) => {
    // Res me hm send kr rahe Login page
    res.send ('<h1>Login Page</h1>')
})

// Hot Reloading:
// nodemon  (ajb bhi koi code me change hoga, to bar bar server ko restart nahi karna padega
// npm install nodemon)


app.get('/youtube', (req,res) => {
    // Res me hm send kr rahe githubData
    res.send(<h2>Chai aur code</h2>)
})



app.get('/github', (req,res) => {
    // Res me hm send kr rahe githubData
    res.json(githubData);
} )


// port ke baad 1 call back laga diya
app.listen(process.env.PORT, ()=> {
    console.log(`Example app Listening on port ${port}`)
})
