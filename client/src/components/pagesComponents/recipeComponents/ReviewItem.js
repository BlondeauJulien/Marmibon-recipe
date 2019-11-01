import React from 'react';

const ReviewItem = () => {
	return (
		<div className="user-review-item">
			<div className="user-review-info-cont">
				<div className="user-review-logo">
					<span>B</span>
				</div>
				<div className="user-review-info">
					<span className="user-rating-cont"><span className="user-rating">5</span>/5</span>
					<span className="user-review-name">de Benjamin</span>
					<span className="user-review-date">xx/xx/xxxx</span>
				</div>
			</div>

			<div className="review-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled itLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it </div>
		</div>
	);
};

export default ReviewItem;
