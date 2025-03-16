import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Moon, Shield, Sun, Zap } from "lucide-react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

export const Home = () => {
    const { login, register } = useKindeAuth();
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("dashdeals-theme") === "dark";
    });

    const handleThemeChange = () => {
        setTheme(!theme);
        localStorage.setItem("dashdeals-theme", !theme ? "dark" : "light");
    };

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme);
    }, [theme]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 dark:from-gray-700 bg-gray-900">
        <Header 
            handleThemeChange={handleThemeChange} 
            login={login} 
            register={register} 
            theme={theme}
        />

        <MainContent register={register}/>

        <footer className="container mx-auto px-4 py-8 text-center text-white">
            <p>&copy; 2025 NeoVault. All rights reserved.</p>
        </footer>
    </div>
    )
};

interface HeaderProps {
    handleThemeChange: () => void;
    theme: boolean;
    login: () => void;
    register: () => void;
};

const Header: React.FC<HeaderProps> = ({ 
    handleThemeChange, 
    theme, 
    login, 
    register 
}) => {
    const { user, isLoading } = useKindeAuth();
    
    return (
        <header className="container mx-auto px-4 py-8">
            <nav className="flex justify-between items-center">
            <div className="text-white text-2xl font-bold">NeoVault</div>
            <div className="space-x-4 flex">
                <div 
                    className="flex items-center cursor-pointer" 
                    onClick={() => handleThemeChange()}
                >
                    {theme 
                    ? <Sun/> 
                    : <Moon className="text-black"/>
                    }
                </div>
                {isLoading 
                && <div className="relative pointer-events-none">
                        <Skeleton className="h-8 w-24 bg-gray-300 " />
                        <p className="absolute top-1 font-semibold left-2 text-gray-500">Dashboard</p>
                    </div>
                }
                {user 
                && <Link to="/dashboard">
                        <Button variant={"secondary"}>Dashboard</Button>
                    </Link> 
                }
                {!isLoading && !user &&
                    <>
                        <Button 
                            onClick={login} 
                            variant="ghost" 
                            className="text-white hover:text-gray-600 dark:hover:text-white">
                            Login
                        </Button>
                        <Button 
                            onClick={register} 
                            variant="outline" 
                            className="bg-white dark:bg-gray-300 dark:text-black text-pink-500">
                            Sign Up
                        </Button>
                    </>
                }
            </div>
            </nav>
        </header>
    )
};

interface MainContentProps {
    register: () => void;
};

const MainContent: React.FC<MainContentProps> = ({ register }) => {
    return (
        <main className="container mx-auto px-4 py-16">
            <div className="text-center">
            <motion.h1
                className="text-5xl md:text-6xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Secure Your Digital Life
            </motion.h1>
            <motion.p
                className="text-xl text-gray-100 mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Manage all your passwords in one safe place with SecureVault.
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <Button onClick={register} size="lg" className="bg-white dark:bg-gray-300 text-pink-500 hover:bg-gray-100">
                    Get Started <ArrowRight className="ml-2" />
                </Button>
            </motion.div>
            </div>

            <div className="mt-16 grid md:grid-cols-3 gap-8">
            <FeatureCard
                icon={<Lock className="w-12 h-12 text-pink-500" />}
                title="Secure Storage"
                description="Your passwords are encrypted and stored securely. Only you have access."
            />
            <FeatureCard
                icon={<Zap className="w-12 h-12 text-pink-500" />}
                title="Quick Access"
                description="Easily retrieve your passwords whenever you need them, on any device."
            />
            <FeatureCard
                icon={<Shield className="w-12 h-12 text-pink-500" />}
                title="Data Protection"
                description="Advanced encryption ensures your data remains safe from prying eyes."
            />
            </div>
        </main>
    )
};

interface FeatureCardProps {
    icon: JSX.Element;
    title: string;
    description: string
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
    return (
        <motion.div
            className="bg-white dark:bg-gray-300 rounded-lg p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
        >
        <div className="flex justify-center mb-4">{icon}</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
        </motion.div>
    )
};