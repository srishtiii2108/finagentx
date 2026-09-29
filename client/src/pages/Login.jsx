import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BrainCircuit, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const navigate = useNavigate();
    const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

    const [state, setState] = useState('Sign Up');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            axios.defaults.withCredentials = true;

            let url = backendUrl;
            if (state === 'Sign Up') {
                url += '/api/auth/register';
                const { data } = await axios.post(url, { name, email, password });
                if (data.success) {
                    setIsLoggedin(true);
                    getUserData();
                    navigate('/dashboard'); // <-- Changed from '/' to '/dashboard'
                } else {
                    toast.error(data.message);
                }
            } else {
                url += '/api/auth/login';
                const { data } = await axios.post(url, { email, password });
                if (data.success) {
                    setIsLoggedin(true);
                    getUserData();
                    navigate('/dashboard'); // <-- Changed from '/' to '/dashboard'
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen px-4 bg-brand-dark'>
            
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

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='bg-brand-surface/50 backdrop-blur-xl border border-brand-border p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md'
            >
                <div className="text-center mb-8">
                    <h2 className='text-3xl font-bold text-white mb-2 tracking-tight'>
                        {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <p className='text-brand-muted text-sm'>
                        {state === 'Sign Up' 
                            ? 'Join FinAgentX for AI-powered financial intelligence' 
                            : 'Sign in to access your investment dashboard'}
                    </p>
                </div>

                <form onSubmit={onSubmitHandler} className="space-y-4">
                    {state === 'Sign Up' && (
                        <div className='relative'>
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-brand-muted" />
                            </div>
                            <input
                                onChange={e => setName(e.target.value)}
                                value={name}
                                className='w-full pl-10 pr-4 py-3 bg-brand-primary/50 border border-brand-border rounded-xl text-white placeholder-brand-muted focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors'
                                type="text"
                                placeholder="Full Name"
                                required
                            />
                        </div>
                    )}

                    <div className='relative'>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-brand-muted" />
                        </div>
                        <input
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            className='w-full pl-10 pr-4 py-3 bg-brand-primary/50 border border-brand-border rounded-xl text-white placeholder-brand-muted focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors'
                            type="email"
                            placeholder="Email Address"
                            required
                        />
                    </div>

                    <div className='relative'>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-brand-muted" />
                        </div>
                        <input
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            className='w-full pl-10 pr-4 py-3 bg-brand-primary/50 border border-brand-border rounded-xl text-white placeholder-brand-muted focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors'
                            type="password"
                            placeholder="Password"
                            required
                        />
                    </div>

                    {state === 'Login' && (
                        <div className="flex justify-end">
                            <span 
                                onClick={() => navigate('/reset-password')} 
                                className='text-sm text-brand-blue hover:text-blue-400 cursor-pointer transition-colors font-medium'
                            >
                                Forgot password?
                            </span>
                        </div>
                    )}

                    <button 
                        type="submit"
                        disabled={isLoading}
                        className='w-full py-3 px-4 flex items-center justify-center gap-2 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-semibold transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed mt-6'
                    >
                        {isLoading ? 'Processing...' : (state === 'Sign Up' ? 'Create Account' : 'Sign In')}
                        {!isLoading && <ArrowRight className="w-4 h-4" />}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-brand-border text-center">
                    {state === 'Sign Up' ? (
                        <p className='text-brand-muted text-sm'>
                            Already have an account?{' '}
                            <span 
                                onClick={() => setState('Login')} 
                                className='text-white hover:text-brand-blue cursor-pointer font-medium transition-colors'
                            >
                                Sign in instead
                            </span>
                        </p>
                    ) : (
                        <p className='text-brand-muted text-sm'>
                            Don't have an account?{' '}
                            <span 
                                onClick={() => setState('Sign Up')} 
                                className='text-white hover:text-brand-blue cursor-pointer font-medium transition-colors'
                            >
                                Request access
                            </span>
                        </p>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

export default Login;