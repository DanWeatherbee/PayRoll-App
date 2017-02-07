// Mutables
var keyWord;
var searchResults;
var totalHits;
var apiQuery;
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

GetJsonData = function(keyWord) {
        "use strict";
        $('#search-result').html("");
        KEY = "b9914a3ffda1ac8218e155c05cb52409";
        this.keyWord = keyWord;
        APPID = "ffa2c4b5";
        API_STR_PREFIX = "https://api.nutritionix.com/v1_1/search/" + keyWord + "%20";
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
                var tracker = $('#search-result');
                var i = 0;

                // Clear or refresh the array so it does'nt keep growing.
                foodArray = [];

                searchResults.forEach(function (iterator) {
                    // Model
                    itemModel = {
                    title: searchResults[i].fields.item_name,
                    brand: searchResults[i].fields.brand_name,
                    calories: searchResults[i].fields.nf_calories,
                    fat: searchResults[i].fields.nf_total_fat,
                    id: i
                    };
                    $('#search-result').append('<button class="items-bt"><p>Item: ' +
                        itemModel.title + '</p><p>Brand: ' +
                        itemModel.brand + '</p><p>Calories: ' +
                        itemModel.calories + '</p><p>Fat: ' +
                        itemModel.fat + '</p><p>Id: ' +
                        itemModel.id +
                        '</p></button>');

                    foodArray.push(itemModel);
                    i++;
                });
        });
};


