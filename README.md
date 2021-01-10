# Spades Server

## Preface

This is a group project for a senior level San Francisco State University Computer Science course. This project was developed remotely in Spring 2020 during the COVID-19 pandemic. The team consisted of 4 students: 2 frontend developers and 2 backend developers.

Slack, Zoom, and GitHub where used to communicate.

Our team was given a few nonfunctional requirements and where then given the freedom to complete said requirements in any way we felt fit.

## Description

This is an online website hosted on **heroku**. The purpose of this website is to play the card game **Spades** with other people around the world. There are no computer AI players as this website is designed to only allow users to play against other users. The website supports a lobby that holds infinite games of up to 4 players. Each game is given a unique name from the game creator. When a fourth player joins the game, then the game will start. The logic of the game follows the official Spades rules. Each move is checked for legality. Once a player has finshed their turn the next player may play. Player position is also tracked to remove that option of cheating. Once a player has won they are announced to each player and the players can leave the game. Players who accidentally leave the game prematurely (browser crashes or page is closed) will be put back into there game on page reload.

The focus of this project was the use of websockets, promises, and building a strong OOP backend. While thought was put into the frontend, the strength of the project is in it's backend. This specification was given to us in the Given Requirements. This project was each member's first remote project and was a learning experience for each member. 

## Given Requirements 

A real time, multi player, online game, that supports an
arbitrary number of simultaneous games

#### User Authentication 

* Users must be able to
  * create accounts
  * log in
  * log out
* Pages should only allow access to those users that should be able to see them (i.e. only users in a game should be able to access a game instance)

#### Chat

* Chat must be enabled in a lobby (or application landing page, after log in), for all users
* Chat must be enabled in each game room, for those users participating in an instance of a game
  * (Optional) Observers are allowed as well, depending on your game design
  
#### Game States

* Game state must be persisted in a database
* If a user closes a tab, and reconnects to the game, the game must be able to be reloaded for that user
* Only relevant game state should be sent to each user
* Game state must be updated in real time in response to user events and interaction with the game

#### Arbitrary number of games

* Your application must support an arbitrary (infinite) number of concurrent games
* A given user should be permitted to be participating in multiple games (in different tabs)

#### Shouldn’t Look Terrible

* We’re not graphic designers, but try to do OK

## Questions
  * What programs do we need on your local computers to host the server? 
      * https://www.postgresql.org/download/
      
  * How do we run this? 
      * $ git clone https://github.com/sfsu-csc-667-fall-2018/fall-2019-term-project-zain-phillip-stan-rob.git
      * $ cd fall-2019-term-project-zain-phillip-stan-rob/spades-server/
      * make a file '.env' with --> DATABASE_URL=postgres://YOUR-USER@localhost:5432/YOUR-DB
      * $ make init_db
      * $ make init_seed
      * $ make init
      * $ make run
      
  * How do we check it is running correctly?
      * Try to visit one of these pages in your local browser :
          * http://localhost:3000/
          * http://127.0.0.1:3000/
      * you should see activity in your terminal once visited

  * How do we access Heroku?
      
      * https://spades-server.herokuapp.com

