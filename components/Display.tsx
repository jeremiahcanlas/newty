import { Box, Container, Icon, Stack, Text, Link } from "@chakra-ui/react";
import { GiCat } from "react-icons/gi";
import Timer from "./Timer";
import Toggle from "./Toggle";

const Display = () => {
  return (
    <Container>
      <Box lineHeight="1.2">
        <Stack direction="row" justifyContent={"space-between"}>
          <Box>
            <Text fontSize="1.8em" letterSpacing="1.4px" fontWeight={200}>
              newty
            </Text>
            <Stack direction="row" spacing="1px">
              <Text fontWeight={300} fontSize="0.7em">
                focus vibes only.
              </Text>
              <Icon as={GiCat} margin="0" />
            </Stack>
          </Box>
          <Toggle />
        </Stack>
      </Box>
      <Container centerContent mt="5em" mx="0" height="100vh">
        <Timer />
      </Container>
      <Container mt="auto" py="1.5em" centerContent textAlign="center">
        <Text
          fontWeight={200}
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="1em"
          letterSpacing="1px"
        >
          {new Date().getFullYear()} newty
        </Text>
        <Link href="https://jeremiahcanlas.com" target="_blank">
          <Text
            fontWeight={500}
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontSize="0.7em"
            letterSpacing="1px"
          >
            coded by jeremiah
          </Text>
        </Link>
      </Container>
    </Container>
  );
};

export default Display;
