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
          // Check if Date field is empty
          if (!data.Date) {
            console.log('Skipping row with empty Date field');
            return;
          }

          console.log('Raw data:', data);
          console.log('Date value:', data.Date);

          results.push(data);
        })
        .on('end', () => {
          const records = results.map(row => {
            // Parse Date field
            const parsedDate = moment(row.Date, 'YYYY-MM-DD');
            if (!parsedDate.isValid()) {
              console.error(`Invalid date format: ${row.Date}`);
              return null; // Return null for invalid date
            }
            return {
              userid: row.Userid,
              text: row.Sentence,
              date: parsedDate.toDate(),
              emotion: row.Emotion,
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
