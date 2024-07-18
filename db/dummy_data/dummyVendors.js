const mongoose = require('mongoose');

const vendors = [
  {
    vendor_id: new mongoose.Types.ObjectId('60d5ec49f5ee3e2ddca25b01'),
    name: "World Books",
    type: "supplier",
    phone: "706-572-8324",
    balance: -3540
  },
  {
    vendor_id: new mongoose.Types.ObjectId('60d5ec49f5ee3e2ddca25b02'),
    name: "Best Books",
    type: "supplier",
    phone: "706-572-8325",
    balance: -350
  },
  {
    vendor_id: new mongoose.Types.ObjectId('60d5ec49f5ee3e2ddca25b03'),
    name: "Bookworms",
    type: "supplier",
    phone: "706-572-8326",
    balance: -540
  },
  {
    vendor_id: new mongoose.Types.ObjectId('60d5ec49f5ee3e2ddca25b04'),
    name: "Book Station",
    type: "supplier",
    phone: "706-572-8327",
    balance: -1040
  },
  {
    vendor_id: new mongoose.Types.ObjectId('60d5ec49f5ee3e2ddca25c04'),
    name: "Quick Ships",
    type: "shipment_agency",
    phone: "706-532-8427",
    balance: -1270
  }
];

module.exports = vendors;
