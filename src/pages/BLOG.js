import React from 'react';
import { graphql,Link } from 'gatsby';
import Layout from '../components/layout';
import "../components/style/BLOG.css"
import Seo from '../components/seo';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { StaticImage } from "gatsby-plugin-image"
import BlogPostTemplate from './BlogPost';

export const query = graphql`
  query  {
    allContentfulPost {
      edges {
        node {
          title 
          id
          
          image {
            
            url
          }
          slugData

        }
      }
    }
  }
`;

const BlogList = ({ data }) => {



    return (
        <Layout>
                        <section className='hero-sec-Management'>
                        <div className='hero-container-Management'>
                            <div className='hero-content-Management'>
                                <h1>Our Blog</h1>
                                <p>Embark on an unforgettable journey through British Columbia with our insider recommendations on dining, events, and activities in Kelowna, Whistler, and Vancouver, plus exclusive travel tips for a luxury-filled escape.</p>
                                <Link to='/Management' ><button>Unveil Stress-Free Rental Management</button></Link>
                            </div>
                        </div>
                    </section>
                    <section className='blog-des-sec'>
                        <div className='blog-des-container'>
                            <div className='blog-des-content'>
                                <span>property owner faq</span>
                                <h1>Explore the Best of British Columbia.</h1>
                                <div className='gold-line'></div>
                                <p>From the vineyard-dotted landscapes of Kelowna to the snow-capped peaks of Whistler and the urban sophistication of Vancouver, British Columbia is a tapestry of vibrant cities and raw natural beauty. Whether you're indulging in a lakeside retreat, a mountain adventure, or a city exploration,
                                  you've landed on the perfect resource. Dive in for the freshest insights on maximizing your British Columbia escapades.</p>
                            </div>
                        </div>
                    </section>
                    <div className="blog-list-area">
    <div className="blog-list-body">
        <div className="blog-posts-list">
            {data.allContentfulPost.edges.map(({ node }, index) => {
                const image = getImage(node.image); // Assuming `getImage` is a function you've defined elsewhere
                console.log("Node slug:", node.slugData);
                if (index === 0) {
                    // Display the first post differently
                    return (
                        <div key={node.slug} className="other-posts-container">
                            <article>
                                <div className="blog-post-info" style={{ background: `url(${node.image.url})` }}>
                                    <h2>{node.title}</h2>
                                    <Link to={`/Blogpost/${node.slugData}`} className="blog-post-link">
                                        <button>Read More</button>
                                    </Link>

                                </div>
                            </article>
                        </div>
                    );
                }
            })}
            <div className='other-posts-sec'>
                {data.allContentfulPost.edges.map(({ node }, index) => {
                    const image = getImage(node.image); // Assuming `getImage` is a function you've defined elsewhere

                    if (index > 0) {
                        // Display other posts
                        return (
                            <div key={node.slugData} className="other-posts-container">
                                <article>
                                    <div className="blog-post-info-loop" >
                                        <img src={node.image.url} alt={node.title}/>
                                        <div className='blog-post-info-loop-content'>
                                            <h2>{node.title}</h2>
                                            <Link to={`/Blogpost/${node.slugData}`} className="blog-post-link">
                                                <button>Read More</button>
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    </div>
</div>


        </Layout>
    );
};

export default BlogList;