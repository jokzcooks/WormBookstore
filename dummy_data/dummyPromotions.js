const mongoose = require('mongoose');

const promotions = [
  {
    promo_code: 'PROMO2023',
    percentage: 20,
    start_date: new Date('2023-01-01'),
    end_date: new Date('2023-12-31')
  },
  {
    promo_code: 'SUMMER2023',
    percentage: 15,
    start_date: new Date('2023-06-01'),
    end_date: new Date('2023-08-31')
  },
  {
    promo_code: 'BLACKFRIDAY',
    percentage: 30,
    start_date: new Date('2023-11-24'),
    end_date: new Date('2023-11-25')
  }
];

module.exports = promotions;
