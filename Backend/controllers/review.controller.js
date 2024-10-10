import Review from '../models/review.model.js';
import Lawyer from '../models/lawyer.model.js'

// Create a review
export const createReview = async (req, res) => {
  const { rating, comment } = req.body;
  const { id } = req.params;
  try {

    const review = new Review({
      user: req.user,  // req.user comes from the JWT middleware
      lawyer: id,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({
      message: "Review Created",
      review,
      success: true
    })
  } catch (err) {
    res.status(500).json({ message: 'Error creating review', error: err.message });
  }
};

//get all reviews
export const getReview = async (req, res) => {
  try {
    const reviews = await Review.find().populate('user').populate('lawyer');

    console.log(reviews)

    res.status(200).json({
      message: "Review fetched successfully",
      reviews,
      success: true
    })

  } catch (err) {
    res.status(500).json({
      message: 'Error fetching reviews',
      error: err.message,
      success: false
    });
  }
}

// Get all reviews for a lawyer
export const getReviewsForLawyer = async (req, res) => {
  const { lawyerId } = req.params;

  try {
    const reviews = await Review.find({ lawyer: lawyerId }).populate('user');
    res.status(200).json({
      message: "Review fetched successfully",
      reviews,
      success: true
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching reviews',
      error: err.message,
      success: false
    });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ 
        message: 'Review not found',
        success : false
      });
    }

    // Only the user who created the review can delete it
    // console.log(review.user.toString(), req.user._id.toString())
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ 
        message: 'Not authorized to delete this review',
        success:false
      });
    }

    await review.deleteOne();
    res.status(200).json({
      message: 'Review deleted',
      success: true
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error deleting review',
      error: err.message,
      success : false
    });
  }
};
