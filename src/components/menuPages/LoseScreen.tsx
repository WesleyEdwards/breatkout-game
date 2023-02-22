import { Button, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { GameButton } from "../GameButton";
import { ScreenProps } from "../Types";
import ScreenHeader from "./ScreenHeader";

export const LoseScreen: FC<ScreenProps> = ({ onBack }) => {
  return (
    <Stack width="100%" justifyContent="center" gap="2rem">
      <ScreenHeader title="You Lose" backToMenu={onBack} />
      <Typography variant="body1" textAlign="center">
        You Lose! Sorry.
      </Typography>
      <GameButton
        sx={{ alignSelf: "center" }}
        text="Main Menu"
        onClick={onBack}
      />
    </Stack>
  );
};

export default LoseScreen;
