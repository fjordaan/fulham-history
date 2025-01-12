
$('.js-test').click(function(){
	alert('hello this is actually working yay');
});

$('.image').click(function() {
	$(this).find('.img').toggleClass('hidden'); // Toggle the "hidden" class
});

$('.js-fit').on('click', function() {
	event.stopPropagation(); // Prevent the click from propagating to the .image element
	parentSectionId = $(this).closest('section').attr('id'); 
	console.log(parentSectionId);
	$('#' + parentSectionId).find('.image').addClass('fit');
	$('#' + parentSectionId).find('.image').removeClass('zoom');
	$('#' + parentSectionId).find('.img').css('background-position', '');
});

$(document).ready(function() {
	// The JSON object holding Xpos and Ypos values
	const positionData = {
		"1940-66-a4": {
		  "Name": "A4 and Hammersmith College",
		  "Xpos": 634,
		  "Ypos": 188,
		  "Radius": 455
		},
		"1940-66-broadway": {
		  "Name": "Hammersmith Broadway",
		  "Xpos": 55,
		  "Ypos": 131,
		  "Radius": 266
		},
		"1940-66-charingx": {
		  "Name": "Charing Cross Hospital construction",
		  "Xpos": 343,
		  "Ypos": 643,
		  "Radius": 346
		},
		"1940-66-fieldroad": {
		  "Name": "Field Road estate",
		  "Xpos": 764,
		  "Ypos": 666,
		  "Radius": 233
		},
		"1940-66-lillierec": {
		  "Name": "Lillie Rec bandstand",
		  "Xpos": 575,
		  "Ypos": 1174,
		  "Radius": 270
		},
		"1940-66-cemetery": {
		  "Name": "Fulham Cemetery trees",
		  "Xpos": 639,
		  "Ypos": 1444,
		  "Radius": 275
		},
		"1940-66-clematlee": {
		  "Name": "Clem Atlee estate",
		  "Xpos": 1270,
		  "Ypos": 884,
		  "Radius": 455
		},
		"1940-66-empress": {
		  "Name": "Empress State Building",
		  "Xpos": 1665,
		  "Ypos": 595,
		  "Radius": 346
		},
		"1940-66-fulhamestate": {
		  "Name": "Fulham Estate",
		  "Xpos": 1551,
		  "Ypos": 1444,
		  "Radius": 346
		},
		"1966-81-margravine": {
			"Name": "Elm trees Margravine",
			"Xpos": 641,
			"Ypos": 0,
			"Radius": 131
		},
		"1966-81-fulhamcem": {
			"Name": "Elm trees Fulham Cem",
			"Xpos": 715,
			"Ypos": 919,
			"Radius": 183
		},
		"1966-81-bayonne": {
			"Name": "Bayonne Estate, Abbey Gardens",
			"Xpos": 699,
			"Ypos": 306,
			"Radius": 455
		},
		"1966-81-aintree": {
			"Name": "Aintree Estate, Hartopp & Lannoy towers",
			"Xpos": 1154,
			"Ypos": 761,
			"Radius": 227
		},
		"1966-81-riverside": {
			"Name": "Riverside estates, Rowberry Mead",
			"Xpos": 167,
			"Ypos": 1026,
			"Radius": 368
		},
		"1966-81-crabtree": {
			"Name": "Crabtree pub, barges",
			"Xpos": 135,
			"Ypos": 709,
			"Radius": 216
		},
		"1966-81-frankbanfield": {
			"Name": "Frank Banfield park",
			"Xpos": 98,
			"Ypos": 0,
			"Radius": 266
		},
		"1966-81-charingx": {
			"Name": "Charing Cross hospital",
			"Xpos": 351,
			"Ypos": 32,
			"Radius": 410
		},
		"1966-81-rivergardens": {
			"Name": "River Gardens",
			"Xpos": 259,
			"Ypos": 1437,
			"Radius": 184
		}
	  }
	  
	// On feature click
	$('.feature').on('click', function() {
		if ($(this).hasClass('selected')) {
			$(this).removeClass('selected');
			parentSectionId = $(this).closest('section').attr('id'); 
			$('#' + parentSectionId).find('.image').addClass('fit');
			$('#' + parentSectionId).find('.image').removeClass('zoom');
			$('#' + parentSectionId).find('.marker').removeClass('currentmarker');
			$('#' + parentSectionId).find('.marker').css({
				'width': '',
				'height': ''
			});
			$('#' + parentSectionId).find('.img').css('background-position', '');
		} else {
			$(this).addClass('selected');
			$(this).siblings().removeClass('selected');
			const parentSectionId = $(this).closest('section').attr('id'); 
			// const buttonId = $(this).attr('data-id');  // Get the button's ID
			const featureId = $(this).attr('id');  // Get the feature's ID
			const position = positionData[featureId];  // Get the corresponding position data from JSON

			$('html, body').animate({
				scrollTop: $('#testID').offset().top
			  }, 'smooth');
			  
		
			// If position data exists for the button clicked
			if (position) {
				// Get the parent .image element
				const parentImage = $(this).closest('section').find('.image');

				const negXpos = -position.Xpos + (parentImage.width() / 2) - (position.Radius / 2);  // Add half width of parent .image, minus 100px
				const negYpos = -position.Ypos + (parentImage.height() / 2) - (position.Radius / 2); // Add half height of parent .image, minus 100px
		
				// Update the background-position CSS property for both img elements
				$('#' + parentSectionId).find('.image').addClass('zoom');
				$('#' + parentSectionId).find('.image').removeClass('fit');
				$('#' + parentSectionId).find('.img').css({
					'background-position': negXpos + 'px ' + negYpos + 'px'
				});

				// Show this marker
				$('#' + parentSectionId).find('.marker').removeClass('currentmarker');
				$(`.marker-${featureId}`).addClass('currentmarker');
				$(`.marker-${featureId}`).css({
					'width': position.Radius + 'px',
					'height': position.Radius + 'px'
				});
			}
		}
		
	});
  });


  // Highlight marker when mousing over feature description
  $('.feature').on('mouseenter mouseleave', function () {
	// Get the id of the .feature element
	const featureID = $(this).attr('id');
	
	// Toggle the .highlight class on the corresponding .marker element
	$(`.marker.marker-${featureID}`).toggleClass('highlight');
  });

  $('.js-showMarkers').on('click', function () {
	// Find the parent <section> of the clicked element
	const parentSection = $(this).closest('section');
	
	parentSection.find('.marker').each(function () {
	  $(this).toggleClass('show');
	});
  });
  


  