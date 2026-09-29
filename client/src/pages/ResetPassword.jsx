import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BrainCircuit, Mail, Lock, KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';

// This configuration should be set once per module
axios.defaults.withCredentials = true;

const ResetPassword = () => {
    const { backendUrl } = useContext(AppContent);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

    const inputRefs = useRef([]);

    const handleInput = (e, index) => {
        if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        const paste = e.clipboardData.getData('text');
        const pasteArray = paste.split('');
        pasteArray.forEach((char, index) => {
            if (inputRefs.current[index]) {
                inputRefs.current[index].value = char;
            }
        });
    };

    const onSubmitEmail = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email });
            if (data.success) {
                toast.success(data.message);
                setIsEmailSent(true);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred.");
        }
    };

    const onSubmitOTP = (e) => {
        e.preventDefault();
        const otpArray = inputRefs.current.map(input => input.value);
        const otpValue = otpArray.join('');
        if (otpValue.length < 6) {
            toast.error("Please enter the complete 6-digit OTP.");
            return;
        }
        setOtp(otpValue);
        setIsOtpSubmitted(true);
    };

    const onSubmitNewPassword = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                backendUrl + '/api/auth/reset-password',
                { email, otp, newPassword }
            );
            if (data.success) {
                toast.success(data.message);
                navigate('/login');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred.");
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen px-4 bg-brand-dark'>
            
            {/* Logo */}
            <div 
                onClick={() => navigate('/')}
                className='absolute top-6 left-6 sm:left-10 flex items-center gap-2 cursor-pointer'
            >
                <div className="bg-brand-surface p-1.5 rounded-lg border border-brand-border">
                    <BrainCircuit className="w-5 h-5 text-brand-indigo" />
                </div>
                <span className="text-xl font-bold text-white tracking-wide">
                    FinAgent<span className="text-brand-blue">X</span>
                </span>
            </div>

            {/* Step 1: Email Form */}
            {!isEmailSent && (
                <motion.form 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                    onSubmit={onSubmitEmail} 
                    className='bg-brand-surface/50 backdrop-blur-xl border border-brand-border p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md'
                >
                    <div className="text-center mb-8">
                        <h1 className='text-3xl font-bold text-white mb-2 tracking-tight'>Reset Password</h1>
                        <p className='text-brand-muted text-sm'>Enter your registered email address to receive a recovery code.</p>
                    </div>
                    
                    <div className='relative mb-6'>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-brand-muted" />
                        </div>
                        <input
                            type="email"
                            placeholder='Email Address'
                            className='w-full pl-10 pr-4 py-3 bg-brand-primary/50 border border-brand-border rounded-xl text-white placeholder-brand-muted focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className='w-full py-3 bg-brand-blue hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors'>
                        Send Recovery Code
                    </button>
                </motion.form>
            )}

            {/* Step 2: OTP Form */}
            {isEmailSent && !isOtpSubmitted && (
                <motion.form 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                    onSubmit={onSubmitOTP} 
                    className='bg-brand-surface/50 backdrop-blur-xl border border-brand-border p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md'
                >
                    <div className="flex justify-center mb-6">
                        <div className="p-3 bg-brand-primary rounded-full border border-brand-border shadow-inner">
                            <KeyRound className="w-8 h-8 text-brand-blue" />
                        </div>
                    </div>
                    <h1 className='text-white text-2xl font-bold text-center mb-2 tracking-tight'>Enter Recovery Code</h1>
                    <p className='text-center mb-8 text-brand-muted text-sm'>We've sent a 6-digit code to your email.</p>
                    
                    <div className='flex justify-between gap-2 mb-8' onPaste={handlePaste}>
                        {Array(6).fill(0).map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                required
                                className='w-10 h-12 sm:w-12 sm:h-14 bg-brand-primary/50 border border-brand-border text-white text-center text-xl font-semibold rounded-xl focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors'
                                ref={el => inputRefs.current[index] = el}
                                onInput={(e) => handleInput(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                            />
                        ))}
                    </div>
                    <button type="submit" className='w-full py-3 bg-brand-blue hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors'>
                        Verify Code
                    </button>
                </motion.form>
            )}

            {/* Step 3: New Password Form */}
            {isEmailSent && isOtpSubmitted && (
                <motion.form 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                    onSubmit={onSubmitNewPassword} 
                    className='bg-brand-surface/50 backdrop-blur-xl border border-brand-border p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md'
                >
                    <div className="text-center mb-8">
                        <h1 className='text-3xl font-bold text-white mb-2 tracking-tight'>New Password</h1>
                        <p className='text-brand-muted text-sm'>Create a strong new password for your account.</p>
                    </div>
                    
                    <div className='relative mb-6'>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-brand-muted" />
                        </div>
                        <input
                            type="password"
                            placeholder='New Password'
                            className='w-full pl-10 pr-4 py-3 bg-brand-primary/50 border border-brand-border rounded-xl text-white placeholder-brand-muted focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className='w-full py-3 bg-brand-success hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors'>
                        Update Password
                    </button>
                </motion.form>
            )}
        </div>
    );
};

export default ResetPassword;