const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const fetch = require("node-fetch");

// Some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton"
  }
];

const TMDB_API_PATH = "https://api.themoviedb.org/3";

// Construct a schema, using GraphQL schema language
const typeDefs = `
  type Query {
    movies(query: String!): [Movie]
    config: Config
    movie(id: Int!): Movie
  }

  type Movie {
		id: Int
    title: String
    poster_path: String
    overview: String
  }

	type Images {
  	poster_sizes: [String]
		base_url: String
		secure_base_url: String
	}

  type Config {
		images: Images
	}

`;

const resolvers = {
  Query: {
    movies: (root, args, context) => {
      return fetch(
        `${TMDB_API_PATH}/search/movie?api_key=${
          context.secrets.TMDB_API_KEY
        }&query=${args.query}&include_adult=false`
      )
        .then(res => res.json())
        .then(({ results }) => results);
    },
    config: (_, $, context) => {
      return fetch(
        `${TMDB_API_PATH}/configuration?api_key=${context.secrets.TMDB_API_KEY}`
      ).then(res => res.json());
    },
    movie: (root, args, context) => {
      return fetch(
        `${TMDB_API_PATH}/movie/${args.id}?api_key=${
          context.secrets.TMDB_API_KEY
        }`
      ).then(res => res.json());
    }
  }
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: {
      secrets: {
        TMDB_API_KEY: process.env.TMDB_API_KEY
      }
    }
  })
);

// GraphiQL, a visual editor for queries
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.use(express.static('public'))

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Go to http://localhost:${PORT}/graphiql to run queries!`);
});
