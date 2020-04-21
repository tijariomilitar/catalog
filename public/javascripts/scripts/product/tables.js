function renderProductCatalog(products, pageSize, page, location){
	var html = "";
	for (i in products){
		html += "<div class='box-4'>";
			html += "<div id='product-"+products[i].id+"-image-div' class='box'>";
				// html += "<div class='box' id='product-"+products[i].id+"-image-div'>";
				html += "<div class='image' style='height:180px' onclick='window.location=`/product/id/"+products[i].id+"`' id='product-"+products[i].id+"-image-show'></div>";
				html += "<br>";
				html += "<span class='impact'>"+products[i].name+" "+products[i].size+" | "+products[i].color+"</span>";
					html += "<br>";
					html += "<br>";
					if(products[i].images.length){
						html += "<button id='product"+products[i].id+"imagePrevious' class='btn-pagination' style='float:left;margin-left:15px' autocomplete='off' disabled>&lsaquo;&lsaquo;</button>";
						html += "<span class='impact' id='product"+products[i].id+"imagePageNumber'></span>";
						html += "<button id='product"+products[i].id+"imageNext' class='btn-pagination' style='float:right;margin-right:15px' autocomplete='off' disabled>&rsaquo;&rsaquo;</button>";
					};
				// html += "</div>";
			html += "</div>";
		html += "</div>";
	};

	document.getElementById("product-catalog").innerHTML = html;

	for(i in products){
		if(products[i].images.length){
			productImagePagination(products[i].images);
		} else {
			document.getElementById("product-"+products[i].id+"-image-show").innerHTML = "<br><br><br><br><br>SEM IMAGENS<br><br><br><br><br>";
			document.getElementById("product-"+products[i].id+"-image-div").style.height = "91%";
			// document.getElementById("product"+products[i].id+"imagePageNumber").innerHTML = "0";
			// document.getElementById("product"+products[i].id+"imagePrevious").disabled = true;
			// document.getElementById("product"+products[i].id+"imageNext").disabled = true;
		};
	};
};

function renderEmptyProductCatalog(location){
	document.getElementById("product-catalog").innerHTML = "<div class='box-1'>Sua busca não retornou resultados</div>";
};

function fillProductSelect(products, select){
	select.innerHTML = "";
	for(i in products){
		select.innerHTML += "<option value='"+products[i].id+"'>"+products[i].code+" | "+products[i].name+" | "+products[i].color+" | "+products[i].size+"</option>"
	};
};

function renderKartProducts(location, products, pageSize, page){
	var html = '';
	products.forEach((product) => {
		html += '<option value="'+product.code+'">#'+ product.code +' | '+ product.name +' | '+ product.size +' | '+ product.color +'</option>';
	});
	document.getElementById('kart-product-code').innerHTML = html;
};

function renderCashierKartProducts(location, products, pageSize, page){
	var html = '';
	products.forEach((product) => {
		html += '<option value="'+product.code+'">#'+ product.code +' | '+ product.name +' | '+ product.size +' | '+ product.color +'</option>';
	});
	document.getElementById('kart-product-code').innerHTML = html;
};