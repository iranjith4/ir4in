// @flow strict
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Page from '../components/Page';
import Pagination from '../components/Pagination';
import { useSiteMetadata } from '../hooks';
import type { PageContext, AllMarkdownRemark } from '../types';

type Props = {
  data: AllMarkdownRemark,
  pageContext: PageContext
};

const IndexTemplate = ({ data, pageContext }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();

  const {
    currentPage,
    hasNextPage,
    hasPrevPage,
    prevPagePath,
    nextPagePath
  } = pageContext;


  const { edges } = data.allMarkdownRemark;
  const pageTitle = "Hello World 👋";
  const pageContent = "This is Ranjith. <br><br> Currently working as Lead iOS Developer at <a href=\"https://radiusagent.com\" target=\"_blank\"> RadiusAgent</a>. Worked with startups, mid sized companies in building cool products. Heavy lifting iOS Developer, and have experience in developing 15+ native iOS apps. Sharp detailed  designer believes in bringing beautiful products with perfect marriage of design and development. Always believes in learning new things, which always helps in making a better product. <br> <br>At free time I love to travel around the places, watches Netflix, snaps photos, tweets, travels, plays table tennis and reads medium. An Apple fanatic."

  return (
    <Layout title={"Ranjithkumar Matheswaran"} description={siteSubtitle}>
      <Sidebar isIndex />
      <Page title={pageTitle}>
      <div dangerouslySetInnerHTML={{ __html: pageContent }} />
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query IndexTemplate($postsLimit: Int!, $postsOffset: Int!) {
    allMarkdownRemark(
        limit: $postsLimit,
        skip: $postsOffset,
        filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } },
        sort: { order: DESC, fields: [frontmatter___date] }
      ){
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title
            date
            category
            description
          }
        }
      }
    }
  }
`;

export default IndexTemplate;
