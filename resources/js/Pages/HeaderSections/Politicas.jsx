import React from 'react';
import PageHero from './PageHero'; // Ajusta la ruta según tu proyecto
import Layout from "@/Layouts/MainLayout";
import PoliticasPrivacidadExtendidas from './PoliticasPrivacidadExtendidas';

export default function Politicas({ auth }) {
    return (
        <Layout title="emprendimiento">
            <PageHero title="Nuestras Politicas" />
            <PoliticasPrivacidadExtendidas />
        </Layout>
    );
}