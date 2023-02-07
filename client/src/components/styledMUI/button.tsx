/** @format */

import { Button, styled } from "@mui/material";

export const StyledButton = styled(Button)({
	backgroundColor: "var(--purple)",
	fontFamily: "Poppins, sans-serif",
	fontSize: "1.5rem",
	fontWeight: "bold",
	textTransform: "none",
	borderRadius: "0.75rem",
	padding: "0.75rem",
	":hover": {
		backgroundColor: "var(--pink)",
	},
});
