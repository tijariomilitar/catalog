Product.view.catalog = {};

Product.view.catalog.filter = async (products, pagination) => {
	var html = "";
	for (let i = pagination.page * pagination.pageSize; i < products.length && i < (pagination.page + 1) * pagination.pageSize; i++){
		html += `<div class="box three ground padding-10 margin-top-10 pointer shadow-hover" onclick="window.location.href='/product/show/`+products[i].code+`'">`;
		html += "<div class='container'>";
		if(products[i].image){
			html += "<div class='box one'><img class='image-card' src='"+products[i].image+"' alt=''/></div>";
		} else {
			html += "<div class='box one'><img class='image-card' src='/images/product/no-product.png' alt=''/></div>";
		};
		html += `<div class="box one avant-garde center em10 padding-10 bold" style="color:#323232;">`+products[i].name+` - `+products[i].color+`</div>`;
		html += "<div class='box one em15 center italic bold' style='color:#467846;'>R$"+products[i].price.toFixed(2)+"</div>"
		html += "</div>";
		html += "</div>";
	};

	document.getElementById("product-catalog-filter-box").style.visibility = "visible";
	document.getElementById("product-catalog-container").innerHTML = html;
};

Product.view.catalog.card = {
	image: {
		show: (images, pagination, params) => {
			let html = "";
		    if(images.length){
			    for (let i = pagination.page * pagination.pageSize; i < images.length && i < (pagination.page + 1) * pagination.pageSize;i++){
					document.getElementById("product-"+images[i].product_id+"-catalog-card-img").src = images[i].url;
				};
		    } else {
				document.getElementById("product-"+params[0]+"-catalog-card-img").src = "/images/product/no-product.png";
		    };
		}
	}
};