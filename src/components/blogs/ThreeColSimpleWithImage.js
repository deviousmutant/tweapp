import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

import { SectionHeading as HeadingTitle } from "../misc/Headings.js";
import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-1.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "../../images/svg-decorator-blob-3.svg";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const ThreeColumn = tw.div`flex flex-col items-center lg:items-stretch lg:flex-row flex-wrap`;
const Column = tw.div`mt-24 lg:w-1/3`;

const HeadingInfoContainer = tw.div`flex flex-col items-center`;
const HeadingDescription = tw.p`mt-4 font-medium text-gray-600 text-center max-w-sm`;

const Card = tw.div`lg:mx-4 xl:mx-8 max-w-sm lg:max-w-xs`;
const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`bg-cover bg-center h-80 lg:h-64 rounded`
]);
const Category = tw.div`mt-4 text-secondary-100 font-bold text-sm`;
const Title = tw.h4`mt-2 leading-relaxed font-bold text-lg`;
const Link = tw.a`inline-block mt-2 text-sm text-primary-500 font-bold cursor-pointer transition duration-300 border-b-2 border-transparent hover:border-primary-500`;

const DecoratorBlob1 = tw(
  SvgDecoratorBlob1
)`-z-10 absolute bottom-0 right-0 w-48 h-48 transform translate-x-40 -translate-y-8 opacity-25`;
const DecoratorBlob2 = tw(
  SvgDecoratorBlob2
)`-z-10 absolute top-0 left-0 w-48 h-48 transform -translate-x-32 translate-y-full opacity-25`;

export default (props) => {
  const [Loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    if (props.editionObj) {
      setLoading(false)
    }
  }, [props.editionObj])

  return (
    <Container>
      <Content>
        <HeadingInfoContainer>
          <HeadingTitle>News Flash</HeadingTitle>
        </HeadingInfoContainer>
        {Loading === false &&
          <ThreeColumn>
            {props.editionObj.map((post, index) => {
              if (post.atype === "news") {
                return (
                  <Column key={index}>
                    <Card>
                      <Image imageSrc={"https://thepc.herokuapp.com/api/articles/" + post._id + "/picture"} />
                      <Title>{post.atitle}</Title>
                      <Link href={process.env.PUBLIC_URL + "/edition/" + props.enumber + "/" + post._id}>Read Article</Link>
                    </Card>
                  </Column>
                )
              }
            })}
          </ThreeColumn>
        }
      </Content>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  );
};
