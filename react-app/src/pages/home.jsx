import Navbar from "../components/navbar";
import { Link } from "react-router-dom";

export default function Home(){
    return(
        <div>
            <Navbar/>
            <div className="text-black">
                <div className="hero-section">
                    <div className="hero-content">
                        <h1 className="hero-text">Craft Engaging <span className='highlight'>Courses</span> Effortlessly and Integrate Them into Your Learning Experience</h1>
                        <Link to="/signup" className="text-black font-bold text-xl">
                            <button className='hero-btn hover:bg-blue-700 transition ease-in-out duration-300'>Get started</button>
                        </Link>
                        <p>Turn your documents into courses in seconds</p>
                    </div>
                </div>

                <div id='features' className='features-section'>
                    <strong style={{ color: "#ef4f1a" }}>Features</strong>
                    <h1>How we rock</h1>
                    <main className="grid-container">
                    <section className="data-section card">
                        <h3>Document Upload</h3>
                        <p><strong>Upload Options:</strong> Easily upload various types of documents, including lecture notes, personal insights, and articles.</p>
                        <p><strong>Content Processing:</strong> Automatically process and organize uploaded content for creating comprehensive courses.</p>
                    </section>
                    <section className="course-creation-section card">
                        <h3>Course Creation</h3>
                        <p><strong>AI-Powered Design:</strong> Configure parameters to design the structure and flow of your courses.</p>
                        <p><strong>Creation Interface:</strong> Utilize an intuitive interface to effortlessly create and organize course content.</p>
                    </section>
                    <section className="content-retrieval-section card">
                        <h3>Content Retrieval</h3>
                        <p><strong>Search Options:</strong> Integrate with search engines to retrieve relevant documents for creating educational content.</p>
                        <p><strong>Scoring Mechanism:</strong> Implement a scoring mechanism for ranking retrieved content based on relevance.</p>
                    </section>
                    <section className="content-generation-section card">
                        <h3>Content Generation</h3>
                        <p><strong>Language Generation:</strong> Utilize advanced natural language generation techniques to create engaging and contextually relevant course materials.</p>
                        <p><strong>Customization:</strong> Enable fine-tuning of the generation process based on specific learning needs.</p>
                    </section>
                    <section className="user-interaction-section card">
                        <h3>User Interaction</h3>
                        <p><strong>User-Friendly Interface:</strong> Provide an intuitive interface for users to interact with the platform, customize settings, and access results.</p>
                        <p><strong>Query Input:</strong> Allow users to input queries for information retrieval and course generation.</p>
                    </section>
                    <section className="integration-api-section card">
                        <h3>Integration and API</h3>
                        <p><strong>API Support:</strong> Offer APIs for seamless integration with other learning applications and services.</p>
                        <p><strong>External Integrations:</strong> Support integration with external data sources, databases, or other educational services.</p>
                    </section>
                    <section className="performance-monitoring-section card">
                        <h3>Performance Monitoring</h3>
                        <p><strong>Monitoring Tools:</strong> Provide tools for monitoring the performance of courses over time.</p>
                        <p><strong>Automatic Updates:</strong> Implement mechanisms for automatic updates and improvements to enhance the learning experience.</p>
                    </section>
                    <section className="support-section card">
                        <h3>Documentation and Support</h3>
                        <p><strong>User Documentation:</strong> Offer comprehensive documentation to guide users on how to make the most of the platform.</p>
                        <p><strong>Customer Support:</strong> Provide channels for users to seek assistance or inquire about the learning process.</p>
                    </section>
                    <section className="customization-section card">
                        <h3>Customization</h3>
                        <p><strong>Configurability:</strong> Allow users to customize the learning experience according to their specific preferences and requirements.</p>
                        <p><strong>Modular System:</strong> Support a modular system for users to add custom modules or components to enhance their courses.</p>
                    </section>

                    </main>
                </div>
            </div>
        </div>
    )
}