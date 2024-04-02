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
  const pageContent = "Currently working as the Tech Lead (Mobile) at <a href=\"https://radiusagent.com\" target=\"_blank\">RadiusAgent</a>. <br><br>With a background spanning startups and mid-sized companies, I excel in crafting innovative products. As a seasoned iOS Developer, I have contributed to over 15 native iOS applications, showcasing my expertise in the field. With a keen eye for detail, I'm passionate about harmonizing design and development to deliver visually stunning products. Committed to continuous learning, I embrace new challenges to enhance product quality.<br><br>During my leisure, I enjoy exploring new destinations, photography, tweeting, and traveling. Unabashedly devoted to all things Apple."

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
