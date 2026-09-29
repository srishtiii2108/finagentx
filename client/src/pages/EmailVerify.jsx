import React, { useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContent } from '../context/AppContext';
import { BrainCircuit, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const EmailVerify = () => {
    axios.defaults.withCredentials = true;
    const { backendUrl, isLoggedin, userData, getUserData } = useContext(AppContent);
    const navigate = useNavigate();
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

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const otpArray = inputRefs.current.map(e => e.value);
            const otp = otpArray.join('');

            const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp });
            if (data.success) {
                toast.success(data.message);
                getUserData();
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        isLoggedin && userData && userData.isAccountVerified && navigate('/');
    }, [isLoggedin, userData, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen px-4 bg-brand-dark">
            
            {/* Logo */}
            <div 
                onClick={() => navigate("/")}
                className="absolute top-6 left-6 sm:left-10 flex items-center gap-2 cursor-pointer"
            >
                <div className="bg-brand-surface p-1.5 rounded-lg border border-brand-border">
                    <BrainCircuit className="w-5 h-5 text-brand-indigo" />
                </div>
                <span className="text-xl font-bold text-white tracking-wide">
                    FinAgent<span className="text-brand-blue">X</span>
                </span>
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-brand-surface/50 backdrop-blur-xl border border-brand-border p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md"
            >
                <div className="flex justify-center mb-6">
                    <div className="p-3 bg-brand-primary rounded-full border border-brand-border shadow-inner">
                        <ShieldCheck className="w-8 h-8 text-brand-success" />
                    </div>
                </div>

                <form onSubmit={onSubmitHandler}>
                    <h1 className="text-white text-2xl font-bold text-center mb-2 tracking-tight">
                        Verify Email
                    </h1>
                    <p className="text-center mb-8 text-brand-muted text-sm">
                        Enter the 6-digit code sent to your email address to secure your account.
                    </p>

                    <div className='flex justify-between gap-2 mb-8' onPaste={handlePaste}>
                        {Array(6).fill(0).map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                required
                                className='w-10 h-12 sm:w-12 sm:h-14 bg-brand-primary/50 border border-brand-border text-white text-center text-xl font-semibold rounded-xl focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors'
                                ref={e => inputRefs.current[index] = e}
                                onInput={(e) => handleInput(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                            />
                        ))}
                    </div>
                    
                    <button className='w-full py-3 bg-brand-blue hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors'>
                        Verify Identity
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default EmailVerify;