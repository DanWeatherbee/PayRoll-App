// Mutables
var keyWord;
var keyWord2;
var searchResults;
var totalHits;
var apiQuery;
var status;
// Globals
var KEY;
var APPID;
var API;
var API_STR_PREFIX;
var API_STR_MID;
var API_STR_KEY;
var GetJsonData;
var foodArray = [];
var itemModel;

GetJsonData = function(keyWord, keyWord2) {
        "use strict";
        KEY = "b9914a3ffda1ac8218e155c05cb52409";
        this.keyWord = keyWord;
        this.keyWord2 = keyWord2;
        APPID = "ffa2c4b5";
        API_STR_PREFIX = "https://api.nutritionix.com/v1_1/search/" + keyWord2 + "%20";
        API_STR_MID = "?fields=item_name%2Citem_id%2Cbrand_name" +
                "%2Cnf_calories%2Cnf_total_fat&appId=";
        API_STR_KEY = "&appKey=";
        API = API_STR_PREFIX +
                keyWord +
                API_STR_MID +
                APPID +
                API_STR_KEY +
                KEY;
        $.getJSON(API, function(data, status) {
                searchResults = data.hits;
                totalHits = data.total_hits;
                status = status;
                console.log(searchResults);
                var tracker = $('#search-result');
                var i = 0;
                searchResults.forEach(function (iterator) {
                    // Model
                                    itemModel = {
                                    title: searchResults[i].fields.item_name,
                                    brand: searchResults[i].fields.brand_name,
                                    calories: searchResults[i].fields.nf_calories,
                                    fat: searchResults[i].fields.nf_total_fat,
                                    id: i
                                };
                                $('#health-tracker').append('<div>' + itemModel.title + '</div>');
                    foodArray.push(itemModel);
                    i++;
                });
        });
};


