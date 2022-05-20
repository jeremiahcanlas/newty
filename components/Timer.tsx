import {
  Button,
  Box,
  Container,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

const Timer = () => {
  const { colorMode } = useColorMode();
  const [audio, setAudio]: any = useState(null);
  const [minutes, setMins] = useState(0);
  const [seconds, setSecs] = useState(10);
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState("focus");
  const [paused, setPaused] = useState(false);
  const [int, setInt] = useState("");

  //nextjs way of mounting mp3 files without getting audio not defined err
  useEffect(() => {
    setAudio(
      new Audio(
        "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-55112/zapsplat_bells_small_bell_ring_long_58345.mp3"
      )
    );
  }, []);

  let interval: any;

  const playAlarm = () => {
    audio.play();
  };

  const countDown = () => {
    const start = Date.now();
    setActive(true);
    setPaused(false);
    audio.pause();

    const counter = () => {
      // the math
      let diff = minutes * 60 + seconds - (((Date.now() - start) / 1000) | 0);
      setMins((diff / 60) | 0);
      setSecs(diff % 60 | 0);

      //when the timer ends then it clears the interval
      if (diff <= 0 && status === "focus") {
        clearInterval(interval);
        setStatus("rest");
        setActive(false);
        setMins(0);
        setSecs(6);
        playAlarm();
      }

      if (diff <= 0 && status === "rest") {
        clearInterval(interval);
        setStatus("focus");
        setActive(false);
        setMins(0);
        setSecs(10);
        playAlarm();
      }

      if (diff <= 0) {
        clearInterval(interval);
      }
    };

    interval = setInterval(counter, 1000);
    setInt(interval);
  };

  //adds increment of 5 to the time ( no higher than an hour)
  const addTime = () => {
    setMins(minutes + 5);

    if (minutes >= 60) {
      setMins(60);
    }
  };

  // subtracts icrement of 5 to the time ( no lower than 5 mins)
  const subtractTime = () => {
    setMins(minutes - 5);

    if (minutes <= 25) {
      setMins(25);
    }
  };

  // pauses time
  const pauseTime = () => {
    setPaused(true);
    clearInterval(int as any);
    setActive(false);
    setMins(minutes | 0);
    setSecs(seconds | 0);
  };

  return (
    <Container
      display="flex"
      flexDirection={"column"}
      justifyContent={"center"}
      border="solid 1px"
      borderColor={colorMode === "light" ? "blackAlpha.300" : "whiteAlpha.300"}
      borderRadius="3px"
      p="2em"
    >
      <Box my="auto">
        <Text
          bgGradient={
            colorMode === "light"
              ? "linear(to-r,#08203e,#557c93)"
              : "linear(to-l, #f7c2e6,#f7c2e6)"
          }
          bgClip="text"
          fontSize="6em"
          fontWeight="700"
        >
          {`${!minutes ? "00" : minutes < 10 ? "0" + minutes : minutes}:${
            !seconds ? "00" : seconds < 10 ? "0" + seconds : seconds
          }`}
        </Text>
      </Box>

      <Box mt="1em">
        {!active ? (
          <>
            <Button
              height="60px"
              width="50%"
              onClick={countDown}
              variant="outline"
              letterSpacing="1px"
              fontWeight={300}
              _focus={{ outline: "none" }} // this removes chakra ui weird focus border
            >
              {status === "focus"
                ? "focus"
                : paused
                ? "resume"
                : "take a break"}
            </Button>
            {!paused && (
              <Stack
                visibility={status === "rest" ? "hidden" : "visible"}
                direction="row"
                spacing="1em"
                mt="1em"
              >
                <Button
                  onClick={subtractTime}
                  _focus={{ outline: "none" }} // this removes chakra ui weird focus border
                  variant="outline"
                >
                  -
                </Button>
                <Button
                  onClick={addTime}
                  _focus={{ outline: "none" }} // this removes chakra ui weird focus border
                  variant="outline"
                >
                  +
                </Button>
              </Stack>
            )}
          </>
        ) : (
          status !== "rest" && (
            <Button
              height="60px"
              width="50%"
              letterSpacing="1px"
              fontWeight={300}
              onClick={pauseTime}
              variant="outline"
              _focus={{ outline: "none" }} // this removes chakra ui weird focus border
            >
              pause
            </Button>
          )
        )}
      </Box>
    </Container>
  );
};

export default Timer;
