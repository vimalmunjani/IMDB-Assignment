let accessToken;
let option;
let titleORid;
let year;
let queryUrl;

$(document).ready(() => {
	
	$('#search').click(() => {

		$('#movie-error').css("display", "none");
		getValue();
		validateValues();
		constructUrl();
		getMovieDetails();
	});
});

let getValue = () => {

	accessToken = $('#accessToken').val()
	option = $("input[name='radio']:checked").val()
	titleORid = $('#titleORid').val()
	year = $('#year').val()
}

let validateValues = () => {

	if (accessToken == "" || accessToken == null) {
		alert("Enter Token");
	} else if (titleORid == "" || titleORid == null) {
		alert("Enter Title Or ID");
	} else {

	}

}

let constructUrl = () => {

	if (option == "title") {
		queryUrl = `http://www.omdbapi.com/?t=${titleORid}`;
	} else {
		queryUrl = `http://www.omdbapi.com/?i=${titleORid}`;
	}
	if (year != "") {
		queryUrl += `&y=${year}`;
	}

	queryUrl += `&apikey=${accessToken}`
	console.log(queryUrl);
}

let getMovieDetails = () => {

	$.ajax({
		type: 'GET',
		dataType: 'json',
		async: true,
		url: queryUrl,
		beforeSend: () => {

			$("#loading").show();

		},
		complete: () => {

			$("#loading").hide();

		},

		success: (response) => {

			if (response.Response == "True") {
				displayValues(response);
			} else {
				displayError(response);
			}
			console.log(response);

		},
		error: (err) => {

			console.log(err.responseJSON.error.message);
			alert(err.responseJSON.error.message)

		}

	}); // end ajax call 
}

let displayValues = (response) => {

	$('.movie-card ').css("visibility", "visible");

	if (response.Poster) {
		if (response.Poster == "N/A" || response.Poster == null) {
			$('.movie-poster').html(`<img id="movie-image" src="movie-placeholder.gif">`);
		} else {
			$('.movie-poster').html(`<img id="movie-image" src="${response.Poster}">`);
		}
	} else {
		$('.movie-poster').html(`<img id="movie-image" src="movie-placeholder.gif">`);
	}

	$('#movie-title').text(response.Title);
	$('#movie-year').text(response.Year);
	$('#movie-plot').text(response.Plot);
	$('#movie-genre').html(`<heading>Genre :&nbsp;</heading>` + response.Genre);
	$('#movie-actors').html(`<heading>Actors :&nbsp;</heading>` + response.Actors);
	$('#movie-directors').html(`<heading>Director :&nbsp;</heading>` + response.Director);
	$('#movie-writers').html(`<heading>Writer :&nbsp;</heading>` + response.Writer);
	$('#movie-languages').html(`<heading>Language :&nbsp;</heading>` + response.Language);
	$('#movie-awards').html(`<heading>Awards :&nbsp;</heading>` + response.Awards);
	$('#imdb-rating').html(`<heading>IMDB Rating :&nbsp;</heading>` + response.imdbRating);
	$('#imdb-votes').html(`<heading>IMDB Votes :&nbsp;</heading>` + response.imdbVotes);
	$('#imdb-id').html(`<heading>IMDB ID :&nbsp;</heading>` + response.imdbID);
	$('#box-office').html(`<heading>BoxOffice :&nbsp;</heading>` + response.BoxOffice);
	$('#prod').html(`<heading>Production :&nbsp;</heading>` + response.Production);
	$('#website').html(`<heading>Website :&nbsp;</heading><a href="${response.Website}">${response.Website}</a>`);
	console.log("website");
	console.log(`<heading>Website :&nbsp;</heading><a href="${response.Website}">${response.Website}</a>`);
	$('#dvd').html(`<heading>DVD :&nbsp;</heading>` + response.DVD);
	$('#type').html(`<heading>Type :&nbsp;</heading>` + response.Type);

	let ratings = ``;
	console.log("RATINGS RESULT")

	for (let rating of response.Ratings) {
		console.log(rating);
		ratings += `<p id="movie-rating-1"><heading>Source :&nbsp;</heading>${rating.Source} - ${rating.Value}</p>`

	}
	console.log(ratings);
	$('.ratings').html(ratings);

	$('#rated').html(`<heading>Rated :&nbsp;</heading>` + response.Rated);
	$('#released').html(`<heading>Released :&nbsp;</heading>` + response.Released);
	$('#runtime').html(`<heading>Runtime :&nbsp;</heading>` + response.Runtime);
	$('#country').html(`<heading>Country :&nbsp;</heading>` + response.Country);
	
}

let displayError = (response) => {

	$('#movie-error').css("display", "inherit");
	$('#movie-error').text(response.Error);
	$('.movie-card ').css("visibility", "hidden");

}