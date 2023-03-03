import { Divider, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { ScreenProps } from "../Types";
import ScreenHeader from "./ScreenHeader";

export const About: FC<ScreenProps> = ({ onBack }) => {
  return (
    <Stack>
      <ScreenHeader title="About" backToMenu={() => onBack("menu")} />
      <Typography variant="body1" textAlign="center" marginBottom={2}>
        Created by: Wesley Edwards
      </Typography>
      {/* <Divider sx={{ m: 2 }} /> */}
      <Typography variant="body1" textAlign="center">
        This game is dedicated to Richard Trevithick. What a legend
      </Typography>
      <Divider sx={{ m: 2 }} />
      <Typography variant="body1" textAlign="center">
        Music: "Swing Train & Train Country Blues Rock"
        (https://pixabay.com/cs/music/search/train)
      </Typography>
    </Stack>
  );
};

export default About;
