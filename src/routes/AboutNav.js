import React from 'react'
import PageHeader from "../components/website/PageHeader";
import About from '../components/website/About';
import Features from "../components/website/Features";
import Team from '../components/website/Team';

export default function AboutNav() {
    return (
        <>
            <PageHeader title="About Us" readOnly />
            
            <About />
            <Features />
            <Team />

        </>
    )
}
