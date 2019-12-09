const path = require('path');
const _ = require('lodash');

const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' });

    createNodeField({
      node,
      name: 'slug',
      value: slug
    });
  };
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const blogPostTemplate = path.resolve('src/templates/post.js');
  const tagTemplate = path.resolve('src/templates/tags.js');

  const result = await graphql(`
    {
      postRemark: allMarkdownRemark(
        limit: 2000,
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tags
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  };

  const posts = result.data.postRemark.edges;

  posts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: node.fields.slug
      }
    });
  });

  const tags = result.data.tagsGroup.group;

  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue
      }
    });
  });
};
