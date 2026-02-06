
"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X, BookOpen, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Section {
    id: string;
    title: string;
    level: number;
}

interface Props {
    sections: Section[];
}

export default function Navigation({ sections }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const handleScroll = () => {
            // Logic to determine active section
            const scrollPosition = window.scrollY + 200; // Offset
            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
                    setActiveId(section.id);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100,
                behavior: 'smooth'
            });
            setIsOpen(false);
            setActiveId(id);
        }
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 p-4 bg-primary text-white rounded-full shadow-xl md:hidden hover:bg-opacity-90 transition-all"
                aria-label="Toggle Menu"
            >
                <BookOpen className="w-6 h-6" />
            </button>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black z-40 md:hidden"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-80 bg-surface shadow-2xl z-50 p-6 overflow-y-auto md:hidden border-l-4 border-secondary"
                        >
                            <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
                                <h2 className="text-xl font-display font-bold text-primary">Mục Lục</h2>
                                <button onClick={() => setIsOpen(false)} className="p-2 text-gray-500 hover:text-primary">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <ul className="space-y-4">
                                {sections.map((section) => {
                                    const parts = section.title.split(':');
                                    const hasColon = parts.length > 1;
                                    const label = hasColon ? parts[0] : (section.id === 'intro' ? 'Giới thiệu' : '');
                                    const content = hasColon ? parts.slice(1).join(':').trim() : section.title;

                                    return (
                                        <li key={section.id}>
                                            <button
                                                onClick={() => scrollToSection(section.id)}
                                                className={`text-left w-full py-2 transition-colors group ${activeId === section.id ? 'bg-secondary/5 -mx-2 px-2 rounded-lg' : ''}`}
                                            >
                                                <span className={`block text-[10px] uppercase tracking-widest font-bold mb-1 ${activeId === section.id ? 'text-secondary' : 'text-gray-400 group-hover:text-secondary'}`}>
                                                    {label}
                                                </span>
                                                <span className={`block font-display leading-tight ${activeId === section.id ? 'text-primary font-bold' : 'text-text-primary group-hover:text-primary'}`}>
                                                    {content}
                                                </span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <nav className="hidden md:block w-72 sticky top-24 self-start max-h-[80vh] overflow-y-auto pr-4 border-r border-gray-100">
                <h2 className="text-lg font-display font-bold text-primary mb-6 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-secondary" />
                    Mục Lục
                </h2>
                <ul className="space-y-4 relative">
                    {sections.map((section) => (
                        <li key={section.id} className="relative pl-4">
                            {activeId === section.id && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute left-0 top-1.5 w-1 h-4 bg-secondary rounded-full"
                                />
                            )}
                            <button
                                onClick={() => scrollToSection(section.id)}
                                className={`text-left w-full text-sm transition-colors block py-0.5 ${activeId === section.id ? 'text-primary font-bold' : 'text-text-secondary hover:text-primary'}`}
                            >
                                {section.level === 1 ? (
                                    <span className="font-display uppercase tracking-wider text-xs block mb-0.5 text-gray-400">
                                        {section.title.includes(':') ? section.title.split(':')[0] : section.title}
                                    </span>
                                ) : null}
                                {section.level === 1 && !section.title.startsWith("Phần") ? section.title : section.title.includes(':') ? section.title.split(':').slice(1).join(':').trim() : section.title}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}
