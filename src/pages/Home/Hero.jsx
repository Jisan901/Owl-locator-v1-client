function Hero() {
    return (
        <div className="hero min-h-lg my-12 lg:my-16 max-w-3xl lg:max-w-5xl mx-auto bg-base-100">
            <div className="hero-content flex-col lg:flex-row-reverse text-center lg:text-left">
                <img src="/src/assets/auntum.png" className="max-w-xs lg:max-w-sm rounded-lg shadow-2xl ml-0 mb-5 lg:ml-5 lg:mb-0"/>
                <div>
                    <h1 className="text-5xl font-bold">Owl Locator!</h1>
                    <p className="py-6 max-w-md">
                        Real-time location tracing and chatting tool with JavaScript powered, for all web supported platform. with data protection service.
                    </p>
                    <button className="btn btn-warning text-base-500 bg-gradient-to-r from-warning to-yellow-200">Start tracing</button>
                </div>
            </div>
        </div>
    )
}

export default Hero;