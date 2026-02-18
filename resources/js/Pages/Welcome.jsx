import Layout from "@/Layouts/MainLayout";
import ConstellationHero from '@/Components/Welcome/ConstellationHero';
import AboutSection from '@/Components/Welcome/AboutSection';
import FeaturesGrid from '@/Components/Welcome/FeaturesGrid';
import VideoSection from '@/Components/Welcome/VideoSection';
import HowWeWork from '@/Components/Welcome/HowWeWork';
import DescriptionBanner from '@/Components/Welcome/DescriptionBanner';
import PackageCards from '@/Components/Welcome/PackageCards';
import PlanesHeader from '@/Components/Welcome/PlanesHeader';
import TeamSection from "@/Components/Welcome/TeamSection";
import TestimonialsSection from "@/Components/Welcome/TestimonialsSection";
import BlogSection from "@/Components/Welcome/BlogSection";
import PaymentMethods from "@/Components/Welcome/PaymentMethods";

export default function Welcome() {

    return (
        <Layout title="emprendimiento">
            <ConstellationHero />
            <AboutSection />
            <FeaturesGrid />
            <VideoSection youtubeUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
            <HowWeWork />
            <DescriptionBanner />
            <PlanesHeader />
            <PackageCards />
            <TeamSection />
            <TestimonialsSection />
            <BlogSection />
            <PaymentMethods />
        </Layout>
    );

}
