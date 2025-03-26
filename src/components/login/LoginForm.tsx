"use client";
import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    IconButton,
    InputAdornment,
    Snackbar,
    Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ResetPasswordModal from "@/components/ResetPasswordModal";

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [openResetModal, setOpenResetModal] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const isFormValid = username.trim() !== "" && password.trim() !== "";

    const handleLogin = () => {
        if (!isFormValid) {
            alert("Please fill in all fields.");
            return;
        }
        console.log("Logging in with", { username, password });
        setShowSuccessAlert(true);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                padding: "20px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                position: "relative",
                overflow: "hidden",
                "&:before": {
                    content: '""',
                    position: "absolute",
                    top: "-50%",
                    right: "-50%",
                    width: "100%",
                    height: "100%",
                    background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                    transform: "rotate(30deg)",
                },
            }}
        >
            {/* Animated Background Shapes */}
            <Box
                sx={{
                    position: "absolute",
                    top: "20%",
                    left: "10%",
                    width: "300px",
                    height: "300px",
                    borderRadius: "50%",
                    background: "linear-gradient(45deg, rgba(255,255,255,0.05) 0%, transparent 100%)",
                    animation: "float 6s ease-in-out infinite",
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    bottom: "15%",
                    right: "10%",
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    background: "linear-gradient(45deg, rgba(255,255,255,0.05) 0%, transparent 100%)",
                    animation: "float 8s ease-in-out infinite",
                    animationDelay: "1s",
                }}
            />

            {/* Main Card */}
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "420px",
                    padding: { xs: "25px", sm: "40px" },
                    borderRadius: "20px",
                    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)",
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    textAlign: "center",
                    position: "relative",
                    zIndex: 1,
                    transform: "translateY(0)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.25)",
                    },
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    mb={3}
                    sx={{
                        color: "#4a4a4a",
                        background: "linear-gradient(to right, #667eea, #764ba2)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        letterSpacing: "0.5px",
                    }}
                >
                    Welcome Back
                </Typography>

                <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            background: "rgba(245, 245, 245, 0.8)",
                            "& fieldset": {
                                borderColor: "rgba(0, 0, 0, 0.1)",
                            },
                            "&:hover fieldset": {
                                borderColor: "#667eea",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#764ba2",
                                borderWidth: "2px",
                            },
                        },
                        "& .MuiInputLabel-root": {
                            color: "#666",
                            "&.Mui-focused": {
                                color: "#764ba2",
                                fontWeight: "500",
                            },
                        },
                        mb: 2,
                    }}
                />

                <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    sx={{
                                        color: "#666",
                                        "&:hover": {
                                            color: "#764ba2",
                                        },
                                    }}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            background: "rgba(245, 245, 245, 0.8)",
                            "& fieldset": {
                                borderColor: "rgba(0, 0, 0, 0.1)",
                            },
                            "&:hover fieldset": {
                                borderColor: "#667eea",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#764ba2",
                                borderWidth: "2px",
                            },
                        },
                        "& .MuiInputLabel-root": {
                            color: "#666",
                            "&.Mui-focused": {
                                color: "#764ba2",
                                fontWeight: "500",
                            },
                        },
                        mb: 1,
                    }}
                />

                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: 3,
                        py: 1.5,
                        fontSize: "16px",
                        fontWeight: "600",
                        borderRadius: "12px",
                        background: "linear-gradient(to right, #667eea, #764ba2)",
                        boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                        textTransform: "none",
                        letterSpacing: "0.5px",
                        transition: "all 0.3s ease",
                        "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 6px 20px rgba(102, 126, 234, 0.6)",
                            background: "linear-gradient(to right, #5a6fd1, #6a4298)",
                        },
                        "&:active": {
                            transform: "translateY(0)",
                        },
                        "&.Mui-disabled": {
                            background: "#e0e0e0",
                            color: "#a0a0a0",
                            boxShadow: "none",
                        },
                    }}
                    onClick={handleLogin}
                    disabled={!isFormValid}
                >
                    Sign In
                </Button>

                <Typography
                    variant="body2"
                    sx={{
                        mt: 2,
                        textAlign: "center",
                        cursor: "pointer",
                        fontWeight: "600",
                        color: "#764ba2",
                        transition: "all 0.2s ease",
                        "&:hover": {
                            textDecoration: "underline",
                            color: "#5a3a82",
                        },
                    }}
                    onClick={() => setOpenResetModal(true)}
                >
                    Forgot Password?
                </Typography>
            </Box>

            <ResetPasswordModal open={openResetModal} onClose={() => setOpenResetModal(false)} />

            {/* Success Alert */}
            <Snackbar
                open={showSuccessAlert}
                autoHideDuration={3000}
                onClose={() => setShowSuccessAlert(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setShowSuccessAlert(false)}
                    severity="success"
                    sx={{
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                        borderRadius: "12px",
                        backdropFilter: "blur(8px)",
                        background: "rgba(255, 255, 255, 0.9)",
                    }}
                >
                    Successfully signed in!
                </Alert>
            </Snackbar>

            {/* Global Styles for Animation */}
            <style jsx global>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                    100% { transform: translateY(0px); }
                }
            `}</style>
        </Box>
    );
};

export default LoginForm;