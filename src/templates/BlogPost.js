import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

export const query = graphql`
  query($slug: String!) {
    contentfulPost(slugData: { eq: $slug }) {
      title
      id 
      image {
        url
      }
      
    }
  }
`;

const BlogPost = ({ data }) => {
  console.log("Data:", data);
  // Check if data.contentfulPost exists before accessing its properties
  if (!data.contentfulPost) {
    return <Layout>No post found</Layout>;
  }
  const post = data.contentfulPost;
  const image = getImage(post.image);
  console.log("title",post.title);
  return (
    <Layout>
      <article className="blog-post" key={post.title}>
        {image && (
          <div className="post-image-container" style={{ backgroundImage: `url(${data.contentfulPost.image.url})` }}>
            <div className="post-date-and-title">
              
            </div>
          </div>
        )}

        <div className="post-content-text">
           <h1>{data.contentfulPost.title}</h1>
           <img src={data.contentfulPost.image.url} />
           
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;

