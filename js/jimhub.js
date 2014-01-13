
var blogWidth = 800;

var headerHeight = 300;
var navBarHeight = 32;

var navBarLoaded = false;
var numDots = 0;

var loadingInterval;

var subCats = [];

var curCat = '';

var subCatsBarHeight = 18;
var subCatsBarWidth = 100;

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
	
	$("#subCatsBar").offset({top: 0});
	$("#subCatsBarSelector").offset({top: -2});
	$("#subCatsBarSelector").width(subCatsBarWidth);
	$("#subCatsBarSelector").height(1);

	$("#subCatsBarSelector").hide();
	$("#subCatsContainer").hide();
	

	$("#content").height(32);
	$("#content").offset(
		{ top: $("#contentContainer").height()/2 - 8}
		);
	$("#content").text("loading");
	
	loadingInterval = setInterval(loadingAnim, 250);
	
	$(window).resize(repositionings);

	getBlogCategories(blogWidth);
	
	repositionings();

	
});

function repositionings() {
	var header = $("#header");

	header.width(header.parent().width());
	header.height(headerHeight);

	$("#contentContainer").width(blogWidth);

	//matchElementDimensions($("#contentBG"), $("#contentContainer"));
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
				if(cat.link[0] == '#') {
					cats.push('<li><a class="navBarItem" href="" onclick="return navBarClick(\''+cat.link.substr(1, cat.link.length-1)+'\', \''+cat.displayName+'\', '+(itemWidth*i)+');">' + cat.displayName + '</a></li>');
				}
				else {
					cats.push('<li><a class="navBarItem" href="'+cat.link+'" target="_blank">' + cat.displayName + '</a></li>');
				}

				bgImages[cat.displayName] = cat.bgImg;
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

			$("#navBarSelector").offset({left: blogWidth - itemWidth});

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
	hideSubCats();

	$.post(
		"php/blogEngine.php",
		{
			action: "getSubs",
			filterID: catID
		},
		function(data) {
			jsonData = jQuery.parseJSON(data);

			subCats = jsonData;


			if(subCats.length > 0) {
				var catsHtml = [];

				$("#subCatsBar").empty();

				$.each(subCats, function(i, cat) {
						catsHtml.push('<li><a class="subCatsBarItem" href="" onclick="return displaySubCatBlogs(\''+cat.filterID+'\', '+(i*subCatsBarWidth)+');">' + cat.displayName + '</a></li>');
					}
				);

				$("#subCatsBar").append(catsHtml.join(''));

				showSubCats();
			}
		}
	)
	.error(
		postError
	);
}

function showSubCats() {
	$("#subCatsContainer").slideDown(200);
}

function hideSubCats() {
	$("#subCatsBarSelector").css({left: blogWidth-subCatsBarWidth});
	$("#subCatsBarSelector").hide();
	$("#subCatsContainer").slideUp(200);
}

function displaySubCatBlogs(cat, itemX) {

	$("#subCatsBarSelector").show();
	$("#subCatsBarSelector").animate({
		left: itemX
	}, 300);

	return false;
}

function navBarClick(cat, catName, itemX) {

	curCat = catName;

	$("#navBarSelector").show();
	$("#navBarSelector").animate({
		left: itemX
	}, 300);

	loadSubCats(cat);

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
	
	$("#content").text(dotString+"loading"+dotString);
	
	numDots = (numDots+1) % 4;
}