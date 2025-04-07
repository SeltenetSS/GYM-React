import React from 'react'
import PageHeader from "../components/website/PageHeader";
import Contact from "../components/website/Contact";

export default function ContactNav() {
    return (
        <>
            <PageHeader title="Contact Us" readOnly />
            <Contact />
        </>
    )
}
