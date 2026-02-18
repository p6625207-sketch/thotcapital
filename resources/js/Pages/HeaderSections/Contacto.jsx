import React from 'react';
import PageHero from './PageHero'; // Ajusta la ruta según tu proyecto
import Layout from "@/Layouts/MainLayout";
import ContactForm from './ContactForm';

export default function Contacto({ auth }) {
    return (
        <Layout title="emprendimiento">
            <PageHero title="Contáctenos" />
            <ContactForm />
        </Layout>
    );
}