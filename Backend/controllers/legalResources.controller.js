import LegalResource from '../models/legalResource.model.js';

// Create a legal resource
export const createLegalResource = async (req, res) => {
  const { title, description, link, type } = req.body;

  try {
    const legalResource = new LegalResource({
      title,
      description,
      link,
      type,
      author: req.user,  // Optional, could be the admin or the person adding the resource
    });

    await legalResource.save();
    res.status(201).json(legalResource);
  } catch (err) {
    res.status(500).json({ message: 'Error creating legal resource', error: err.message });
  }
};

// Get all legal resources
export const getLegalResources = async (req, res) => {
  try {
    const legalResources = await LegalResource.find();
    res.status(200).json({
      message : "Fetched Successfully",
      legalResources,
      success : true
    });
  } catch (err) {
    res.status(500).json({ 
      message: 'Error fetching legal resources',
      error: err.message,
      success : false
    });
  }
};

// Delete a legal resource
export const deleteLegalResource = async (req, res) => {
  const { resourceId } = req.params;

  try {
    const resource = await LegalResource.findById(resourceId);

    if (!resource) {
      return res.status(404).json({ message: 'Legal resource not found' });
    }

    await resource.deleteOne();
    res.status(200).json({ message: 'Resource deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting resource', error: err.message });
  }
};
