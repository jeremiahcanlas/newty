import { useColorMode, Button, Icon, Box } from "@chakra-ui/react";
import { CgMoon, CgSun } from "react-icons/cg";
import { BsLightbulb, BsLightbulbOff } from "react-icons/bs";

const Toggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      p="0.8em"
      // zIndex={100}
      // bgGradient={
      //   colorMode === "light"
      //     ? "linear-gradient(to-t,rgba(255,255,255,0),rgba(255,255,255,1) 40%)"
      //     : "linear-gradient(to-t,rgba(17,20,28,0),rgba(17,20,28,1) 40%)"
      // }
    >
      <Box textAlign={"right"}>
        <Button
          variant={"ghost"}
          size={"md"}
          onClick={toggleColorMode}
          _focus={{ outline: "none" }} // this removes chakra ui weird focus border
        >
          <Icon
            fontSize={["1.2em", "2em"]}
            as={colorMode === "light" ? BsLightbulbOff : BsLightbulb}
          />
        </Button>
      </Box>
    </Box>
  );
};

export default Toggle;
