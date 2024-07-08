import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import "./AboutPage.css";

{
  /* <box-icon
  color="rgba(147, 89, 222, 0.1)"
  type="solid"
  name="invader"
  size="500px"
/>; */
}

export default function AboutPage() {
  return (
    <Flex direction="column" gap="10px">
      <Heading as="h1">About</Heading>

      <Heading as="h2" size="lg" marginTop={2}>
        About Ludole
      </Heading>
      <Text>
        Welcome to Ludole, the ultimate guessing game for video game
        enthusiasts! Inspired by the popular word-guessing game Wordle, Ludole
        puts a unique twist on the classic format by challenging players to
        guess the names of video games instead of words. Whether you're a casual
        gamer or a hardcore aficionado, Ludole offers a fun and engaging way to
        test your video game knowledge and discover new titles.
      </Text>

      <Heading as="h2" size="lg" marginTop={2.5}>
        Our Team
      </Heading>
      <Text>
        We are a passionate team of gamers, developers, and designers who came
        together to create a unique and enjoyable gaming experience. Our mission
        is to bring the gaming community closer through fun puzzles.
      </Text>

      <Heading as="h3" size="md">
        Charles Kwang
      </Heading>
      <Text>
        Charles Kwang is a 27-year-old software engineer based in Los Angeles,
        California, with a background in Illustration and Computer Science.
        Combining coding and art, Charles uses his unique background to software
        development.
      </Text>
      <Heading as="h3" size="md">
        Gwyneth Patrick
      </Heading>
      <Text>
        My name is Gwyneth Patrick, I'm a front-end developer and IOT hobbyist
        with most of my experience lying in JavaScript and Python with an
        increasing knowledge in webapp frameworks like Node.js and React! I have
        a background as an artist, graduating with a bachelors in fine arts with
        an illustration focus. As a result I naturally gravitated towards front
        end projects and creating fresh but intuitive user experiences in
        software. I also have a love of oddball low-power, purpose-built
        electronics and an obsession with optimization. Currently I stick to
        interfacing with pre-built libraries with devices like raspberry pis,
        but I hope to continue building on my existing knowledge by moving into
        lower level understanding as I put more projects under my belt!
      </Text>
      <Heading as="h3" size="md">
        Lydia Sims
      </Heading>
      <Text>
        Lydia Sims is a software developer based in Houston,Texas. She has a
        background in NonProfit Management, Advocacy and Economic Equity. She
        has keen eye for data management that reflects in her work.
      </Text>
      <Heading as="h3" size="md">
        Brandon Doza
      </Heading>
      <Text>
        Brandon is a software developer based in Denver, Colorado. He has a
        background in finance and photography, which bring a keen eye and
        attention to detail that shows in his work.
      </Text>

      <Text marginTop={10}>
        Thank you for checking out Ludole. Let the guessing begin!
      </Text>
    </Flex>
  );
}
