const fs = require('fs');

const data12 = JSON.parse(fs.readFileSync('realestate_2025-07-12.json', 'utf8'));

// Group by unique_id to find duplicates
const idGroups = {};
data12.deals.forEach((deal, index) => {
  const id = deal.unique_id;
  if (!idGroups[id]) {
    idGroups[id] = [];
  }
  idGroups[id].push({...deal, originalIndex: index});
});

const duplicateIds = Object.keys(idGroups).filter(id => idGroups[id].length > 1);

console.log('Total unique IDs with duplicates:', duplicateIds.length);
console.log('Total deals:', data12.deals.length);
console.log('Unique deals after deduplication would be:', Object.keys(idGroups).length);

console.log('\nFirst 5 duplicate groups:');
duplicateIds.slice(0, 5).forEach((id, i) => {
  console.log(`\n${i+1}. ID: ${id}`);
  console.log(`   Count: ${idGroups[id].length}`);
  idGroups[id].forEach((deal, j) => {
    console.log(`   ${j+1}. Index ${deal.originalIndex}: ${deal.apartment_name} - ${deal.deal_date} - ${deal.price}`);
  });
});

// Check if the duplicates are identical
console.log('\nAnalyzing duplicate types:');
let identicalDuplicates = 0;
let differentDuplicates = 0;

duplicateIds.forEach(id => {
  const deals = idGroups[id];
  const firstDeal = deals[0];
  
  let isIdentical = true;
  for (let i = 1; i < deals.length; i++) {
    const deal = deals[i];
    if (JSON.stringify(firstDeal) !== JSON.stringify(deal)) {
      isIdentical = false;
      break;
    }
  }
  
  if (isIdentical) {
    identicalDuplicates++;
  } else {
    differentDuplicates++;
  }
});

console.log('Identical duplicates:', identicalDuplicates);
console.log('Different duplicates:', differentDuplicates);

// Sample of different duplicates
if (differentDuplicates > 0) {
  console.log('\nFirst different duplicate:');
  const differentId = duplicateIds.find(id => {
    const deals = idGroups[id];
    const firstDeal = deals[0];
    for (let i = 1; i < deals.length; i++) {
      if (JSON.stringify(firstDeal) !== JSON.stringify(deals[i])) {
        return true;
      }
    }
    return false;
  });
  
  if (differentId) {
    console.log(`ID: ${differentId}`);
    idGroups[differentId].forEach((deal, i) => {
      console.log(`${i+1}:`, JSON.stringify(deal, null, 2));
    });
  }
}