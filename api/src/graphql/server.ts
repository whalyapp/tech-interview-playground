import { ApolloServer, gql } from 'apollo-server';

export const runGraphqlServer = async () => {

    // A schema is a collection of type definitions (hence "typeDefs")
    // that together define the "shape" of queries that are executed against
    // your data.
    const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Article" type defines the queryable fields for every book in our data source.
  type Article {
    title: String
    author: Author
    tags: [Tag]
    body: String
  }

  type Author {
      name: String
  }

  type Tag {
      label: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "articles" query returns an array of zero or more Books (defined above).
  type Query {
    articles: [Article]
    authors: [Author]
    tags: [Tag]
  }
`;

    const articles = [
        {
            title: 'The Awakening',
            author: {
                name: 'Kate Chopin'
            },
            tags: [{ label: "tech" }, { label: "data" }],
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut tincidunt odio, rhoncus rutrum magna. Nunc tincidunt magna odio, id mollis lectus pharetra sit amet. Quisque hendrerit tristique magna, nec pretium nisl convallis non. Praesent ante nisi, dictum ut rhoncus et, ullamcorper vitae diam. Nunc quam purus, iaculis sed mattis nec, tincidunt non nisi. Vestibulum commodo laoreet velit ultricies sollicitudin. Vivamus nec faucibus ipsum. Fusce luctus ante aliquet urna aliquam ullamcorper. Aliquam vel ligula placerat, mollis leo at, auctor odio. Donec at dictum enim, nec elementum nunc. Vivamus sit amet posuere mi. Mauris auctor hendrerit ante, et aliquam nisi pretium ac."
        },
        {
            title: 'City of Glass',
            author: {
                name: 'Paul Aster'
            },
            tags: [{ label: "beer" }, { label: "entertainment" }],
            body: "Vestibulum interdum in nulla sed pretium. Etiam mollis fringilla iaculis. Etiam sit amet malesuada turpis, nec bibendum erat. Aenean convallis lobortis ullamcorper. Morbi porta velit a nisi egestas, quis tristique metus dapibus. Nulla id sodales velit. Maecenas a est ac velit vehicula aliquam. Mauris imperdiet pharetra ultrices. Aliquam bibendum metus id sodales consequat. Proin a condimentum felis."
        },
    ];

    const authors = [
        { name: 'Kate Chopin' },
        { name: 'Paul Aster' }
    ]

    const tags = [
        { label: "tech" },
        { label: "data" },
        { label: "beer" },
        { label: "entertainment" }
    ]

    // Resolvers define the technique for fetching the types defined in the
    // schema.
    const resolvers = {
        Query: {
            articles: () => articles,
            authors: () => authors,
            tags: () => tags
        },
    };

    // The ApolloServer constructor requires two parameters: your schema
    // definition and your set of resolvers.
    const server = new ApolloServer({ typeDefs, resolvers });

    // The `listen` method launches a web server.
    const serverInfo = await server.listen();
    console.log(`🚀  GraphQL Server ready at ${serverInfo.url}`);

}