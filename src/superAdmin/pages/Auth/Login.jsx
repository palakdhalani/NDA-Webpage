import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Phone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

const Login = ({ portal }) => {
  const [loginType, setLoginType] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      if (portal === 'admin' && email === 'admin@gmail.com' && password === 'admin123') {
        localStorage.setItem('user_name', 'Admin');
        localStorage.setItem('user_email', email);
        localStorage.setItem('user_role', 'admin');
        
        toast.success('Welcome back to Admin Portal!');
        window.location.href = '/admin';
      } else if (portal === 'superadmin' && email === 'super@gmail.com' && password === 'super123') {
        localStorage.setItem('user_name', 'Super Admin');
        localStorage.setItem('user_email', email);
        localStorage.setItem('user_role', 'superadmin');
        
        toast.success('Welcome back to Super Admin Portal!');
        window.location.href = '/superadmin';
      } else {
        toast.error('Invalid credentials for this portal! Please try again.');
      }
    }, 1500);
  };

  return (
    // md:h-screen use kiya hai taaki desktop par fixed rahe, overflow-hidden scroll ko rokta hai
    <div className="min-h-screen md:h-screen bg-[#F0F4FF] flex items-center justify-center p-4 md:p-8 relative overflow-hidden font-sans">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        // max-h-90vh ensure karta hai ki card screen se bada na ho
        className="w-full max-w-6xl bg-white rounded-[2.5rem] shadow-md overflow-hidden flex flex-col md:flex-row h-full max-h-[850px] border border-white relative z-10"
      >
        
        {/* Left Side: Visual & Welcome */}
        <div className="md:w-1/2 relative bg-[#4E80EE] overflow-hidden hidden md:block">
          <div className="absolute inset-0">
             <img 
               src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200" 
               alt="Futuristic Background" 
               className="w-full h-full object-cover opacity-80 mix-blend-overlay"
             />
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/40 via-transparent to-white/10" />
          </div>

          <div className="absolute bottom-12 left-12 right-12">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.3 }}
               className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-[2rem] text-center text-white"
             >
                <h2 className="text-xl font-bold tracking-tight mb-2">Welcome to the community</h2>
                <p className="text-sm text-white/70 font-medium mb-6">Login to explore the next generation of enterprise management.</p>
                
                <div className="flex justify-center gap-2">
                   {[1, 2, 3, 4].map((i) => (
                     <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === 2 ? 'w-6 bg-white' : 'w-1.5 bg-white/30'}`} />
                   ))}
                </div>
             </motion.div>
          </div>
        </div>

        {/* Right Side: Login Form (Scrollable area if content overflows) */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full py-4">
             {/* Title */}
             <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                  {portal === 'superadmin' ? 'Super Admin Login' : 'Admin Login'}
                </h1>
             </div>

             {/* Portal Role Selector */}
             {/* <div className="flex bg-slate-50 p-1.5 rounded-2xl mb-6 border border-slate-100 shadow-inner">
               <button
                 type="button"
                 onClick={() => setSelectedPortal('admin')}
                 className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${selectedPortal === 'admin' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 Admin Portal
               </button>
               <button
                 type="button"
                 onClick={() => setSelectedPortal('superadmin')}
                 className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${selectedPortal === 'superadmin' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 Super Admin Portal
               </button>
             </div> */}

             {/* Tabs */}
             <div className="flex border-b border-slate-100 mb-8 relative">
                <button 
                  onClick={() => setLoginType('email')}
                  className={`flex-1 pb-4 text-sm font-bold transition-all relative ${loginType === 'email' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  E-mail
                  {loginType === 'email' && <motion.div layoutId="tab" className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-blue-600" />}
                </button>
                <button 
                  onClick={() => setLoginType('mobile')}
                  className={`flex-1 pb-4 text-sm font-bold transition-all relative ${loginType === 'mobile' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Mobile Number
                  {loginType === 'mobile' && <motion.div layoutId="tab" className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-blue-600" />}
                </button>
             </div>

             {/* Form */}
             <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative group">
                   <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                      {loginType === 'email' ? <Mail size={18} /> : <Phone size={18} />}
                   </div>
                   <input 
                     type={loginType === 'email' ? 'email' : 'text'} 
                     placeholder={loginType === 'email' ? 'Email' : 'Mobile Number'} 
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full h-12 pl-12 pr-4 bg-white border border-slate-100 rounded-xl outline-none focus:border-blue-200 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-bold text-slate-700 placeholder:text-slate-400"
                     required
                   />
                </div>

                <div className="relative group">
                   <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                      <Lock size={18} />
                   </div>
                   <input 
                     type="password" 
                     placeholder="Password" 
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="w-full h-12 pl-12 pr-4 bg-white border border-slate-100 rounded-xl outline-none focus:border-blue-200 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-bold text-slate-700 placeholder:text-slate-400"
                     required
                   />
                </div>

                <div className="flex justify-end">
                   <button type="button" className="text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors">
                      Forgot password?
                   </button>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-[#4E80EE] text-white rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-blue-600 transition-all shadow-md shadow-blue-200 flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                   {isLoading ? (
                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                   ) : (
                     <>Continue <ArrowRight size={18} /></>
                   )}
                </button>
             </form>

             {/* Social Login */}
             <div className="mt-8 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Sign in With</p>
                <div className="flex justify-center">
                   <button className="p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all shadow-md">
                      <FcGoogle size={24} />
                   </button>
                </div>
             </div>

             {/* Footer */}
             <div className="mt-8 text-center">
                <p className="text-xs font-bold text-slate-400">
                  Dont have an account? <span className="text-blue-600 cursor-pointer hover:underline font-bold">Sign up</span>
                </p>
             </div>
          </div>
        </div>
      </motion.div>

      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-blue-100/30 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[25rem] h-[25rem] bg-indigo-100/20 blur-[80px] rounded-full pointer-events-none" />
    </div>
  );
};

export default Login;
