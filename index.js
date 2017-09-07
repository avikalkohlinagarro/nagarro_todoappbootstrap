var express = require("express");
var todoDB = require("./seed.js");
var bodyParser = require("body-parser");

var app = express();

app.use("/",bodyParser.urlencoded({extended:false}));

app.use("/", function (req,res,next) {
    console.log("Request");
    console.log(req.url);
    console.log(req.method);
    next();
})
// console.log(todoDB);
app.use("/", express.static(__dirname+"/public"));

app.get("/api/todos", function (req,res) {
    res.json(todoDB.todos);
})

app.get("/api/todos/active", function (req,res) {
    //var jsonObject = JSON.parse(todoDB.todos);
    var counter = 1;
    var newObject = {};
    Object.keys(todoDB.todos).forEach(function (index) {
        if (todoDB.todos[index].status == todoDB.StatusENUMS.ACTIVE) {
            newObject[counter] = todoDB.todos[index];
            counter++;
        }
    });
    res.json(newObject);
})

app.get("/api/todos/complete", function (req,res) {
    var counter = 1;
    var newObject = {};
    Object.keys(todoDB.todos).forEach(function (index) {
        if (todoDB.todos[index].status == todoDB.StatusENUMS.COMPLETE) {
            newObject[counter] = todoDB.todos[index];
            counter++;
        }
    });
    res.json(newObject);
})

app.get("/api/todos/deleted", function (req,res) {
    var counter = 1;
    var newObject = {};
    Object.keys(todoDB.todos).forEach(function (index) {
        if (todoDB.todos[index].status == todoDB.StatusENUMS.DELETED) {
            newObject[counter] = todoDB.todos[index];
            counter++;
        }
    });
    res.json(newObject);
})

app.delete("/api/todos/:id", function (req,res) {
    var idToBeDeleted = req.params.id;
    var tobeDeleted = todoDB.todos[idToBeDeleted];

    if (!tobeDeleted) {
        res.status(400).json({err: "Index does not exist"});
    }
    else {
        tobeDeleted.status = todoDB.StatusENUMS.DELETED;
        res.json(todoDB.todos);
    }
})

app.put("/api/todos/:id", function (req,res) {
    var idToBeChanged = req.params.id;
    var tobeChanged = todoDB.todos[idToBeChanged];

    if (!tobeChanged) {
        res.status(400).json({err: "Can't modify to do which does not exist"});
    }
    else {
        var todoName = req.body.todoTitle;
        console.log(req.body);
        if (todoName && todoName != "" && todoName.trim() != "") {
            tobeChanged.title = todoName;
        }
        var todoStatus = req.body.todoStatus
        if (todoStatus && (todoStatus== todoDB.StatusENUMS.ACTIVE || todoStatus== todoDB.StatusENUMS.COMPLETE)) {
            tobeChanged.status = todoStatus;
        }
        res.json(todoDB.todos);
    }
})

app.put("/api/todos/complete/:id", function (req,res) {
    var idToBeChanged = req.params.id;
    var tobeChanged = todoDB.todos[idToBeChanged];

    if (!tobeChanged) {
        res.status(400).json({err: "Can't modify to do which does not exist"});
    }
    else if (tobeChanged.status == todoDB.StatusENUMS.COMPLETE) {
        res.send("Status is already complete")
    }
    else {
        tobeChanged.status = todoDB.StatusENUMS.COMPLETE;
        res.json(todoDB.todos);
    }
})

app.put("/api/todos/delete/:id", function (req,res) {
    var idToBeChanged = req.params.id;
    var tobeChanged = todoDB.todos[idToBeChanged];

    if (!tobeChanged) {
        res.status(400).json({err: "Can't modify to do which does not exist"});
    }
    else if (tobeChanged.status == todoDB.StatusENUMS.DELETED) {
        res.send("Status is already deleted")
    }
    else {
        tobeChanged.status = todoDB.StatusENUMS.DELETED;
        res.json(todoDB.todos);
    }
})

app.put("/api/todos/active/:id", function (req,res) {
    var idToBeChanged = req.params.id;
    var tobeChanged = todoDB.todos[idToBeChanged];

    if (!tobeChanged) {
        res.status(400).json({err: "Can't modify to do which does not exist"});
    }
    else if (tobeChanged.status == todoDB.StatusENUMS.ACTIVE) {
        res.send("Status is already active")
    }
    else {
        tobeChanged.status = todoDB.StatusENUMS.ACTIVE;
        res.json(todoDB.todos);
    }
})

app.post("/api/todos", function (req,res) {
    // Title will be of the form todoTitle
    var tobeAdded = req.body.todoTitle;

    if (!tobeAdded || tobeAdded == "" || tobeAdded.trim() == "") {
        res.status(400).json({err: "ToDo Title can't be empty"});
    }
    else {
        var newToDoObject = {
            title : req.body.todoTitle,
            status : todoDB.StatusENUMS.ACTIVE
        }
        todoDB.todos[todoDB.nextToDoId] = newToDoObject;
        todoDB.nextToDoId += 1;
        res.json(todoDB.todos);
    }
})

app.listen(5000)