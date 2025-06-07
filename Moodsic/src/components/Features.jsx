const Features = () => {
    const features = [
        {
            title: "Recomendación inteligente",
            desc: "Genera recomendaciones automáticamente según tu estado emocional.",
            img: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTV0cTdxNHV1aDhxdzRpbDR3OGt0NHUwY2cyMWtzcHFhN3ozZ2g3eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/EwKfD3kAzUghvQiTuw/giphy.gif",
        },
        {
            title: "Reconocimiento emocional",
            desc: "Expresa tu ánimo o deja que la IA lo detecte por ti.",
            img: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExa251emNwaXAwaGZzOWk0cjVoZ21oaXZkd3Fsdnd0cml6cXJyMWtwZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5YN8nnWU6OFLghJJoy/giphy.gif",
        },
        {
            title: "Modos temáticos",
            desc: "Basa tu recomendación con música para estudiar, relajarte o motivarte.",
            img: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3BjZ3BobDNqbzdsbTZiNGpvMXo5a2dka3B4Nzh1dTgwamVvZ255diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XbJYBCi69nyVOffLIU/giphy.gif",
        },
        {
            title: "Guarda tus recomendaciones",
            desc: "Guarda tus canciones favoritas y revisalas cuando quieras.",
            img: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXFvZGJibnNsaXh0ZzdodGlnOGVwcGQ2Ymp2ajVpNWhkcDYyN3plbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/twdF6dEC6rK5ep7b4Y/giphy.gif",
        },
        {
            title: "Spotify",
            desc: "Escucha tus recomendaciones en Spotify.",
            img: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXg1NTRqZjlzNHA5bWNkeXk5MWg5M3NzNGFvbDM3d2E3bGUyamY1NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4oMoIbIQrvCjm/giphy.gif",
        },
        {
            title: "Estadísticas emocionales",
            desc: "Conoce cómo cambia tu ánimo con el tiempo.",
            img: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTJpZ2c1ZTllcnNheDA4MXVwY3dkdnl1bnV3ZDhpMzgyejRuZWhnNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/iRIf7MAdvOIbdxK4rR/giphy.gif",
        },
    ];

    return (
        <div className="py-20 px-6 md:px-20 text-yellow-400">
            <h2 className="text-4xl font-bold text-center text-white mb-12">¿Qué puede hacer <span className="text-amber-500">Moodsic</span> por ti?</h2>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {features.map((f, idx) => (
                    <div key={idx} className={`bg-[#41506b] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col`}>
                        <img src={f.img} alt={f.title} className="h-48 w-full object-cover"/>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                            <p className="text-sm text-white">{f.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Features;