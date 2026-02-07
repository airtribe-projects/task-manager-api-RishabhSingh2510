const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let tasks = [
  {
    id: 1,
    title: "Set up environment",
    description: "Install Node.js, npm, and git",
    completed: true,
    priority: "high",
    createdAt: "2026-02-05T10:00:00.000Z"
  },
  {
    id: 2,
    title: "Create a new project",
    description: "Create a new project using the Express application generator",
    completed: true,
    priority: "high",
    createdAt: "2026-02-03T10:00:00.000Z"
  },
  {
    id: 3,
    title: "Install nodemon",
    description: "Install nodemon as a development dependency",
    completed: true,
    priority: "medium",
    createdAt: "2026-02-01T10:00:00.000Z"
  },
  {
    id: 4,
    title: "Install Express",
    description: "Install Express",
    completed: false,
    priority: "high",
    createdAt: "2026-01-30T10:00:00.000Z"
  },
  {
    id: 5,
    title: "Install Mongoose",
    description: "Install Mongoose",
    completed: false,
    priority: "high",
    createdAt: "2026-01-28T10:00:00.000Z"
  },
  {
    id: 6,
    title: "Install Morgan",
    description: "Install Morgan",
    completed: false,
    priority: "medium",
    createdAt: "2026-01-26T10:00:00.000Z"
  },
  {
    id: 7,
    title: "Install body-parser",
    description: "Install body-parser",
    completed: false,
    priority: "medium",
    createdAt: "2026-01-24T10:00:00.000Z"
  },
  {
    id: 8,
    title: "Install cors",
    description: "Install cors",
    completed: false,
    priority: "medium",
    createdAt: "2026-01-22T10:00:00.000Z"
  },
  {
    id: 9,
    title: "Install passport",
    description: "Install passport",
    completed: false,
    priority: "low",
    createdAt: "2026-01-20T10:00:00.000Z"
  },
  {
    id: 10,
    title: "Install passport-local",
    description: "Install passport-local",
    completed: false,
    priority: "low",
    createdAt: "2026-01-18T10:00:00.000Z"
  },
  {
    id: 11,
    title: "Install passport-local-mongoose",
    description: "Install passport-local-mongoose",
    completed: false,
    priority: "low",
    createdAt: "2026-01-16T10:00:00.000Z"
  },
  {
    id: 12,
    title: "Install express-session",
    description: "Install express-session",
    completed: false,
    priority: "low",
    createdAt: "2026-01-14T10:00:00.000Z"
  },
  {
    id: 13,
    title: "Install connect-mongo",
    description: "Install connect-mongo",
    completed: false,
    priority: "low",
    createdAt: "2026-01-12T10:00:00.000Z"
  },
  {
    id: 14,
    title: "Install dotenv",
    description: "Install dotenv",
    completed: false,
    priority: "medium",
    createdAt: "2026-01-10T10:00:00.000Z"
  },
  {
    id: 15,
    title: "Install jsonwebtoken",
    description: "Install jsonwebtoken",
    completed: false,
    priority: "medium",
    createdAt: "2026-01-08T10:00:00.000Z"
  }
];

let nextId = tasks.length + 1

function validation(req,res,next){
    const {title, description,completed, priority} = req.body;

    const allowedPriorityValues = ["low","medium","high"];

    if (!title || typeof title !== "string") {
        return res.status(400).json({ error: "Title is required and must be string" });
    }

    if (!description || typeof description !== "string") {
        return res.status(400).json({ error: "Description is required and must be string" });
    }

    if (completed !== undefined && typeof completed !== "boolean") {
        return res.status(400).json({ error: "Completed must be boolean" });
    }

    if(priority !== undefined && !allowedPriorityValues.includes(priority)){
      return res.status(400).json({error: "Priority must be low, medium or high."});
    }

    next();
}

app.get("/tasks",(req,res) => {

    const {completed,sort} = req.query;
    let result = tasks;

    //filtering
    if (completed !== undefined){
        const isCompleted = completed === "true";
        result = tasks.filter(t => t.completed === isCompleted);
    }

    //Sorting
    if(sort !== undefined){
        if(sort!=="asc" && sort !== "dsc"){
            return res.status(400).json({error : "completed must be asc or dsc."});
        }

        result.sort((a,b) => {
            const da = new Date(a.createdAt);
            const db = new Date(b.createdAt);

            return sort === "asc" ? da-db : db-da;
        });
    }

    res.json(result);
});

app.get("/tasks/:id",(req,res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task){
        return res.status(404).json({error: "Task Not Found"});
    }
    res.json(task);
});

app.get("/tasks/priority/:level",(req,res) => {
  const level = req.params.level.toLowerCase();

  const allowedPriorityValues = ["low","medium","high"];

  if(!allowedPriorityValues.includes(level)){
    return res.status(400).json({error: "Priority must be low, medium or high."});
  }

  const filteredTasks = tasks.filter(t => t.priority === level);

  res.json(filteredTasks);
});

app.post("/tasks",validation,(req,res) => {
    const task = {
        id : nextId++,
        title : req.body.title,
        description : req.body.description,
        completed : req.body.completed ?? false,
        priority: req.body.priority ?? "medium",
        createdAt : new Date().toISOString()
    };
    tasks.push(task);
    res.status(201).json(task);
});

app.put("/tasks/:id",(req,res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send("Task Not Found");

    validation(req,res,() => {
      task.title = req.body.title;
      task.description = req.body.description;
      task.priority = req.body.priority;
      task.completed = req.body.completed;
      res.json(task);
    });
    
});

app.delete("/tasks/:id",(req,res) => {
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send("Task Not Found");
    const deletedTask = tasks.splice(index,1);
    res.json(deletedTask);
});


app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;