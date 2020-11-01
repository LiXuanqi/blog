import React from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostList from "../components/PostList"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  const getAvaiableTags = () => {
    let tags = new Set()
    for (let post of posts) {
      if (post.node.frontmatter.tags) {
        for (let tag of post.node.frontmatter.tags) {
          tags.add(tag)
        }
    
      }
    }
    return [...tags]
  }

  const allTags = getAvaiableTags()

  console.log(allTags)

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <aside>
        <Bio />
      </aside>
      <main>
        {/* <div>
          {allTags.map((tag) => {
            return (
            <span key={tag} className='mr-2 p-1 border border-solid rounded-full text-xs'>{tag}</span>
            )
          })}
        </div> */}
        <PostList posts={posts}/>
      </main>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query($langKey: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { 
        frontmatter: {visible: {ne: false}}
        fields: { langKey: { eq: $langKey } } 
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`
