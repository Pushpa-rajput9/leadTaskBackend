import { Lead } from "../models/lead.model.js";

export const addLead = async (req, res) => {
  try {
    // console.log("🔹 Request Body:", req.body);
    // console.log("🔹 Decoded User:", req.user);
    const {
      name,
      phone,
      altPhone,
      email,
      altEmail,
      status,
      qualification,
      interestField,
      source,
      assignedTo,
      jobInterest,
      state,
      city,
      passoutYear,
      heardFrom,
    } = req.body;

    if (
      !name ||
      !phone ||
      !email ||
      !status ||
      !qualification ||
      !interestField ||
      !source ||
      !jobInterest ||
      !state ||
      !city ||
      !passoutYear ||
      !assignedTo
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await Lead.findLeadByEmail(email);
    if (existingUser) {
      return res.status(404).json({ message: "Email is already registered." });
    }
    const newLead = await Lead.AddLead({
      name,
      phone,
      altPhone,
      email,
      altEmail,
      status,
      qualification,
      interestField,
      source,
      assignedTo,
      jobInterest,
      state,
      city,
      passoutYear,
      heardFrom,
    });

    res.status(201).json({
      message: "Lead is  added successfully.",
      id: newLead.id,
    });

    console.log("New a newLead:", newLead);
  } catch (error) {
    console.error("Error adding lead:", error);
    res
      .status(500)
      .json({ message: "Failed to add lead.", error: error.message });
  }
};
export const getAllLeads = async (req, res) => {
  try {
    const lead = await Lead.getAllLeads();
    res.status(200).json(lead);
  } catch (error) {
    console.error("Error getting Leads:", error);
    res.status(500).json({ message: "Failed to get leads." });
  }
};
export const updateLead = async (req, res) => {
  try {
    // console.log("🔹 Received Update Request for ID:", req.params.id);
    // console.log("🔹 Request Body:", req.body);

    const { id } = req.params;
    const {
      name,
      phone,
      altPhone,
      email,
      altEmail,
      status,
      qualification,
      interestField,
      source,
      assignedTo,
      jobInterest,
      state,
      city,
      passoutYear,
      heardFrom,
    } = req.body;

    if (
      !name ||
      !phone ||
      !email ||
      !status ||
      !qualification ||
      !interestField ||
      !source ||
      !jobInterest ||
      !state ||
      !city ||
      !passoutYear ||
      !assignedTo
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await Lead.findLeadByEmail(email);
    if (!existingUser) {
      return res.status(404).json({ message: "Lead not found" });
    }
    // Perform update
    const updatedLead = await Lead.updateLead(id, {
      name,
      phone,
      altPhone,
      email,
      altEmail,
      status,
      qualification,
      interestField,
      source,
      assignedTo,
      jobInterest,
      state,
      city,
      passoutYear,
      heardFrom,
    });

    if (updatedLead.affectedRows === 0) {
      return res.status(404).json({ message: "Lead not found." });
    }

    res.status(200).json({ message: "Lead updated successfully." });
  } catch (error) {
    console.error("❌ Error updating lead:", error);
    res.status(500).json({ message: "Failed to update lead." });
  }
};

export const getLeadById = async (req, res) => {
  const { id } = req.params;

  try {
    const lead = await Lead.getLeadById(id);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found." });
    }
    res.status(200).json(lead);
  } catch (error) {
    console.error("Error fetching lead:", error);
    res.status(500).json({ message: "Failed to fetch the lead." });
  }
};

export const deleteLead = async (req, res) => {
  const { id } = req.params;

  try {
    const affectedRows = await Lead.deleteLead(id);

    if (affectedRows === 0) {
      return res.status(404).json({ message: "Lead not found." });
    }
    res.status(200).json({ message: "Lead deleted successfully." });
  } catch (error) {
    console.error("Error deleting lead:", error);
    res.status(500).json({ message: "Failed to delete lead." });
  }
};
export const getLeadByName = async (req, res) => {
  const { name } = req.params;

  let decodedName = name
    .split("-")
    .map((word, index, arr) => {
      // Handle punctuation like "feat." and names
      if (word.includes(".")) return word; // keep as is, e.g., "feat."
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  // Additional cleanup (commas, punctuation spacing)
  decodedName = decodedName
    .replace(/ ,/g, ",") // fix comma spacing
    .replace(/Feat\./i, "feat.") // maintain lowercase "feat."
    .replace(/\s+/g, " ") // normalize extra spaces
    .trim();

  try {
    const lead = await Lead.getLeadByName(decodedName); // Match against slug in DB
    if (!lead) {
      return res.status(404).json({ message: "Lead not found." });
    }
    res.status(200).json(lead);
  } catch (error) {
    console.error("Error fetching lead:", error);
    res.status(500).json({ message: "Failed to fetch the lead." });
  }
};
