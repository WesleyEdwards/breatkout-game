import { Typography } from "@mui/material";
import React, { FC } from "react";

export const BreakoutHeader: FC = () => {
  return (
    <Typography
      id="header-title"
      variant="h1"
      textAlign="center"
      width="100%"
      paddingY="2rem"
      color="primary"
    >
      Breakout!
    </Typography>
  );
};

export default BreakoutHeader;
