const express = require("express");
const server = express();

const Projects = require("./data/helpers/projectModel");
const Actions = require("./data/helpers/actionModel");

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h1>BACKEND SPRINT CHALLENGE 1</h1>`);
});

// Projects CRUD ops

server.post("/projects", (req, res) => {
  const { name, description } = req.body;
  Projects.insert({
    name,
    description
  })
    .then(resonse => {
      res.status(201).json({ name, description });
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while adding the project to tha database"
      });
    });
});

server.get("/projects/:id", (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  Projects.get(id)
    .then(project => {
      res.status(200).json({ project });
    })
    .catch(error => {
      res.status(500).json({ error: "Project could not be retrieved" });
    });
});

server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  Projects.update(id, { name, description })
    .then(response => {
      res.status(200).json({ name, description });
    })
    .catch(error => {
      res.status(500).json({ error: "Project could not be updated" });
    });
});

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  Projects.remove(id)
    .then(response => {
      res.status(200).json({ message: "Project removed successfully" });
    })
    .catch(error => {
      res.status(500).json({ error: "Error removing project" });
    });
});

//CRUD ops for Actions

server.post("/actions/:id", validateId, (req, res) => {
  const { description, notes } = req.body;
  const project_id = req.params.id;
  Actions.insert({
    description,
    notes,
    project_id
  })
    .then(response => {
      res.status(201).json({ description, notes, project_id });
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while adding the action to the database"
      });
    });
});

server.get("/actions/:id", (req, res) => {
  const { id } = req.params;
  console.log(req.params.id);
  Actions.get(id)
    .then(action => {
      res.status(200).json({ action });
    })
    .catch(error => {
      res.status(500).json({ error: "Action could not be retrieved" });
    });
});

server.put("/actions/:id", (req, res) => {
  const { id } = req.params;
  const { description, notes } = req.body;
  Actions.update(id, { description, notes })
    .then(response => {
      res.status(200).json({ description, notes });
    })
    .catch(error => {
      res.status(500).json({ error: "Action could not be updated" });
    });
});

server.delete("/actions/:id", (req, res) => {
  const { id } = req.params;
  Actions.remove(id)
    .then(response => {
      res.status(200).json({ message: "Action removed successfully" });
    })
    .catch(error => {
      res.status(500).json({ error: "Error removing Action" });
    });
});

//custom middleware

function validateId(req, res, next) {
  Projects.get(req.params.id).then(project => {
    if (project === null) {
      res.status(400).json({ error: "Project does not exist" });
    } else next();
  });
}

module.exports = server;
