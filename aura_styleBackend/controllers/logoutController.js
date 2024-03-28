const AuraUser = require("../models/signupmodels")
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const Token = mongoose.model('Token', { token: String });


const logout = async (req, res) => {
  const tokenId = req.params.tokenId;

  try {
    const existingToken = await Token.findOne({ token: tokenId });
    if (!existingToken) {
      return res.status(404).json({ error: 'Token not found' });
    }
    await Token.deleteOne({ token: tokenId });
    res.json({ message: 'Token deleted successfully' });
  } catch (error) {
    console.error('Error deleting token:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { logout}