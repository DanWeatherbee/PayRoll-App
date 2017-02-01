          var results;
          $.getJSON("https://api.nutritionix.com/v1_1/search/cheddar%20cheese?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=ffa2c4b5&appKey=b9914a3ffda1ac8218e155c05cb52409", function(data) {
                results = data.hits;
                console.log(results[0].fields.item_name);
          });