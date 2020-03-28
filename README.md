# Spades Server

## Questions
  * What programs do we need on your local computers to host the server? 
      * https://www.postgresql.org/download/
      
  * How do we run this? 
      * $ git clone https://github.com/sfsu-csc-667-fall-2018/fall-2019-term-project-zain-phillip-stan-rob.git
      * $ cd fall-2019-term-project-zain-phillip-stan-rob/spades-server/
      * $ echo DATABASE_URL=postgres://`whoami`@localhost:5432/DATABASE_NAME >> .env
      * $ npm install
      * $ npm run start:dev
      
  * How do we check it is running correctly?
      * Try to visit one of these pages in your local browser :
          * http://localhost:3000/
          * http://127.0.0.1:3000/
      * you should see activity in your terminal once visited

  * How do we access Heroku?
      *

  * Working on Mac and Windows?
      *

## Issues
  * Move views from jade to pug
