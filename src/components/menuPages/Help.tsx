import { Divider, List, ListItem, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { ScreenProps } from "../Types";
import ScreenHeader from "./ScreenHeader";

export const Help: FC<ScreenProps> = ({ onBack }) => {
  const scoreValues = [
    "- 1 point for each yellow brick broken",
    "- 2 points for each orange brick broken",
    "- 3 points for each blue brick broken",
    "- 5 points for each green brick broken",
    "- 25 points for clearing an entire row",
  ];
  return (
    <Stack>
      <ScreenHeader title="Help" backToMenu={() => onBack("menu")} />
      <Typography variant="h6">Instructions</Typography>
      <Divider sx={{ my: 1 }} />
      <Typography variant="body1" padding={2}>
        Use the left and right arrow keys to move the paddle. Keep the ball in
        play by bouncing it off the paddle. If you break all the bricks, you
        win!
      </Typography>

      <Typography variant="h6">Tips</Typography>
      <Divider sx={{ my: 1 }} />
      <Typography variant="body1" padding={2}>
        If you get to 100 points, you get a new ball. But be careful- the more
        bricks you break, the faster the ball goes. And once you break a brick
        on the top level, the paddle will shrink. Good luck.
      </Typography>

      <Typography variant="h6">Scoring</Typography>
      <Divider sx={{ my: 1 }} />
      <Stack alignItems="center">
        <div>
          {scoreValues.map((scoreValue) => (
            <Typography key={scoreValue} variant="body1">
              {scoreValue}
            </Typography>
          ))}
        </div>
      </Stack>
    </Stack>
  );
};

export default Help;
