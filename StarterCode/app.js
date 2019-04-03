// @TODO: YOUR CODE HERE!

//first thing's first, read in the csv data:

d3.csv('data.csv', function(error, newsData) {
    if(error) return console.warn(error);

    console.log(newsData);

    //convert non-string values to numeric. Learned a lot of this from 2-03-Par_BarChart_From_CSV app.js

    tvData.forEach(function(newsData) {
        newsData.poverty = +newsData.poverty;
        newsData.povertyMoe = +newsData.povertyMoe;
        newsData.age = +newsData.age;
        newsData.ageMoe = +newsData.ageMoe;
        newsData.income = +newsData.income;
        newsData.incomeMoe = +newsData.incomeMoe;
        newsData.healthcare = +newsData.healthcare;
        newsData.healthcareLow = +newsData.healthcareLow;
        newsData.healthcareHigh = +newsData.healthcareHigh;
        newsData.obesity = +newsData.obesity;
        newsData.obesityLow = +newsData.obesityLow;
        newsData.obesityHigh = +newsData.obesityHigh;
        newsData.smokes = +newsData.smokes;
        newsData.smokesLow = +newsData.smokesLow;
        newsData.smokesHigh = +newsData.smokesHigh;
    })
})

// create the scales for the charts.


// first graph, scatterplot between smokes and income (bubbles represent each state plus DC)
var incomeMax = d3.max(newsData, newsData => newsData.income);
var smokersMax = d3.max(newsData, newsData => newsData.smokesHigh);

// second graph, scatterplot between obesity and age (bubbles represent each state plus DC)
var ageMax = d3.max(newsData, newsData => newsData.age);
var obesityMax = d3.max(newsData, newsData => newsData.obesityHigh);



