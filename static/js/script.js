
// Preload all the images
function preloadImages(imageUrls) {
    imageUrls.forEach(url => {
        const img = new Image();
		img.onload = () => console.log(`Image loaded successfully: ${url}`);
        img.onerror = () => console.error(`Error loading image: ${url}`);
        img.src = url;
    });
    console.log('Images preloaded:', imageUrls);
}
// Specify the images to preload
preloadImages([
    'img/1940.jpg',
    'img/1966.jpg',
    'img/1966b.jpg',
    'img/1981.jpg'
]);
 
//  https://css-tricks.com/how-to-detect-when-a-sticky-element-gets-pinned/
// With ChatGPT improvements that accounts for the height of .section-header changing
// (It adds a delay). Also to work on multiple .section-headers. Also to only
// fire when stuck to the top of the screen.


// document.addEventListener("DOMContentLoaded", () => {
// 	const sectionHeaders = document.querySelectorAll(".section-header");
  
// 	if (sectionHeaders.length === 0) return;
  
// 	sectionHeaders.forEach((header) => {
// 	  let isPinned = false;
// 	  let timeout;
  
// 	  const observer = new IntersectionObserver(
// 		([entry]) => {
// 		  clearTimeout(timeout); // Reset debounce timer
  
// 		  timeout = setTimeout(() => {
// 			const rect = header.getBoundingClientRect();
// 			const shouldPin = entry.intersectionRatio < 1 && rect.top <= 0; 
  
// 			if (shouldPin !== isPinned) {
// 			  isPinned = shouldPin;
// 			  header.classList.toggle("is-pinned", shouldPin);
// 			}
// 		  }, 100); // Adjust debounce delay if needed
// 		},
// 		{ threshold: [1] }
// 	  );
  
// 	  observer.observe(header);
// 	});
//   });
  
  


$('.js-test').click(function(){
	alert('hello this is actually working yay');
});

$('.image').click(function() {
	$(this).find('.img:not(.img-overlay)').toggleClass('hidden'); // Toggle the "hidden" class
});

$('.js-fit').on('click', function() {
	event.stopPropagation(); // Prevent the click from propagating to the .image element
	parentSectionId = $(this).closest('section').attr('id'); 
	$('#' + parentSectionId).addClass('map-fit');
	$('#' + parentSectionId).removeClass('map-zoomed');
	$('#' + parentSectionId).find('.currentmarker').css({
		'width': '',
		'height': ''
	});
	$('#' + parentSectionId).find('.marker').removeClass('currentmarker');
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
			$('#' + parentSectionId).addClass('map-fit');
			$('#' + parentSectionId).removeClass('map-zoomed');
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
			$('#' + parentSectionId).removeClass('markers-shown');
			// const buttonId = $(this).attr('data-id');  // Get the button's ID
			const featureId = $(this).attr('id');  // Get the feature's ID
			const position = positionData[featureId];  // Get the corresponding position data from JSON

			if (window.matchMedia("(max-width: 1024px)").matches) {
				// Only scroll to top (to show image) on mobile
				$('html, body').animate({
					scrollTop: $(`#${parentSectionId}`).offset().top
				  }, 'smooth');
				  
				  history.pushState(null, '', `#${parentSectionId}`);
			}		  
		
			// If position data exists for the button clicked
			if (position) {
				// Get the parent .image element
				const parentImage = $(this).closest('section').find('.image');

				const negXpos = -position.Xpos + (parentImage.width() / 2) - (position.Radius / 2);  // Add half width of parent .image, minus 100px
				const negYpos = -position.Ypos + (parentImage.height() / 2) - (position.Radius / 2); // Add half height of parent .image, minus 100px
		
				// Update the background-position CSS property for both img elements
				$('#' + parentSectionId).addClass('map-zoomed');
				$('#' + parentSectionId).removeClass('map-fit');
				$('#' + parentSectionId).find('.img').css({
					'background-position': negXpos + 'px ' + negYpos + 'px'
				});

				// Show this marker and restore any previously zoomed markers
				$('#' + parentSectionId).find('.currentmarker').css({
					'width': '',
					'height': ''
				});
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

//   $('.js-overlay').hover(
// 	function() {
// 	  // On mouse enter
// 	  $(this).closest('section').find('.img-overlay').toggleClass('hidden');
// 	},
// 	function() {
// 	  // On mouse leave
// 	  $(this).closest('section').find('.img-overlay').toggleClass('hidden');
// 	}
//   );

$('.js-bombs1944-66').on('change', function(event) {
	// Prevent the click event from bubbling up to the parent div
	event.stopPropagation();
  
	// Toggle the .img-special class based on whether the checkbox is checked or not
	$(this).closest('section').find('.img-bombs1944-66').toggleClass('hidden');
  });
  $('.js-bombs1966-81').on('change', function(event) {
	// Prevent the click event from bubbling up to the parent div
	event.stopPropagation();
  
	// Toggle the .img-special class based on whether the checkbox is checked or not
	$(this).closest('section').find('.img-bombs1966-81').toggleClass('hidden');
  });
  $('.js-os194473').on('change', function(event) {
	// Prevent the click event from bubbling up to the parent div
	event.stopPropagation();
  
	// Toggle the .img-special class based on whether the checkbox is checked or not
	$(this).closest('section').find('.img-os194473').toggleClass('hidden');
  });  

 // Scroll to the relevant section when the marker is clicked 
 $('.marker a').on('click', function(event) {
    event.preventDefault();
    const targetId = $(this).attr('href'); // Get the href value (e.g., #section-id)
    
    // Scroll to the target position minus 130px
    $('html, body').animate({
        scrollTop: $(targetId).offset().top - 130
    }, 'smooth');
    
    // Update the URL and browser history
    history.pushState(null, '', targetId);
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
	parentSectionId = $(this).closest('section').attr('id'); 
	$('#' + parentSectionId).toggleClass('markers-shown');
	
	// parentSection.find('.marker').each(function () {
	//   $(this).toggleClass('show');
	// });
  });
  

// CLICK AND DRAG TO MOVE MAP

// let isDragging = false;
// let lastX = 0;
// let lastY = 0;
// let dragThreshold = 5;  // Threshold for detecting a drag (in pixels)
// let dragSpeedFactor = 5;  // Adjust this factor to control the speed of the drag (higher = faster)

// // mousedown on .image
// $('.map-zoomed .image').on('mousedown', function(event) {
//   // Prevent default click behavior
//   event.preventDefault();

//   // Set dragging state to false initially
//   isDragging = false;

//   // Capture initial mouse position
//   lastX = event.pageX;
//   lastY = event.pageY;

//   // Disable the parent div click event during dragging
//   $(this).on('click', function(e) {
//     if (isDragging) {
//       // Stop click event if dragging is true (don't trigger click event)
//       e.stopImmediatePropagation();
//     }
//   });

//   // Set up the drag event on mousemove
//   $(document).on('mousemove', function(event) {
//     // Calculate the distance moved
//     let deltaX = Math.abs(event.pageX - lastX);
//     let deltaY = Math.abs(event.pageY - lastY);

//     // Check if the mouse has moved beyond the threshold (i.e., user is dragging)
//     if (deltaX > dragThreshold || deltaY > dragThreshold) {
//       isDragging = true;
//     }

//     // If dragging, update the background position of all .img divs
//     if (isDragging) {
//       let deltaXMove = (event.pageX - lastX) * dragSpeedFactor;  // Multiply by speed factor
//       let deltaYMove = (event.pageY - lastY) * dragSpeedFactor;  // Multiply by speed factor

//       // Update background position of all .img divs inside the .image container
//       $('.image .img').each(function() {
//         let currentPosition = $(this).css('background-position').split(' ');
//         let currentX = parseInt(currentPosition[0], 10);
//         let currentY = parseInt(currentPosition[1], 10);

//         $(this).css('background-position', (currentX + deltaXMove) + 'px ' + (currentY + deltaYMove) + 'px');
//       });

//       // Update the last mouse position for the next move
//       lastX = event.pageX;
//       lastY = event.pageY;
//     }
//   });

//   // When mouse button is released, stop dragging
//   $(document).on('mouseup', function() {
//     // Stop the drag behavior
//     if (isDragging) {
//       isDragging = false;
//     }

//     // Remove the mousemove and mouseup listeners
//     $(document).off('mousemove');
//     $(document).off('mouseup');
//   });
// });

// // Regular click event on .image
// $('.image').on('click', function() {
//   console.log('Parent image clicked!');
// });
