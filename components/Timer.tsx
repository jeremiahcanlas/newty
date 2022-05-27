import { Button, Box, Container, useColorMode, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTime,
  moreTime,
  lessTime,
  pauseTime as stopTime,
  toggleStatus,
} from "../redux/reducers/time";

const Timer = () => {
  const { minutes, seconds, status, active } = useSelector(
    (state: any) => state.timeReducer
  );
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();

  const [audio, setAudio]: any = useState(null);
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

  const playAlarm = async () => {
    await audio.play();
  };

  const countDown = () => {
    const start = Date.now();
    audio.pause();

    const counter = () => {
      // the math
      let diff = minutes * 60 + seconds - (((Date.now() - start) / 1000) | 0);

      dispatch(
        setTime({
          minutes: (diff / 60) | 0,
          seconds: diff % 60 | 0,
          active: true,
        })
      );

      //when the timer ends then it clears the interval
      if (diff <= 0) {
        dispatch(toggleStatus());
        clearInterval(interval);
        playAlarm();
      }
    };

    interval = setInterval(counter, 1000);
    setInt(interval);
  };

  // adds increment of 5 to the time ( no higher than an hour)
  const addTime = () => {
    dispatch(moreTime());
  };

  // subtracts icrement of 5 to the time ( no lower than 5 mins)
  const subtractTime = () => {
    dispatch(lessTime());
  };

  // pauses time
  const pauseTime = () => {
    dispatch(stopTime());
    clearInterval(int as any);
  };

  const min = !minutes ? "00" : minutes < 10 ? "0" + minutes : minutes;
  const sec = !seconds ? "00" : seconds < 10 ? "0" + seconds : seconds;

  return (
    <Box
      width="100%"
      border="solid 2px"
      borderRadius="4px"
      borderColor={status === "rest" && !active ? "red.300" : "transparent"}
    >
      <Container
        border="solid 1px"
        borderColor={
          colorMode === "light" ? "blackAlpha.300" : "whiteAlpha.300"
        }
        borderRadius="3px"
        p="2em"
      >
        <Box
          textAlign={"center"}
          bgGradient={
            colorMode === "light"
              ? "linear(to-r,#08203e,#557c93)"
              : "linear(to-l, #f7c2e6,#f7c2e6)"
          }
          bgClip="text"
          fontSize="5rem"
          letterSpacing="2px"
          fontWeight="800"
        >
          {min}:{sec}
        </Box>

        <Box mt="1em" textAlign="center">
          {!active ? (
            <>
              <Button
                height="60px"
                width="50%"
                onClick={countDown}
                variant="outline"
                letterSpacing="1px"
                fontWeight={300}
                borderRadius="2px"
                _focus={{ outline: "none" }}
              >
                {status === "paused"
                  ? "resume"
                  : status === "rest"
                  ? "take a break"
                  : "focus"}
              </Button>
              {/*  */}
              {status !== "paused" && (
                <Flex
                  visibility={status === "rest" ? "hidden" : "visible"}
                  direction="row"
                  mt="1em"
                >
                  <Box width="50%" display="flex" justifyContent="end">
                    {minutes > 5 && (
                      <Button
                        borderRadius="2px"
                        mr="1em"
                        onClick={subtractTime}
                        _focus={{ outline: "none" }}
                        variant="outline"
                        fontWeight={300}
                      >
                        -
                      </Button>
                    )}
                  </Box>
                  <Box width="50%" display="flex" justifyContent="start">
                    {minutes < 60 && (
                      <Button
                        borderRadius="2px"
                        ml="1em"
                        onClick={addTime}
                        _focus={{ outline: "none" }}
                        variant="outline"
                        fontWeight={300}
                      >
                        +
                      </Button>
                    )}
                  </Box>
                </Flex>
              )}
            </>
          ) : (
            <Button
              borderRadius="2px"
              height="60px"
              width="50%"
              letterSpacing="1px"
              fontWeight={300}
              onClick={pauseTime}
              variant="outline"
              _focus={{ outline: "none" }}
            >
              pause
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Timer;
