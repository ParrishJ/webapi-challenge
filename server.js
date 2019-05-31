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
  console.log(req.params.id);
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

module.exports = server;
