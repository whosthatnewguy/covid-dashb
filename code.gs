function getJSON() {
  
  const url = "https://www.dph.illinois.gov/sitefiles/COVIDTestResults.json?nocache=1";
  
  //get data from  URL
  const response = UrlFetchApp.fetch(url).getContentText();
  //parse into JSON
  const responseJSON = JSON.parse(response);
  
  //list of json schema
  /*
  characteristics_by_county
  LastUpdateDate
  state_testing_results
  demographics
  state_recovery_data
  */
  
  const data_results = responseJSON.state_testing_results.values;
//   { testDate: '3/12/2020',
//    total_tested: 418,
//    confirmed_cases: 32,
//    deaths: 0 }
  const age_demographics = responseJSON.demographics.age[0].demographics.race;
  const race_demographics = responseJSON.demographics.race;
  const gender_demographics = responseJSON.demographics.gender;
  //const data_demographics2 = responseJSON.demographics.age.age_group;
  console.log(age_demographics);
  console.log(race_demographics);
  console.log(gender_demographics);
  //console.log(data_demographics2);
//   { age_group: '<20',
//    count: 9329,
//    tested: 80813,
//    deaths: 4,
//    demographics: { race: [Object] } },

  
  const ssData = data_results.map(r => [r.testDate,r.total_tested,r.confirmed_cases,r.deaths]);
  //const ssData2 = age_demographics.map(r => [r.description,r.count,r.tested,r.deaths,r.color]);
  //const ssData3 = race_demographics.map(r => [r.description,r.count,r.tested,r.deaths,r.color]);
  //const ssData4 = gender_demographics.map(r => [r.description,r.count,r.tested,r.deaths,r.color]);
  
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName("results").getRange(2,1,ssData.length,4).setValues(ssData);
  //SpreadsheetApp.getActiveSpreadsheet().getSheetByName("demo_race").getRange(2,1,ssData2.length,5).setValues(ssData2);
  //SpreadsheetApp.getActiveSpreadsheet().getSheetByName("demo_race2").getRange(2,1,ssData3.length,5).setValues(ssData3);
  //SpreadsheetApp.getActiveSpreadsheet().getSheetByName("demo_gender").getRange(2,1,ssData4.length,5).setValues(ssData4);
}

function getCovidData(){
  const s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("results");
  //const s1 = ss.getSheetByName("demo_race2");
  //const s2 = ss.getSheetByName("demo_gender");
  
  //get data1
  const textData = s.getRange(2, 5, s.getLastRow()-1,4).getDisplayValues();
  return textData.map(r =>[r[0],parseInt(r[1]),parseInt(r[2]),parseInt(r[3])]);
  //get data2
  //const textData1 = s1.getRange(2, 1, s.getLastRow()-1,4).getDisplayValues();
  //return textData1.map(r =>[r[0],parseInt(r[1]),parseInt(r[2]),parseInt(r[3])]);
  //get data3
  //const textData2 = s2.getRange(2, 1, s.getLastRow()-1,4).getDisplayValues();
  //return textData2.map(r =>[r[0],parseInt(r[1]),parseInt(r[2]),parseInt(r[3])]);
 
}
