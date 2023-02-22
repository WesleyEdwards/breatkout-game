import { Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { ScreenProps } from "../Types";import ScreenHeader from "./ScreenHeader";

export const HighScores: FC<ScreenProps> = ({ onBack }) => {
  return (
    <Stack>
      <ScreenHeader title="High Scores" backToMenu={onBack} />
      <Typography variant="body1" textAlign="center">
        No high scores yet!
      </Typography>
    </Stack>
  );
};

export default HighScores;
