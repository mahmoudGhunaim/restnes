const path = require('path');
const { graphql } = require('gatsby'); // This is not typically required, as `graphql` is provided as an argument to the functions

// Assuming you have a custom utility function for slugs or additional data processing
// For example, a function that might ensure slugs are URL-friendly or apply some custom logic
const { createSlug } = require('./src/slugify');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allContentfulPost {
        edges {
          node {
            slugData
          }
        }
      }
    }
  `);

  if (result.errors) {
    console.error(result.errors);
    throw new Error('Failed to query Contentful data', result.errors);
  }

  const blogPostTemplate = path.resolve('./src/templates/BlogPost.js');
  result.data.allContentfulPost.edges.forEach(({ node }) => {
    // Using a hypothetical `createSlug` utility function to process or validate slugs
    const slug = createSlug(node.slugData);

    createPage({
      path: `/Blogpost/${slug}`,
      component: blogPostTemplate,
      context: {
        slug: slug,
      },
    });
  });
};

// More functions or exports can be added here as needed
