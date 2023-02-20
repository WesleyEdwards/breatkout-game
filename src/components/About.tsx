import { Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { ScreenProps } from "./BreakoutMenu";
import ScreenHeader from "./ScreenHeader";

export const About: FC<ScreenProps> = ({ onBack }) => {
  return (
    <Stack>
      <ScreenHeader title="About" backToMenu={onBack} />
      <Typography variant="body1" textAlign="center">
        This game was created by Wesley Edwards
      </Typography>
    </Stack>
  );
};

export default About;
