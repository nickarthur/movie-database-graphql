# The Movie Database GraphQL wrapper

This is a super simple wrapper of the REST API for [The Movie Database](https://www.themoviedb.org/) to convert it to GraphQL.

Check out the [live API hosted on Heroku](https://react-async-graphql.herokuapp.com/graphiql).

## Running the app

You'll need two API keys:

1. [themoviedb.org API key](https://www.themoviedb.org/documentation/api)
2. [Apollo Engine API key](https://engine.apollographql.com/)

Run the app with:

```sh
npm install
TMDB_API_KEY=<key 1> ENGINE_API_KEY=<key 2> npm start
```

## Docs

To learn about what's going on, check out the docs for the tools and libraries used:

1. [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
2. [Apollo Engine](https://www.apollographql.com/docs/engine/)
