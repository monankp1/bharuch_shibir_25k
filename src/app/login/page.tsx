"use client";

import { useState } from "react";
import { Button, TextField, Box, Typography, Modal } from "@mui/material";
import ResetPasswordModal from "@/components/login/ResetPasswordModal";

export default function LoginForm() {
    const [open, setOpen] = useState(false);

    return (
        <Box sx={{ width: 300, margin: "auto", mt: 10 }}>
            <Typography variant="h4" textAlign="center">Login</Typography>
            <TextField fullWidth label="Username" margin="normal" />
            <TextField fullWidth label="Password" type="password" margin="normal" />
            <Button fullWidth variant="contained" sx={{ mt: 2 }}>Sign In</Button>
            <Typography
                sx={{ mt: 2, textAlign: "center", cursor: "pointer", color: "blue" }}
                onClick={() => setOpen(true)}
            >
                Forgot Password?
            </Typography>

            <ResetPasswordModal open={open} onClose={() => setOpen(false)} />
        </Box>
    );
}