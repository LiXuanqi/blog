export const typeDefs = `#graphql
  # Scalars
  scalar Date

  # Post type for blogs and notes
  type Post {
    slug: String!
    title: String!
    date: Date!
    content: String!
    language: String!
    translations: [String!]
    tags: [String!]
    description: String
    visible: Boolean
    source: String
    repo: String
    path: String
  }

  # Link type for curated resources
  type Link {
    slug: String!
    title: String!
    date: Date!
    content: String!
    image: String
    url: String
    category: String
    description: String
    visible: Boolean
  }

  # Post grouped by year for blog listing
  type PostsByYear {
    year: String!
    posts: [Post!]!
  }

  # Posts grouped by language
  type PostsByLanguage {
    language: String!
    posts: [Post!]!
  }

  # Query root type
  type Query {
    # Get all posts (blogs and notes)
    allPosts(language: String): [Post!]!
    
    # Get all blog posts
    allBlogs(language: String): [Post!]!
    
    # Get all notes
    allNotes(language: String): [Post!]!
    
    # Get blog posts grouped by year
    blogsByYear(language: String): [PostsByYear!]!
    
    # Get posts grouped by language
    postsByLanguage: [PostsByLanguage!]!
    
    # Get specific post by slug and language
    post(slug: String!, language: String = "en"): Post
    
    # Get specific note by slug and language
    note(slug: String!, language: String = "en"): Post
    
    # Get all links
    allLinks: [Link!]!
    
    # Get specific link by slug
    link(slug: String!): Link
    
    # Get available languages for a post
    availableLanguages(slug: String!): [String!]!
  }
`;
