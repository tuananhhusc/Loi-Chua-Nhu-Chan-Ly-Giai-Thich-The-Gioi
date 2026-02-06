
"use client";
import React, { useState } from 'react';

interface Props {
    citationNumber: string;
    text: string;
}

export default function CitationTooltip({ citationNumber, text }: Props) {
    return (
        <a
            href={`#ref-${citationNumber}`}
            className="relative inline align-super text-[10px] text-accent font-bold hover:text-primary transition-colors duration-300 cursor-pointer group no-underline after:absolute after:-inset-3 after:content-['']"
            onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(`ref-${citationNumber}`);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Add a temporary highlight effect to the row
                    el.classList.add('bg-secondary/20');
                    el.classList.add('scale-[1.02]');
                    el.classList.add('transition-transform');
                    setTimeout(() => {
                        el.classList.remove('bg-secondary/20');
                        el.classList.remove('scale-[1.02]');
                        el.classList.remove('transition-transform');
                    }, 2000);
                }
            }}
        >
            [{citationNumber}]
        </a>
    );
}
