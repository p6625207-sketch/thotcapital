import React from 'react';
import PageHero from './PageHero'; // Ajusta la ruta según tu proyecto
import Layout from "@/Layouts/MainLayout";
import StatsSection from './StatsSection';
import TeamSection from '@/Components/Welcome/TeamSection';
import TestimonialsSection from '@/Components/Welcome/TestimonialsSection';

export default function Acerca({ auth }) {
    return (
        <Layout title="emprendimiento">
            <PageHero title="Acerca de Nosotros" />
            <StatsSection />
            <TeamSection />
            <TestimonialsSection />
        </Layout>
    );
}