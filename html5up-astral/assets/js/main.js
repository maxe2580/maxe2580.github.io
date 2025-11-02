/*
	Astral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$main = $('#main'),
		$panels = $main.children('.panel'),
		$nav = $('#nav'), $nav_links = $nav.children('a');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '361px',   '736px'  ],
			xsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		$nav_links
			.on('click', function(event) {

				var href = $(this).attr('href');

				// Not a panel link? Bail.
					if (href.charAt(0) != '#'
					||	$panels.filter(href).length == 0)
						return;

				// Prevent default.
					event.preventDefault();
					event.stopPropagation();

				// Change panels.
					if (window.location.hash != href)
						window.location.hash = href;

			});

	// Panels.

		// Initialize.
			(function() {

				var $panel, $link;

				// Get panel, link.
					if (window.location.hash) {

				 		$panel = $panels.filter(window.location.hash);
						$link = $nav_links.filter('[href="' + window.location.hash + '"]');

					}

				// No panel/link? Default to first.
					if (!$panel
					||	$panel.length == 0) {

						$panel = $panels.first();
						$link = $nav_links.first();

					}

				// Deactivate all panels except this one.
					$panels.not($panel)
						.addClass('inactive')
						.hide();

				// Activate link.
					$link
						.addClass('active');

				// Reset scroll.
					$window.scrollTop(0);

			})();

		// Hashchange event.
			$window.on('hashchange', function(event) {

				var $panel, $link;

				// Get panel, link.
					if (window.location.hash) {

				 		$panel = $panels.filter(window.location.hash);
						$link = $nav_links.filter('[href="' + window.location.hash + '"]');

						// No target panel? Bail.
							if ($panel.length == 0)
								return;

					}

				// No panel/link? Default to first.
					else {

						$panel = $panels.first();
						$link = $nav_links.first();

					}

				// Deactivate all panels.
					$panels.addClass('inactive');

				// Deactivate all links.
					$nav_links.removeClass('active');

				// Activate target link.
					$link.addClass('active');

				// Set max/min height.
					$main
						.css('max-height', $main.height() + 'px')
						.css('min-height', $main.height() + 'px');

				// Delay.
					setTimeout(function() {

						// Hide all panels.
							$panels.hide();

						// Show target panel.
							$panel.show();

						// Set new max/min height.
							$main
								.css('max-height', $panel.outerHeight() + 'px')
								.css('min-height', $panel.outerHeight() + 'px');

						// Reset scroll.
							$window.scrollTop(0);

						// Delay.
							window.setTimeout(function() {

								// Activate target panel.
									$panel.removeClass('inactive');

								// Clear max/min height.
									$main
										.css('max-height', '')
										.css('min-height', '');

								// IE: Refresh.
									$window.triggerHandler('--refresh');

								// Unlock.
									locked = false;

							}, (breakpoints.active('small') ? 0 : 500));

					}, 250);

			});

	// IE: Fixes.
		if (browser.name == 'ie') {

			// Fix min-height/flexbox.
				$window.on('--refresh', function() {

					$wrapper.css('height', 'auto');

					window.setTimeout(function() {

						var h = $wrapper.height(),
							wh = $window.height();

						if (h < wh)
							$wrapper.css('height', '100vh');

					}, 0);

				});

				$window.on('resize load', function() {
					$window.triggerHandler('--refresh');
				});

			// Fix intro pic.
				$('.panel.intro').each(function() {

					var $pic = $(this).children('.pic'),
						$img = $pic.children('img');

					$pic
						.css('background-image', 'url(' + $img.attr('src') + ')')
						.css('background-size', 'cover')
						.css('background-position', 'center');

					$img
						.css('visibility', 'hidden');

				});

		}

})(jQuery);
// ==============================
// 🎓 Graduation Countdown Timer
// ==============================

// Set the target graduation date and time (1st November 2026)
const graduationDate = new Date("November 1, 2026 00:00:00").getTime();

// Create a live updating countdown using setInterval, refreshing every 1000ms (1 second)
const countdown = setInterval(() => {

  // Get the current time
  const now = new Date().getTime();

  // Calculate the distance between now and the graduation date (in milliseconds)
  const distance = graduationDate - now;

  // Convert milliseconds into days, weeks, hours, minutes, and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);
  const remainingDays = days % 7;
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Get the HTML element with ID "countdown" (this displays the timer text)
  const timerElement = document.getElementById("countdown");

  // If the date is still in the future, display time remaining
  if (distance > 0) {
    timerElement.innerHTML = `Graduation in ${weeks} weeks, ${remainingDays} days, ${hours}h ${minutes}m ${seconds}s`;
  } 
  // If the date has passed, clear the timer and display a congratulatory message
  else {
    clearInterval(countdown);
    timerElement.innerHTML = "🎉 Congratulations, you’ve graduated!";
  }

}, 1000); // Update every second


// ==============================
// 🌗 Light/Dark Mode Toggle
// ==============================

// Get the toggle button by its ID
const modeToggle = document.getElementById('modeToggle');

// Check if the user previously selected light mode (saved in localStorage)
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-mode'); // Apply light mode CSS
  modeToggle.textContent = 'Dark Mode'; // Update button text
}

// When the button is clicked, toggle between light and dark mode
modeToggle.addEventListener('click', () => {
  // Add/remove the light mode class on the <body>
  document.body.classList.toggle('light-mode');

  // Check the current mode
  const isLightMode = document.body.classList.contains('light-mode');

  // Update button label depending on the mode
  modeToggle.textContent = isLightMode ? 'Dark Mode' : 'Light Mode';

  // Save the user's preference to localStorage so it persists across pages
  localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
});


// ==============================
//  Contact Form Validation
// ==============================

// Add an event listener to the form to validate input before submission
document.getElementById("contactForm").addEventListener("submit", function(event) {

  // Retrieve user input values and remove whitespace
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Target the error message element
  const errorMsg = document.getElementById("formError");

  // Regular expression to check if the email format is valid
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation check:
  // - Email must not be blank
  // - Message must not be blank
  // - Email must match valid format
  if (!email || !message || !emailPattern.test(email)) {
    event.preventDefault(); // Stop form submission if validation fails
    errorMsg.style.display = "block"; // Show error message
  } else {
    errorMsg.style.display = "none"; // Hide error message if valid
  }
});

