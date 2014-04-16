
var blogWidth = 800;

var headerHeight = 300;
var navBarHeight = 32;

var navBarLoaded = false;
var numDots = 0;

var loadingInterval;

var subCats = [];

var curCat = '';
var curSubCat = '';

var subCatsBarHeight = 22;
var subCatsBarWidth = 100;

var subCatLists = [];
var subCatHTMLCache = [];

$(function() {
	//$("#header").css('background-image', 'url("assets/gameheader.png")');
	
	$("#blogContainer").width(blogWidth);
	
	$("#navBarBG").height(navBarHeight);
	$("#navBar").height(navBarHeight-2);
	
	$("#navBar").offset({top: 0});
	$("#navBarSelector").offset({top: navBarHeight-3});
	$("#navBarSelector").height(1);

	$("#navBarContainer").height(navBarHeight);
	
	$("#navBar").hide();
	$("#navBarSelector").hide();
	$("#navBarContainer").hide();
	
	$("#subCatsContainer").height(subCatsBarHeight);
	$("#subCatsBar").height(subCatsBarHeight);
	$("#subCatsBar").offset({top: 0});

	$("#subCatsBarSelector").offset({top: subCatsBarHeight-2});
	$("#subCatsBarSelector").width(subCatsBarWidth);
	$("#subCatsBarSelector").height(1);
	

	$("#subCatsBarSelector").hide();
	$("#subCatsContainer").hide();

	$("#content").offset({top: 28});

	$("#contentLeft").text("loading");
	$("#contentLeft").offset({top: 50});
	
	loadingInterval = setInterval(loadingAnim, 250);
	
	$(window).resize(repositionings);

	getBlogCategories(blogWidth);
	
	repositionings();
});

function repositionings() {
	var header = $("#header");

	header.width(header.parent().width());
	header.height(headerHeight);

//	$("#contentContainer").width(blogWidth);

	//matchElementDimensions($("#content"), $("#contentBG"));
}

function matchElementDimensions(matcher, matchee) {
	matcher.offset(matchee.offset());
	matcher.width(matchee.width());
	matcher.height(matchee.height());
}

function getBlogCategories(blogWidth) {
	$.post(
		"php/blogEngine.php",
		{
			action: "getCategories"
		},
		function(data) {
			//console.log(data);

			jsonData = jQuery.parseJSON(data);

			var cats = [];

			var itemWidth = parseInt(blogWidth/jsonData.length);

			var bgImages = [];

			$.each(jsonData, function(i, cat) {
				var filterID = cat.link.substr(1, cat.link.length-1);

				if(cat.link[0] == '#') {
					cats.push('<li><a class="navBarItem" href="" onclick="return navBarClick(\''+filterID+'\', \''+cat.displayName+'\', '+(itemWidth*i)+');">' + cat.displayName + '</a></li>');
				}
				else {
					cats.push('<li><a class="navBarItem" href="'+cat.link+'" target="_blank">' + cat.displayName + '</a></li>');
				}

				bgImages[cat.displayName] = cat.bgImg;

				loadSubCats(filterID);
			});

			$("#navBar").append(cats.join(''));

			$("#navBar").find(".navBarItem").each(function() {
    			$(this).css('width', itemWidth);
    			$(this).css('height', navBarHeight);

    			$(this).parent().css('background-image', 'url("'+bgImages[$(this).text()]+'")');
    			$(this).parent().css('background-size', '25%');

    			$(this).hover(
    				function() {
    					$(this).parent().css('background-size', '70%');
    				},
    				function() {
    					$(this).parent().css('background-size', '25%');
    				}
    			);
    		});

			$("#navBarSelector").width(itemWidth);

			$("#navBarSelector").css({left: blogWidth - itemWidth});

			navBarLoaded = true;

			//$("#navBarBG").fadeTo( 1250, 0.3 );
			$("#navBarContainer").slideDown(1000);
    		$("#navBar").slideDown(1000);

		}
	)
	.error(
		postError
	);
}

function loadSubCats(catID) {
	$.post(
		"php/blogEngine.php",
		{
			action: "getSubs",
			filterID: catID
		},
		function(data) {
			jsonData = jQuery.parseJSON(data);

			subCatLists[catID] = jsonData;
		}
	)
	.error(
		postError
	);
}

function showSubCats(catID) {
	if(subCatLists[catID] != null && subCatLists[catID].length > 0) {
		
		$("#subCatsBar").empty();

		if(subCatHTMLCache[catID] == null) {		
			var catsHtml = [];

			$.each(subCatLists[catID], function(i, cat) {
					catsHtml.push('<li><a class="subCatsBarItem" href="" onclick="return displaySubCatBlogs(\''+cat.filterID+'\', '+(i*subCatsBarWidth)+');">' + cat.displayName + '</a></li>');
				}
			);

			subCatHTMLCache[catID] = catsHtml.join('');
		}

		$("#subCatsBar").append(subCatHTMLCache[catID]);

		$("#subCatsBar").find(".subCatsBarItem").each(function() {

			$(this).css('height', navBarHeight);

		});

		$("#subCatsContainer").slideDown(200);
	}
}

function hideSubCats() {
	$("#subCatsBarSelector").css({left: blogWidth-subCatsBarWidth});
	$("#subCatsBarSelector").hide();
	$("#subCatsContainer").slideUp(200);
}

function hideAndShowSubCats(catID) {
	$("#subCatsBarSelector").css({left: blogWidth-subCatsBarWidth});
	$("#subCatsBarSelector").hide();
	$("#subCatsContainer").slideUp(200,
		function() {
			showSubCats(catID)
		}
	);
}

function displaySubCatBlogs(cat, itemX) {

	if(cat == curSubCat) {
		cat = '';
	}

	curSubCat = cat;

	var subCatSel = $("#subCatsBarSelector");

	if(cat == '') {
		

		subCatSel.css({left: blogWidth - subCatSel.width()});
		subCatSel.hide();
	}
	else {
		subCatSel.show();
		subCatSel.animate({
			left: itemX
		}, 300);
	}
	

	return false;
}

function navBarClick(cat, catName, itemX) {

	curSubCat = '';

	if(curCat == catName) {
		catName = '';
	}

	curCat = catName;

	if(catName == '') {
		var navBarSel = $("#navBarSelector");

		navBarSel.css({left: blogWidth - navBarSel.width()});
		navBarSel.hide();

		hideSubCats();
	}
	else {
		$("#navBarSelector").show();
		$("#navBarSelector").animate({
			left: itemX
		}, 300);

		hideAndShowSubCats(cat);
	}

	//clearInterval(loadingInterval);
	var content = $("#content");
	//content.html("");
	
	return false;
}

function postBlogEntry(_userID, _cat, _contents) {
	$.post("php/blogEngine.php",
	{
		action: "postBlog",
		userID: _userID,
		cat: _cat,
		contents: _contents
	})
	.success(
		function(data) {
			console.log(data);
		}
	)
	.error(
		postError
	);
}

function postError(data) {
	console.log("Error: "+data);

	//document.write(data.responseText);
}

function loadingAnim() {
	
	var dotString = "";
	
	for(var i=0; i < numDots; i++)
		dotString += ".";
	
	$("#contentLeft").text(dotString+"loading"+dotString);
	
	numDots = (numDots+1) % 4;
}