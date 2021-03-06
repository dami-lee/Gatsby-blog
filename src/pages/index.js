import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";

export default ({ data }) => {
  return (
    <Layout>
      <div>
        Total <strong>{data.allMarkdownRemark.totalCount}</strong>
      </div>

      <ul className="postList">
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <li key={node.id}>
            <Link to={node.fields.slug}>
              <h3>{node.frontmatter.title}</h3>
              <p class="date">{node.frontmatter.date}</p>
              <p>{node.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;
