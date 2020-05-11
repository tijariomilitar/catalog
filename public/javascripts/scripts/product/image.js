function productImagePagination(images){
	let pageSize = 1;
	let page = 0;

	function paging(){
		let htmlImage = "";
	    for (let i = page * pageSize; i < images.length && i < (page + 1) * pageSize;i++){
			htmlImage += "<img class='catalog-image' src="+images[i].url+">";
		};

		document.getElementById("product-"+images[0].product_id+"-image-show").innerHTML = htmlImage;
		
	    $("#product"+images[0].product_id+"imagePageNumber").text("" + (page + 1) + " de " + Math.ceil(images.length / pageSize));
	};

	function saleButtonsPaging(){
	    $("#product"+images[0].product_id+"imageNext").prop("disabled", images.length <= pageSize || page >= images.length / pageSize - 1);
	    $("#product"+images[0].product_id+"imagePrevious").prop("disabled", images.length <= pageSize || page == 0);
	};

	$(() => {
	    $("#product"+images[0].product_id+"imageNext").click(() => {
	        if(page < images.length / pageSize - 1){
	            page++;
	            paging();
	            saleButtonsPaging();
	        };
	    });
	    $("#product"+images[0].product_id+"imagePrevious").click(() => {
	        if(page > 0){
	            page--;
	            paging();
	            saleButtonsPaging();
	        };
	    });
	    paging();
	    saleButtonsPaging();
	});
};