import React from 'react';

const ReviewItem = ({review}) => {
	return (
		<div className="user-review-item">
			<div className="user-review-info-cont">
				<div className="user-review-logo">
					<span>{review.authorReviewName[0].toUpperCase()}</span>
				</div>
				<div className="user-review-info">
					<span className="user-rating-cont"><span className="user-rating">{review.reviewRating}</span>/5</span>
					<span className="user-review-name">de {review.authorReviewName}</span>
{/* 					<span className="user-review-date">xx/xx/xxxx</span> */}
				</div>
			</div>

			<div className="review-text">{review.reviewContent}</div>
		</div>
	);
};

export default ReviewItem;
