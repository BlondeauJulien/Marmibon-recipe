import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import LanguageContext from '../../context/language/languageContext';

const About = () => {
    const languageContext = useContext(LanguageContext);

    const { languageDisplayed } = languageContext;

    const aboutContent = () => {
        return languageDisplayed === "fr" ? (
            <div className="about-cont">
                <h1>A propos</h1>
                <div className="about-content">
                    <p>Marmibon est ma première application Full-stack et la première réalisée des 4 principaux projets qui apparaîtront dans mon portfolio.<br/><br/>
                    J'ai lancé le projet juste après avoir étudié les bases de <span>ReactJS</span> et <span>mongoDB</span> afin de 
                    consolider et développer mes connaissances.<br/><br/>
                    Si vous souhaitez me contacter, vous pouvez le faire via la page de Contact:<br/><br/>
                    <Link to="/Contact"><i class="fas fa-arrow-right"></i> Aller à Contact</Link>
                    </p>
                </div>
            </div>
        ) : (
            <div className="about-cont">
                <h1>About</h1>
                <div className="about-content">
                    <p>Marmibon is my first full stack application and the first one completed of the 4 main projects that will appear in my portfolio.<br/><br/>
                    I started the project right after I studied the basics of <span>ReactJS</span> and <span>mongoDB</span> in order to consolidate and expand my knowledge.<br/><br/>
                    If you wish to contact me, you can do so via my Contact page:<br/><br/>
                    </p>
                    <Link to="/Contact"><i class="fas fa-arrow-right"></i> Go to Contact</Link>
                </div>
            </div>
        )
    }

    return (aboutContent())
}

export default About
