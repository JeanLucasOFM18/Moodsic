import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

const Landing = () => {
    return (
        <div>
            <Navbar />
            <section id="inicio" className="scroll-mt-36"><Hero /></section>
            <section id="como-funciona" className="scroll-mt-15"><HowItWorks /></section>
            <section id="funciones" className="scroll-mt-15"><Features /></section>
            <section id="faq" className="scroll-mt-15"><FAQ /></section>
            <Footer />
        </div>
    );
}

export default Landing;