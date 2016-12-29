(function(){

	angular.module('solution2',[])
	.controller('toBuyCtr',toBuyCtr)
	.controller('boughtCtr',boughtCtr)
	.service('shoppingService', shoppingService);

	toBuyCtr.$inject = ["shoppingService"];
	function toBuyCtr (shoppingService)
	{
		var toBuy = this;

		toBuy.itemsList = [
			{name:"cookies" , quantity : 10},
			{name:"coffee" , quantity : 2},
			{name:"cookies" , quantity : 5},
			{name:"tea" , quantity : 4},
			{name:"cookies" , quantity : 10}
		];

		toBuy.checkItem = function(index) {

			shoppingService.BoughtItem(toBuy.itemsList[index]);
			toBuy.itemsList.splice(index,1);
		}

		toBuy.empty =  function(){

			return (toBuy.itemsList.length <= 0) ? true : false;
		}
	}

	boughtCtr.$inject = ["shoppingService"];
	function boughtCtr (shoppingService)
	{
		var bought = this;
		bought.itemsList = shoppingService.getBoughtList();
		
		bought.empty =  function(){

			return (bought.itemsList.length <= 0) ? true : false;
		}
	}

	function shoppingService()
	{
		var service 	= this;
		var boughtList 	= [];

		service.BoughtItem = function(item)
		{
			boughtList.push(item);
		} 

		service.getBoughtList = function()
		{
			return boughtList;
		}
	}



})();
