
var blogWidth = 800;

var headerHeight = 300;
var navBarHeight = 32;

$(function() {
	$("#header").css('background-image', 'url("assets/gameheader.png")');

	$("#navBar").hide();

	$(window).resize(repositionings);

	repositionings();

	getBlogCategories(blogWidth);
});

function repositionings() {
	var header = $("#header");

	header.width(blogWidth);
	header.height(headerHeight);
	
	$("#navBarBG").css('width', blogWidth);
	$("#navBarBG").css('height', navBarHeight-1);

	$("#navBar").css('height', navBarHeight);

	var headerOffset = header.offset();

	var navBarLeft = headerOffset.left;
	var navBarTop = headerHeight-navBarHeight-1;

	$("#navBarBG").offset({ top: navBarLeft, top: navBarTop});
	$("#navBar").offset({ top: navBarLeft, top: navBarTop});

}

function getBlogCategories(blogWidth) {
	$.post(
		"php/blogEngine.php",
		{
			action: "getCategories"
		},
		function(data) {
			console.log(data);

			jsonData = jQuery.parseJSON(data);

			var cats = [];

			$("#navBar").css('width', blogWidth);

			var itemWidth = parseInt(blogWidth/jsonData.length);

			console.log(itemWidth);

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
    			$(this).parent().css('height', navBarHeight);

    			console.log(bgImages[$(this).text()]);

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

			$("#navBarBG").fadeTo( 1250, 0.2 );
    		$("#navBar").show(1000);
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