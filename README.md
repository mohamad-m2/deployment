# BigLab 2 - Class: 2021 WA1

## Team name: BIGM

Team members:
* s282380 CORALLO GIULIO
* s281576 BAHIZI ALAIN DIVIN
* s280170 BRANCATI IVAN
* s287821 MOHAMAD MOHAMAD

## Instructions

A general description of the BigLab 2 is avaible in the `course-materials` repository, [under _labs_](https://github.com/polito-WA1-AW1-2021/course-materials/tree/main/labs/BigLab2/BigLab2.pdf). In the same repository, you can find the [instructions for GitHub Classroom](https://github.com/polito-WA1-AW1-2021/course-materials/tree/main/labs/GH-Classroom-BigLab-Instructions.pdf), covering this and the next BigLab.

Once cloned this repository, instead, write your names in the above section.

When committing on this repository, please, do **NOT** commit the `node_modules` directory, so that it is not pushed to GitHub.
This should be already automatically excluded from the `.gitignore` file, but double-check.

When another member of the team pulls the updated project from the repository, remember to run `npm install` in the project directory to recreate all the Node.js dependencies locally, in the `node_modules` folder.

Finally, remember to add the `final` tag for the final submission, otherwise it will not be graded.

## List of APIs offered by the server

Provide a short description for API with the required parameters, follow the proposed structure.

* [HTTP Method] [URL, with any parameter]
* [One-line about what this API is doing]
* [Sample request, with body (if any)]
* [Sample response, with body (if any)]
* [Error responses, if any]

### List Tasks

* HTTP Method: GET URL: `/api/tasks`
* Description: Retrieve a list of tasks
* Sample Request: EMPTY
* Sample Response: 
```
[{"id":2,
"description":"Go for a walk",
"important":1,
"private":1,
"deadline":"2021-04-14 08:30",
"completed":1},
{"id":4,
"description":"Watch the Express videolecture",
"important":1,
"private":1,
"deadline":"2021-05-24 09:00",
"completed":1}]
```
* Error Response:

### List Tasks (with filter)

* HTTP Method: GET URL: `/api/tasks/filters/:filter`
* Description: Retrieve a list of Tasks of a given filter
* Sample Request: EMPTY
* Sample Response:
```
[{"id":2,
"description":"Go for a walk",
"important":1,
"private":1,
"deadline":"2021-04-14 08:30",
"completed":1},
{"id":4,
"description":"Watch the Express videolecture",
"important":1,
"private":1,
"deadline":"2021-05-24 09:00",
"completed":1}]
```
* Error Response:

### Get a Task 

* HTTP Method: GET URL: `/api/tasks/:id`
* Description: Retrieve the Task with the gived id
* Sample Request: EMPTY
* Sample Response:
```
{"id":6,
"description":"Organize a party",
"important":0,
"private":0,
"deadline":"2021-05-22 20:30",
"completed":0}
```
* Error Response:

### Get max Task ID

* HTTP Method: GET URL: `/api/maxtaskid`
* Description: Retrieve the highest Task ID
* Sample Request: EMPTY
* Sample Response:
```
{"id":6}
```
* Error Response:

### Create a Task

* HTTP Method: POST URL: `/api/tasks`
* Description: Create a new Task
* Sample Request:
```
{"description": "description", 
"important": true, 
"privacy": true, 
"deadline": "2020-10-10 14:30"}
```
* Sample Response: "50"(last id)
* Error Response:

### Update a Task

* HTTP Method: PUT URL: `/api/tasks/:id`
* Description: Update a Task
* Sample Request: 
```
{"description": "description", 
"important": true, 
"privacy": true, 
"deadline": "2020-11-11 15:30",
"completed": false}
```
* Sample Response: "50"(id)
* Error Response:

### Mark a Task as Completed/Uncompleted

* HTTP Method: PUT URL: `/api/tasks/toggleCompleted/:id`
* Description: Update a Task ( Complete=false -> true, Complete=true -> false)
* Sample Request: EMPTY
* Sample Response: "50"(id)
* Error Response:

### Delete a Task

* HTTP Method: DELETE URL: `/api/tasks/:id`
* Description: Delete a Task
* Sample Request: EMPTY
* Sample Response: "50"(id)
* Error Response:
