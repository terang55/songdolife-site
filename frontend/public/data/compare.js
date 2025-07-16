const fs = require('fs');

const data11 = JSON.parse(fs.readFileSync('realestate_2025-07-11.json', 'utf8'));
const data12 = JSON.parse(fs.readFileSync('realestate_2025-07-12.json', 'utf8'));

const ids11 = new Set(data11.deals.map(d => d.unique_id));
const ids12 = new Set(data12.deals.map(d => d.unique_id));

console.log('2025-07-11 total deals:', data11.deals.length);
console.log('2025-07-12 total deals:', data12.deals.length);
console.log('Difference:', data12.deals.length - data11.deals.length);

const newDeals = data12.deals.filter(d => !ids11.has(d.unique_id));
console.log('New deals found:', newDeals.length);

if (newDeals.length > 0) {
  console.log('\nFirst 10 new deals:');
  newDeals.slice(0, 10).forEach((deal, i) => {
    console.log(`${i+1}. ${deal.apartment_name} - ${deal.area} - ${deal.floor} - ${deal.deal_date} - ${deal.price}`);
  });
  
  console.log('\nAll new deal dates:');
  const newDealDates = {};
  newDeals.forEach(deal => {
    if (!newDealDates[deal.deal_date]) {
      newDealDates[deal.deal_date] = 0;
    }
    newDealDates[deal.deal_date]++;
  });
  
  Object.keys(newDealDates).sort().forEach(date => {
    console.log(`${date}: ${newDealDates[date]} deals`);
  });
}

// Check for duplicates within July 12 data
const uniqueIds12 = data12.deals.map(d => d.unique_id);
const duplicates = uniqueIds12.filter((id, index) => uniqueIds12.indexOf(id) !== index);
if (duplicates.length > 0) {
  console.log('\nDuplicates found in July 12 data:', duplicates.length);
  console.log('First 5 duplicate IDs:', duplicates.slice(0, 5));
}