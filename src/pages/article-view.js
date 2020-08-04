import React from "react";
import { useParams } from "react-router-dom"
import _ from "lodash"
import axios from "axios"
import qs from "qs"
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import { SectionDescription } from "components/misc/Typography";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter";
import { SectionHeading, Subheading } from "components/misc/Headings";

const HeadingRow = tw.div`flex`;
const Heading = tw(SectionHeading)`text-gray-900 mb-10`;
const Text = styled.div`
  ${tw`text-lg  text-gray-800`}
  p {
    ${tw`mt-2 leading-loose`}
  }
  h1 {
    ${tw`text-3xl font-bold mt-10`}
  }
  h2 {
    ${tw`text-2xl font-bold mt-8`}
  }
  h3 {
    ${tw`text-xl font-bold mt-6`}
  }
  ul {
    ${tw`list-disc list-inside`}
    li {
      ${tw`ml-2 mb-3`}
      p {
        ${tw`mt-0 inline leading-normal`}
      }
    }
  }
`;

export default () => {
  const { number, id } = useParams()
  const [article, setArticle] = React.useState()
  const [Loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    axios.get("https://thepc.herokuapp.com/api/edition/" + number, qs.stringify({})
    ).then(response => {
      setArticle(response.data.articles)
      setLoading(false)
    }).catch(error => console.log(error))
  }, [number])

  if (Loading === true) {
    return (
      <AnimationRevealPage>
        <h1>Loading...</h1>
      </AnimationRevealPage>
    )
  } else {
    return (
      <AnimationRevealPage>
        <Header />
        <Container>
          {article.map((post) => {
            if (post._id === id) {
              return (
                <ContentWithPaddingXl>
                  <Subheading> <a href={process.env.PUBLIC_URL + "/edition/" + number}>{"<-- Go Back"} </a></Subheading>
                  <br />
                  <Subheading>{_.upperCase(post.atype)}</Subheading>
                  <HeadingRow>
                    <Heading>{post.atitle}</Heading>
                  </HeadingRow>
                  <Text>
                    <SectionDescription><em>{post.authorName}</em></SectionDescription>
                    {/* <p>{post.acontent.split("\n").map(() => <br />) }</p> */}
                    <p style={{ whiteSpace: "pre-wrap" }}>{post.acontent}</p>
                  </Text>
                </ContentWithPaddingXl>
              )
            }
          })}
        </Container>
        <Footer />
      </AnimationRevealPage>
    );
  }
};
