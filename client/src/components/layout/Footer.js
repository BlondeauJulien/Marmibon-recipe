import React from 'react';

const Footer = () => {
	return (
		<footer>
			<div>
				<div className="arrow-back-top"><i class="fas fa-long-arrow-alt-up"></i></div>
                <div className="social-media-logo-container">
                <i class="fab fa-facebook"></i>
                <i class="fab fa-instagram"></i>
                <i class="fab fa-twitter"></i>
                <i class="fab fa-youtube"></i>
                <i class="fab fa-pinterest"></i>
                </div>
				<div className="footer-lists">
                    <div>
                        <p className="list-header">Recettes</p>
                        <ul>
                            <li>Voir tout</li>
                            <li>Entrées</li>
                            <li>Plats</li>
                            <li>Dessert</li>
                            <li>Recette au hasard</li>
                        </ul>
                    </div>
                    <div>
                    <p className="list-header">Info</p>
                        <ul>
                            <li>Contact</li>
                            <li>About</li>

                        </ul>
                    </div>
                </div>
				<p className="disclamer">Ce site a été créé dans un but d'apprentissage et inspiré pour le design de marmiton.org. <br/> Il n'a aucun but commercial.</p>
			</div>
		</footer>
	);
};

export default Footer;
