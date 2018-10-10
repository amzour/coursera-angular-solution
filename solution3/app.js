/* global angular */
(function(){

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService',MenuSearchService)
    .directive('foundItems',foundItemsDirective)
    .constant('API_URL', "https://davids-restaurant.herokuapp.com/menu_items.json");
    
    
    NarrowItDownController.$inject = ["MenuSearchService"];
    function NarrowItDownController(MenuSearchService)
    {
        var ctr         = this;
        ctr.found       = [];
        ctr.searchTerm  = "";
        ctr.getItems    = function(){
            if(!ctr.searchTerm)
                return;
            
            var promise = MenuSearchService.getMatchedMenuItems(ctr.searchTerm);
            promise.then(function(found){
                console.log(found);
                ctr.found = found;
            });
        }
        
        ctr.removeItem = function(index)
        {
            ctr.found.splice(index,1);
        }
        
    }
    
    MenuSearchService.$inject = ["$http","API_URL"];
    function MenuSearchService($http,API_URL)
    {
        var service = this;
        
        service.getMatchedMenuItems = function(searchTerm){
            return $http({
                method: 'Get',
                url: API_URL
            })
            .then(function(result){
               var foundItems   = result.data.menu_items;
               var match        = foundItems.filter(function(item){
                  return item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1;
                })
                
                return match;
            });
        }
        
    }
    
    function foundItemsDirective()
    {
        var ddo = {
            
            templateUrl: "foundItems.html",
            scope: {
                items : '<',
                onRemove : '&'
            }
            
        };
        
        return ddo;
    }
    
})();