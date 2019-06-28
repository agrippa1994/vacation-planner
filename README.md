# Vacation Planner [![Build Status](https://travis-ci.org/agrippa1994/vacation-planner.svg?branch=master)](https://travis-ci.org/agrippa1994/vacation-planner)

## Overview
This is a simple vacation planner based on NodeJS and the Ionic framework.

## Screenshots
![](doc/assets/map.png)
![](doc/assets/cashbox.png)
![](doc/assets/notes.png)
![](doc/assets/settings.png)

### Features
* Map
* Cashbox
* Notes


### Requirements by the professor
```
Topic-E "Vacation-App"
    Problem:
    You intend to plan a journey with friends. You need to keep all data together and you want access it from everywhere (travel partner, timetable, emails, booking information, money keeping)

    Solution:
    Your app manages the journey, track information and provide information to all participants. Handle the money (with a common holiday cash  box).

    Main-Features:
    Managing information
    Managing money in 2 currencies
    and more - define in advance
```

## Initial Setup
* Install NodeJS and NPM
* Install Ionic with ```npm```
    ```
    npm install -g ionic
    ```

## Development Guide

### Installing Dependencies
* Open a terminal and navigate to the project directory
* Execute ```npm install```. This installs the dependencies for the client and the server

### Starting the Server
* Open a terminal and navigate to the project directory
* Execute ```npm run server```

### Starting the Client
* Open a terminal and navigate to the project directory
* Execute ```npm run client```

### Executing All Tests
* Open a terminal and navigate to the project directory
* Execute ```npm test```

### Create Documentation
* Open a terminal and navigate to the ```client``` directory
* Execute ```npm run compodoc``` to generate the documentation

## Testing

### Client-Side Testing

#### Automatic UI Testing
The automatic UI tests are located in the ```client/e2e/src``` directory. Each ```.e2e-spec.ts``` file represents one UI test that consists of several test suites and test cases. The ```.po.ts``` file represents [Page Objects](https://martinfowler.com/bliki/PageObject.html). Each Page Object encapsulates all operation that can be triggered on a page. However, use these Page Objects in the tests and do not access UI elements by css or id selectors.


##### Executing Automatic UI Tests
* Open a terminal and navigate to the ```client``` directory. Execute ```npm run e2e``` in this directory.

This command downloads the Chrome Driver and runs all ```.e2e-spec.ts``` files. The test starts the browser and communicates with the browser via the Chrome Driver.

### Documentation
Documentation is available on GitHub, please check the [GitHub Page](https://agrippa1994.github.io/vacation-planner).


## Server API

### Notes
__notes object:__
```
{
    "id": 1,
    "timestamp": "2019-06-22 16:31:41",
    "username": "John Doe",
    "note": "HI"
}
```

| Method    | Url           | Action                                   |
| --------- |---------------| ---------------------------------------- |
| GET       | `/api/notes`      | Returns all notes                    |
| POST      | `/api/notes`      | Add new Note                         |
| DELETE    | `/api/notes/{id}` | Delete the note with the given id    |
| PUT       | `/api/notes/{id}` | Update the note with the given id    |

### Positions
```
{
    "username": "Kim",
    "position": {
        "timestamp": 1560872013306,
        "coords": {
            "longitude": 39.021724,
            "latitude": 125.743610
        }
    }
}
```

| Method    | Url           | Action                               |
| --------- |---------------| ------------------------------------ |
| GET       | `/api/positions`  | Returns all positions            |
| POST      | `/api/position`   | Add new positions                |

### Cashbox
__invoice object:__
```
{
    "id": 1,
    "timestamp": "2019-06-22 09:36:39",
    "title": "Invoice 1",
    "cost": 12.34,
    "currency": "EUR",
    "description": "describing describtion"
}
```

#### CRUD
| Method    | Url                | Action                                      |
| --------- |--------------------| ------------------------------------------- |
| GET       | `/api/cashbox`         | Returns all Invoices                    |
| GET       | `/api/cashbox/id/{id}` | Returns all Invoices                    |
| POST      | `/api/cashbox`         | Add new Invoice                         |
| DELETE    | `/api/cashbox/{id}`    | Delete the Invoice with the given id    |
| PUT       | `/api/cashbox/{id}`    | Update the Invoice with the given id    |
#### Sums and Exchange Rates
| Method    | Url                             | Action                                                                                         |
| --------- |---------------------------------| ---------------------------------------------------------------------------------------------- |
| GET       | `/api/cashbox/sum/{currency}`       | Returns the sum of the costs of all invoices converted to the given currency (default EUR) |
| GET       | `/api/cashbox/converted/{currency}` | Returns all Invoices with the costs converted to the given currency                        |
