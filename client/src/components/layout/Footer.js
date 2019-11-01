import React from 'react';

const Footer = () => {
	return (
		<footer>
			<div>
				<div className="arrow-back-top"><a href="#"><i class="fas fa-long-arrow-alt-up"></i></a></div>
                <div className="social-media-logo-container">
                <a href="https://www.facebook.com/marmiton" target="_blank"><i class="fab fa-facebook"></i></a>
                <a href="https://www.instagram.com/marmiton_org/" target="_blank"><i class="fab fa-instagram"></i></a>
                <a href="https://twitter.com/Marmiton_org" target="_blank"><i class="fab fa-twitter"></i></a>
                <a href="https://www.youtube.com/user/marmitonofficiel" target="_blank"><i class="fab fa-youtube"></i></a>
                <a href="https://www.pinterest.fr/" target="_blank"><i class="fab fa-pinterest"></i></a>
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
