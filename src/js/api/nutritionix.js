



var GetJsonData = function (keyWord, keyWord2) {
        var KEY = "b9914a3ffda1ac8218e155c05cb52409";
        this.keyWord = keyWord;
        this.keyWord2 = keyWord2;
        var APPID = "ffa2c4b5"
        var searchResults;
        var API_STR_PREFIX = "https://api.nutritionix.com/v1_1/search/" + keyWord2 + "%20";
        var API_STR_MID = "?fields=item_name%2Citem_id%2Cbrand_name" +
                                         "%2Cnf_calories%2Cnf_total_fat&appId=";
        var API_STR_KEY = "&appKey=";
        var API = API_STR_PREFIX +
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
                alert(searchResults[8].fields.item_name + " Calories: " + searchResults[8].fields.nf_calories);
        });
};
new GetJsonData("cod", "fish");