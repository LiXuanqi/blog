import React, { useEffect } from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

import { createLanguageLink } from "../i18s"
import { MDXRenderer } from "gatsby-plugin-mdx"

import "katex/dist/katex.min.css"


function Comment({ commentBox }) {
  return <div ref={commentBox} className="comments" />
}


function Panel({ children, style = {} }) {
  return (
    <p
      style={{
        fontSize: '0.9em',
        border: '1px solid hsla(0, 0%, 100%, 0.2)',
        borderRadius: '0.75em',
        padding: '0.75em',
        background: 'rgba(115, 124, 153, 0.2)',
        wordBreak: 'keep-all',
        ...style,
      }}
    >
      {children}
    </p>
  );
}

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.mdx
  console.log(post)
  const siteTitle = data.site.siteMetadata.title
  const { previous, next, translations } = pageContext
  const { langKey, directoryName } = post.fields
  const slug = post.slug

  // Comment Box
  const commentBox = React.createRef()

  useEffect(() => {
    const scriptEl = document.createElement('script')
    scriptEl.async = true
    scriptEl.src = 'https://utteranc.es/client.js'
    scriptEl.setAttribute('repo', 'LiXuanqi/blog')
    // Use directoryName as post identifier, so different language version will use same github issue as comment source.
    scriptEl.setAttribute('issue-term', directoryName)
    scriptEl.setAttribute('label', 'blog-comment')
    scriptEl.setAttribute('id', 'utterances')
    scriptEl.setAttribute('theme', 'github-dark')
    scriptEl.setAttribute('crossorigin', 'anonymous')
    if (commentBox && commentBox.current) {
      commentBox.current.appendChild(scriptEl)
    } else {
      console.log(`Error adding utterances comments on: ${commentBox}`)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const languageLink = createLanguageLink(slug, langKey);

  const hasChineseVersion = translations.find((langKey) => langKey === 'zh-hans')

  const renderTranslationPanel = (langKey) => {
    return (

      <div>
        <Panel>
          <span>This article is also available in: </span>
          {
            langKey === 'en' ? (
              <Link to={languageLink('zh-hans')}>简体中文</Link>
            ) : (
                <Link to={languageLink('en')}>English</Link>
              )
          }
        </Panel>
      </div>
    )

  }


  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <h1
            style={{
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              display: `block`,
            }}
          >
            {post.frontmatter.date}
          </p>

          {hasChineseVersion && renderTranslationPanel(langKey)}

        </header>
        {/* <section dangerouslySetInnerHTML={{ __html: post.html }} /> */}
        <MDXRenderer>{post.body}</MDXRenderer>
        <hr/>
        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
        <footer>
          <Bio />
        </footer>
        {/* COMMENT BOX */}
        <section id="comments">
          <h2>Comments</h2>
          <Comment commentBox={commentBox} />
        </section>
      </article>

    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(  slug: { eq: $slug } ) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
      slug
      fields {
        langKey
        directoryName
      }
    }
  }
`
