import { Button, Stack } from "@mui/material";
import { FC } from "react";

export const ButtonList: FC<{ onClick: (idx: number) => void }> = ({
  onClick,
}) => {
  return (
    <Stack spacing={2}>
      <Button key={1} variant="contained" onClick={() => onClick(0)}>
        Button 1
      </Button>

      <Button key={2} variant="contained" onClick={() => onClick(1)}>
        button2
      </Button>
    </Stack>
  );
};
