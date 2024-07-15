const mongoose = require('mongoose');
const { Schema } = mongoose;

const vendorSchema = new Schema({
  vendor_id: { 
    type: Schema.Types.ObjectId,
    required: true,
    unique: true
  }, // custom id (auto-generated or manually input)
  name: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ['supplier', 'shipment_agency']
  },
  phone: String,
  balance: { type: Number, default: 0 }
});

const Vendor = mongoose.model('vendor', vendorSchema);

module.exports = Vendor;
