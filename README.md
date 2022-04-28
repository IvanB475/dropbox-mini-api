## Installation

$ npm install

## Running the app

In app.module.ts change DB connection info to DB of your choice (as listed below, sadly this solution does not include env variables)

# development

$ npm run start

# watch mode

$ npm run start:dev

# production mode

$ npm run start:prod

# What should be fixed in this solution?  
Not use nestjs -> plain express as a slower nodejs framework is still about 2x faster than nest (while for example fastify is several times faster than express)  
IDs should be replaced with UUID  
User input has to be sanitized  
error handling should be improved  
cors & rate limiting should be added   
x-powered-by header should be removed   
Sync: true should not be used in prod -> replace with migrations  
The complexity of current search scales poorly, and hence is a terrible choice for large-scale systems  
a lot of cases are not covered that have to be covered  
for search I use get requests while large services like dropbox and google drive use post ( still have to do my research on why is that)   
env variables   
this solution does not create DB
