# Woodpecker
#### Spring Boot & React JS based Productivity Application

Woodpecker was built as an attempt to learn Spring Boot & React JS. I've always wanted to use a web based application
that could manage tasks and notes in the same place but I could not find such an application available on the internet.
So I decided to build Woodpecker. This application is a long way from being complete, nevertheless, it is a usable product 
at its current stage.

![Landing Page](https://i.imgur.com/Sa04npN.png)
Landing Page - Woodpecker

![Notes](https://i.imgur.com/OhRttcZ.png)
Notes Page - Woodpecker

![Tasks](https://i.imgur.com/7lxKlTy.png)
Tasks Page - Woodpecker



#### Frontend

The frontend was built with React JS and the UI framework [Material UI](https://material.io/) was used to maintain UI consistency,
improve user experience and simplify the development process. This application uses other JavaScript libraries such as 
* [QuillJS](https://quilljs.com) for its rich text editor
* [React Router]() for its routing functionality
* [Formik](https://github.com/jaredpalmer/formik) for form validation
* [Moment](http://momentjs.com) for data/time parsing

and a couple more dependencies.
[Webpack](https://webpack.js.org/) was used as the build tool and [Babel](https://babeljs.io/) was used to transpile ES6 code.
Authentication is handled using JSON Tokens and user principals are stored using [RxJS](https://github.com/ReactiveX/rxjs).

#### Backend

The backend was developed using Spring Boot which majorly simplified the process of creating a fully fledged backend with 
authentication, note management and task management functionality. The frontend communicates with this using an API and every
aspect of this backend is handled using Spring Boot.


## TODO

* Improve Responsiveness
* Improve User Interface
* Implement Bookmark Management functionality
* Create a React-Native Application
