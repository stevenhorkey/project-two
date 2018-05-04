# Project Requirements

This document outlines the base requirements for Project 2.

### Requirements

Your project must:

* Use a Node and Express Web Server;

* Be backed by a MySQL Database an ORM (not necessarily Sequelize);

* Have both GET and POST routes for retrieving and adding new data;

* Be deployed using Heroku (with Data);

* Utilize at least one new library, package, or technology that we haven’t discussed;

* Have a polished frontend / UI;

* Have folder structure that meets MVC Paradigm;

* Meet good quality coding standards (indentation, scoping, naming).

* Must not expose sensitive API key information on the server, see [Protecting-API-Keys-In-Node.md](../../../10-nodejs/03-Supplemental/Protecting-API-Keys-In-Node.md)

### Suggestions

Your project _should_:

* Incorporate Basic Testing Framework, see [Project Suggestions](../Suggestions/README.md);

* Use Handlebars for Server-Side Templating

* Incorporate Authentication (JSON Web Tokens, Sessions, Etc.)

* Use an existing public dataset to power the database

* Create a migration strategy for sharing data across team members.

# Week 16 - Project Suggestions

### Overview

Since projects are being worked on this week, you won't have a homework assignment, but a project is a perfect context in which to practice writing tests! 

Incorporate a few of the below suggestions into your project. You'll write better code, and it will help you consolidate your testing habits.

- - -

### Testing Suggestions

* Set up Karma so you can run your tests as you develop.

* Prior to implementing a feature, use Nightmare to write a functional test for it.

* Prior to implementing a function, use Mocha and Chai to write unit tests against it.

* Run your tests prior to committing your code so you can be sure nothing breaks between commits.

* **Non-Obligatory Bonus**: If you're confident and feel like you have some time to tinker, set up [Travis CI](https://travis-ci.org/). This will automatically run your tests whenever you or any of your team members makes a commit. 
