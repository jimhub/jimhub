
var blogWidth = 800;

var headerHeight = 300;
var navBarHeight = 32;

$(function() {
	//$("#header").css('background-image', 'url("assets/gameheader.png")');

	$("#navBarBG").hide();
	$("#navBar").hide();

	$(window).resize(repositionings);

	

	getBlogCategories(blogWidth);
	
	repositionings();
});

function repositionings() {
	var header = $("#header");

	header.width(blogWidth);
	header.height(headerHeight);

	$("#navBarBG").css('width', blogWidth);
	$("#navBarBG").css('height', navBarHeight+1);

	$("#navBar").css('height', navBarHeight);

	var headerOffset = header.offset();

	var navBarLeft = headerOffset.left;
	var navBarTop = headerHeight;

	$("#navBarBG").offset({ left: navBarLeft, top: navBarTop});
	$("#navBar").offset({ left: navBarLeft, top: navBarTop});

	var contentTop = navBarTop + 40;

	$("#contentBG").offset({ left: navBarLeft, top: contentTop});
	$("#contentBG").width(blogWidth);
	$("#contentBG").height($(window).height() - contentTop);

	//matchElementDimensions($("#contentBG"), $("#content"));
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

			$("#navBar").css('width', blogWidth);

			var itemWidth = parseInt(blogWidth/jsonData.length);

			var bgImages = [];

			$.each(jsonData, function(i, cat) {
				if(cat.link[0] == '#') {
					cats.push('<li><a class="navBarItem" href="" onclick="return displayCategory(\''+cat.link+'\');">' + cat.displayName + '</a></li>');
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
    			$(this).parent().css('height', navBarHeight);

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

			//$("#navBarBG").fadeTo( 1250, 0.3 );
			$("#navBarBG").slideDown(1000);
    		$("#navBar").slideDown(1000);

    		repositionings();
		}
	)
	.error(
		postError
	);
}

function displayCategory(cat) {



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