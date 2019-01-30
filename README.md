# Facetracking with BRFv4 and P5.js

### Getting Started

##### Open a terminal!

Fire up a Terminal window. If you're on a Mac, you can search for it by hitting CMD-Space and typing in "Terminal".

##### Install git

You probably already have git installed. You can check by running:

```
git --version
```

If you don't have git installed, it will prompt you to install it. You can also install it with a [binary package that you can download here](http://git-scm.com/download/mac).

##### Install node/npm

You can check and see if you have node and npm installed by running:

```
node --version
npm --version
```

If node is not installed, you can [get it from the node website](https://nodejs.org/en/download/). And npm comes with it.

##### Clone/Download FacetrackingP5 project

Navigate to the folder where you want to store your project, and run:

```
git clone https://github.com/spelman7/FacetrackingP5.git
```

Then, move into the folder you just downloaded:

```
cd FacetrackingP5
```

##### Create Heroku account

Sorry for making you create another account, but I personally find Heroku awesome. You can [sign up for free at the Heroku website](https://www.heroku.com/).

##### Install Heroku CLI and log in

You'll need the Heroku command line tools, which [you can install from here](https://cli-assets.heroku.com/heroku.pkg) (automatic download warning).

Or, if you have Homebrew installed, you can just run:

```
brew install heroku/brew/heroku
```

Then, log in to Heroku:

```
heroku login
```

You might be asked to press a key and then redirected to the Heroku website.

##### Install npm packages

Make sure you're inside the FacetrackingP5 folder.

Then install all the dependencies for our app with:

```
npm install
```

##### Run app locally

You should be all ready to go!

To see the app in action, just enter:

```
heroku local web
```

And then in a web browser, go to http://localhost:5000

### Resources

##### BRFv4 Face Vertex Map

![BRFv4 Map](public/images/brfv4-vertices.jpg)

##### P5 Examples

[Here's a link to the p5 Examples page](https://p5js.org/examples/)

[Here's a link to the p5 web editor](https://editor.p5js.org/). This is really good for experimenting and trying out some of their examples.
