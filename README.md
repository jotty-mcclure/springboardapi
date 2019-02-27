# SpringboardAPI

SpringboardAPI is a simple boilerplate to help you hit the ground running, or walking if thats more your speed. Skip the painful and monatenous task of creating an API with basic RESTful features and get moving on the stuff that really maters to you.

Let's face it... you don't want to be tied down or boxed in by a framework that does "most" of what you want. You don't want to get 99% of the way through a feature and realize you are being prohibited by the very tool that has helped you get so far already! That is exactly the reason this project exists. It uses well known, well supported libraries, but gives you a solid launchpad to start from.

### Features
* Ready to go, out of the box user authentication.
* Configurations/settings galore
* Simple routing configuration
* Clean, organized structure
* Modern and secure architecture
* Built with familiar packages
* CLI tools for creating new routes
* Logging. Lots of logging...
* Designed for extensibility and scaling

### Technologies
* MongoDB
* NodeJS
* ExpressJS
* Bcrypt
* Mongoose
* Winston

# Documentation
### Installation
Clone this repo.
`git clone [RepoUL] && cd SpringboardAPI`
`npm install` or `yarn`, if you're really cool.

### Configuration
All configs are stored in `lib/config/[env]`.

### Generating APIs
This framework has a built in API generator that offers all of the basic CRUD features.

Use the command `node lib/generate [api name]` to create a new API. Be sure to use a singular name in the command. The API routes will use the plural version in the URL.

### Test
To unit test the API, run `npm test`. 