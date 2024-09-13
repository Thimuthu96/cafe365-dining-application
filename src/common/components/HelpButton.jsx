import { SpeedDial, Tooltip, Typography } from "@mui/material";
import { HiHandRaised } from "react-icons/hi2";

export const HelpButton = ({ handleFunction }) => {
  return (
    <>
      <Tooltip title="Request help">
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{
            position: "fixed",
            bottom: 90,
            right: 16,
            zIndex: 0,
          }}
          FabProps={{
            sx: {
              bgcolor: "#FF455A",
            },
          }}
          onClick={handleFunction}
          icon={
            <HiHandRaised style={{ fontSize: "20px", position: "fixed" }} />
          }
        ></SpeedDial>
      </Tooltip>
    </>
  );
};
