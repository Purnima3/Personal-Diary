'use strict';

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const moment = require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const results = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(path.join(__dirname, 'output_data.csv'))
        .pipe(csv())
        .on('data', (data) => {
          console.log('Raw data:', data);
          console.log('Date value:', data.date);
          results.push(data);
        })
        .on('end', () => {
          const records = results.map(row => {
            const parsedDate = moment(row.date, 'YYYY-MM-DD');
            if (!parsedDate.isValid()) {
              console.error(`Invalid date format: ${row.date}`);
              return null; // Return null for invalid date
            }
            return {
              userid: row.userid,
              text: row.text,
              date: parsedDate.toDate(),
              emotion: row.emotion,
              createdAt: new Date(),
              updatedAt: new Date()
            };
          }).filter(record => record !== null); // Filter out records with invalid dates
          
          queryInterface.bulkInsert('UserPosts', records, {})
            .then(resolve)
            .catch(reject);
        })
        .on('error', reject);
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserPosts', null, {});
  }
};
