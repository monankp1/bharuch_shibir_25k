'use client'
import React, { useState } from 'react'
import { Modal, Box, TextField, Button, Typography, IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline' // Success Icon

interface ResetPasswordModalProps {
    open: boolean
    onClose: () => void
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({ open, onClose }) => {
    const [shibirID, setShibirID] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)

    const isPhoneValid = phoneNumber.length === 10 && /^\d+$/.test(phoneNumber)
    const isFormValid =
        shibirID.trim() !== '' && isPhoneValid && password.trim() !== '' && confirmPassword.trim() !== '' && password === confirmPassword

    const handleResetPassword = () => {
        if (!isFormValid) {
            alert('Please fill in all fields correctly.')
            return
        }

        // Simulate API call (Replace with actual API)
        setTimeout(() => {
            setSuccessMessage(true)
            setTimeout(() => {
                setSuccessMessage(false)
                onClose()
            }, 2000)
        }, 1000)
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90%',
                    maxWidth: '420px',
                    bgcolor: 'white',
                    p: 4,
                    borderRadius: '12px',
                    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
                    background: 'linear-gradient(135deg, #f9fafc, #ffffff)',
                    transition: 'all 0.3s ease-in-out'
                }}
            >
                {successMessage ? (
                    <Box textAlign="center">
                        <CheckCircleOutlineIcon
                            sx={{
                                fontSize: 70,
                                color: 'green',
                                animation: 'fadeIn 0.6s ease-in-out'
                            }}
                        />
                        <Typography variant="h6" fontWeight="bold" color="green" mt={2}>
                            Password Successfully Updated!
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <Typography variant="h5" textAlign="center" fontWeight="bold" color="#333">
                            Reset Password
                        </Typography>
                        <Typography variant="body2" textAlign="center" color="gray" mb={3}>
                            Enter your details to reset your password
                        </Typography>

                        <TextField
                            fullWidth
                            label="Shibir ID"
                            variant="outlined"
                            margin="normal"
                            value={shibirID}
                            onChange={(e) => setShibirID(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    background: '#f8f9fa'
                                },
                                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#007bff'
                                }
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Phone Number"
                            variant="outlined"
                            margin="normal"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            error={phoneNumber.length > 0 && !isPhoneValid}
                            helperText={phoneNumber.length > 0 && !isPhoneValid ? 'Invalid phone number' : ''}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    background: '#f8f9fa'
                                }
                            }}
                        />
                        <TextField
                            fullWidth
                            label="New Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    background: '#f8f9fa'
                                }
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            variant="outlined"
                            margin="normal"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={confirmPassword.length > 0 && password !== confirmPassword}
                            helperText={confirmPassword.length > 0 && password !== confirmPassword ? 'Passwords do not match' : ''}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    background: '#f8f9fa'
                                }
                            }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                py: 1.4,
                                fontSize: '16px',
                                fontWeight: 'bold',
                                borderRadius: '8px',
                                backgroundColor: '#007bff',
                                '&:hover': {
                                    backgroundColor: '#0056b3'
                                },
                                transition: 'all 0.3s ease-in-out'
                            }}
                            onClick={handleResetPassword}
                            disabled={!isFormValid}
                        >
                            Reset Password
                        </Button>
                    </>
                )}
            </Box>
        </Modal>
    )
}

export default ResetPasswordModal
