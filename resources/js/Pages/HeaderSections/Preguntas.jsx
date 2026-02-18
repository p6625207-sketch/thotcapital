import React from 'react';
import PageHero from './PageHero'; // Ajusta la ruta según tu proyecto
import Layout from "@/Layouts/MainLayout";
import StatsSection from './StatsSection';
import TeamSection from '@/Components/Welcome/TeamSection';
import FAQSection from './Accordion';

export default function Preguntas({ auth }) {
    return (
        <Layout title="emprendimiento">
            <PageHero title="Preguntas" />
            <FAQSection />
            <StatsSection />
            <TeamSection />
        </Layout>
    );
}