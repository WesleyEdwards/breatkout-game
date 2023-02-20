import { Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { ScreenProps } from "./BreakoutMenu";
import ScreenHeader from "./ScreenHeader";

export const Help: FC<ScreenProps> = ({ onBack }) => {
  return (
    <Stack>
      <ScreenHeader title="Help" backToMenu={onBack} />
      <Typography variant="body1" textAlign="center">
        Use the left and right arrow keys to move the paddle.
      </Typography>
    </Stack>
  );
};

export default Help;
