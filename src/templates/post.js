import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';

export default  ({ data }) => {
  const post = data.markdownRemark;

  return (
    <Layout>
      <h1>{post.frontmatter.title}</h1>
      <h2>{post.frontmatter.date}</h2>
      <div
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <ul>
        {post.frontmatter.tags.map(tag => (
            <li key={`/tags/${tag}/`}>
              <Link to={`/tags/${tag}/`}>{tag}</Link>
            </li>
        ))}
      </ul>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
        tags
      }
    }
  }
`;
