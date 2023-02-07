/** @format */

import { styled, ToggleButton } from "@mui/material";

const StyledToggleButton = styled(ToggleButton)({
	height: "2.5rem",
	fontWeight: "bold",
	"&.Mui-selected": {
		backgroundColor: "var(--purple)",
		color: "var(--base)",
	},
	"&.Mui-selected:hover": {
		backgroundColor: "var(--purple)",
		color: "var(--base)",
	},
});

export default StyledToggleButton;
