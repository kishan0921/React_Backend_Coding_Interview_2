
//1st step, express ko import karna hota hai
// 7th, ye jo import waala sytax hai ye module js ka hai,
import express from 'express';
// Note:
// Common Js use - krna hoga to requied waala sytax use karna hoga
// Module Js use - krna hoga to import waala sytax use karna

// So, Module js use krna hai to package.json me type ko module set karna hoga 
// "type": "module",




// 2nd step, express se ek app banane ka hota hai.
const app = express();

// Topic : 03 Build file use kr rahe, front waala
app.use(express.static('dist'));



// 3rd step, route define karna hota hai
// app.get('/', (req, res) => {    
//     // Res me hm send kr rahe Hello world
//     res.send('Hello World!');
// });


//Topic 02: Step 1
// get a list of 5 jokes
app.get('/api/jokes', (req, res) => {
    
    const jokes = [
        {
            id: 1,
            title: "Why did the scarecrow win an award?",
            content: "Because he was outstanding in his field!"
        },
        {            id: 2,
            title: "Why don't skeletons fight each other?",
            content: "They don't have the guts!"
        },
        {            id: 3,
            title: "What do you call fake spaghetti?",
            content: "An impasta!"
        },
        {            id: 4,
            title: "Why did the bicycle fall over?",
            content: "Because it was two-tired!"
        },
        {            id: 5,
            title: "What do you call cheese that isn't yours?",
            content: "Nacho cheese!"
        }
    
    ];
    res.send(jokes);
});

// 4th step, port define karna hota hai
const port = process.env.PORT || 3000; // Use environment variable or default to 4000   


// 5th step, app ko listen karana hota hai
app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});

// 6th step , ho gaya server ready




