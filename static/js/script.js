
$('.js-test').click(function(){
	alert('hello this is actually working yay');
});

$('.img').on('click', function() {
	const parentDiv = $(this).closest('.image'); // Get the closest parent with class "image"
	parentDiv.find('.img-old, .img-new').toggleClass('hidden'); // Toggle the "hidden" class
});


$('.js-fit').on('click', function() {
	$(this).siblings('.img').each(function() {
		const currentBgSize = $(this).css('background-size');
		$(this).css('background-size', currentBgSize === 'contain' ? 'auto' : 'contain');
		$(this).css('background-position', '');
	});
});

$(document).ready(function() {
	// The JSON object holding Xpos and Ypos values
	const positionData = {
		"1940-66-a4": {
		  "Name": "A4 and Hammersmith College",
		  "Xpos": 634,
		  "Ypos": 188
		},
		"1940-66-broadway": {
		  "Name": "Hammersmith Broadway",
		  "Xpos": 55,
		  "Ypos": 131
		},
		"1940-66-charingx": {
		  "Name": "Charing Cross Hospital construction",
		  "Xpos": 343,
		  "Ypos": 643
		},
		"1940-66-fieldroad": {
		  "Name": "Field Road estate",
		  "Xpos": 764,
		  "Ypos": 666
		},
		"1940-66-lillierec": {
		  "Name": "Lillie Rec bandstand",
		  "Xpos": 575,
		  "Ypos": 1174
		},
		"1940-66-cemetery": {
		  "Name": "Fulham Cemetery trees",
		  "Xpos": 639,
		  "Ypos": 1444
		},
		"1940-66-clematlee": {
		  "Name": "Empress State Building",
		  "Xpos": 1270,
		  "Ypos": 884
		},
		"1940-66-empress": {
		  "Name": "Empress State Building",
		  "Xpos": 1665,
		  "Ypos": 595
		},
		"1940-66-fulhamestate": {
		  "Name": "Fulham Estate",
		  "Xpos": 1551,
		  "Ypos": 1444
		}
	  }
	  
  
	// On button click
	$('.link').on('click', function() {
		const parentSectionId = $(this).closest('section').attr('id'); 
		const buttonId = $(this).attr('id');  // Get the button's ID
		const position = positionData[buttonId];  // Get the corresponding position data from JSON
  
	  // If position data exists for the button clicked
	  if (position) {
		// Get the parent .image element
		const parentImage = $(this).closest('section').find('.image');
		const offset = 200;

		const negXpos = -position.Xpos + (parentImage.width() / 2) - offset;  // Add half width of parent .image, minus 100px
		const negYpos = -position.Ypos + (parentImage.height() / 2) - offset; // Add half height of parent .image, minus 100px
  
		// Update the background-position CSS property for both img elements
		$('#' + parentSectionId).find('.img').css({
            'background-position': negXpos + 'px ' + negYpos + 'px',
            'background-size': 'auto'
        });
	  }
	});
  });
  