const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'));

//middleware to simplify try/catch blocks
function asyncHandler(callBackFunction){
  return async (req, res, next)=>{
    try{
      await callBackFunction(req, res, next);
    } catch(err){
      res.render('error', {error: err})
    }
  }
}


// //CALL BACKS - - - - - - - - - - - -- - -  - -
// function getUsers(cb){
//   fs.readFile('data.json', 'utf8', (err, data) => {
//     if (err) return cb(err);
//     const users = JSON.parse(data);
//     return cb(null, users);
//   });
// }

// app.get('/', (req,res) => {
//   //async methods in node that accept callbackes take an error aas first param
//   getUsers((err, users)=>{
//     if (err){
//       res.render('error', {error: err});
//     } else {
//       res.render('index', {title: "Users", users: users.users});
//     }
//   });
// }); 

// //PROMISES- - - - -- - - -  - - - - - - - 

// function getUsers(){

//   return new Promise((resolve, reject)=>{
//     //fs.readFile is node module
//       fs.readFile('data.json', 'utf-8', (err, data)=>{
//         if (err){
//           //'resolve'/'reject' for promise
//           reject(err);
//         } else {
//           const users = JSON.parse(data)
//           resolve(users)
//         }
//       })
//   })
// }

// //getUsers must return a promise to use CATCH
// app.get('/', (req, res)=>{
//   getUsers()
//   .then((users)=>{
//     //define users parameter to handle data passed from getUsers
//     res.render('index', {title: "Users", users: users.users})
//   })
//   .catch((err)=>{
//     res.render('error', {error: err})
//   })
// })

//ASYNC/AWAIT - - - - - - - -- - -  - - --  -- - - - - - - - - - - - --
//easier to identify location of errors

//PROMISES- - - - -- - - -  - - - - - - - 

function getUsers(){

  return new Promise((resolve, reject)=>{
    //fs.readFile is node module
      fs.readFile('data.json', 'utf-8', (err, data)=>{
        if (err){
          //'resolve'/'reject' for promise
          reject(err);
        } else {
          const users = JSON.parse(data)
          resolve(users)
        }
      })
  })
}


// app.get('/', async (req, res)=>{
//   try {
//   const users = await getUsers();
//   res.render('index', {title: "Users", users: users.users});
//   } catch(err){
//     res.render('error', {error: err})
//   }
// })
//
//CODE WITHOUT ASYNC HANDLER MIDDLEWARE

app.get('/', asyncHandler(async (req, res)=>{
   const users = await getUsers();
    res.render('index', {title: "Users", users: users.users});
}));

app.listen(3000, () => console.log('App listening on port 3000!'));