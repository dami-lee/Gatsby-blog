import React, { useEffect } from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';

export default ({ data }) => {
  const post = data.markdownRemark;

  useEffect(() => {
    const script = document.createElement('script');
    const anchor = document.getElementById('inject-comments-for-uterances');

    script.setAttribute('src', 'https://utteranc.es/client.js');
    script.setAttribute('repo', 'dami-lee/blog-comments');
    script.setAttribute('issue-term', 'url');
    script.setAttribute('theme', 'github-light');
    script.setAttribute('crossorigin', 'anonymous');
    script.setAttribute('async', true);

    anchor.appendChild(script);
  });

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

      <div id="inject-comments-for-uterances"></div>
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
