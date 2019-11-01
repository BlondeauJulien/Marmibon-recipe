import React from 'react';

const User = () => {
	return (
		<div className="user-container">
			<div className="user-profile-action-container">
				<a>
					<div className="btn-info">Mes infos</div>
				</a>
				<button className="btn-logout">Se déconnecter</button>
			</div>
			<div className="user-profile-container">
				<h1>JulienBld</h1>
				<div className="user-content-container">
					<div className="btn-saved-or-created-recipe-cont">
						<div className="btn-user-saved-recipe">Mes recettes créées</div>
						<div className="btn-user-created-recipe">Mes recettes sauvegardées</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default User;
