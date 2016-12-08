(function(){

	angular.module('solution1',[])
	.controller('checkCtr',checkCtr);

	checkCtr.$inject = ['$scope'];

	function checkCtr($scope)
	{
		$scope.input = '';
		$scope.msg   = '';
		$scope.textColor   = '';
		$scope.check = function()
		{
			var count = checkValide($scope.input.split(','));				

			if(count > 0)
			{
				if (count <= 3)
					$scope.msg = "Enjoy!";
				else
					$scope.msg = "Too much!";

				$scope.textColor   = "text-green";

			}
			else
			{
				$scope.msg   = 'Please enter data first';
				$scope.textColor   = "text-red";
			}
		}

	}


	/* check if not empty and don't contains only whitespace or ,  */ 
	function checkValide(str)
	{
		var count = 0;
		for (var i = 0; i < str.length; i++) {
			if(str[i] != "" && str[i].trim().length != 0)
				count++;
		}

		return count;
	}

})();
