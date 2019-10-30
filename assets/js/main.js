$(document).ready(function() {

    /* ======== Add relopener for target blank urls ======== */
    $("a[target='_blank']").attr("rel", "noopener");

    /* ======= Scrollspy ======= */
    $('body').scrollspy({ target: '#header', offset: 400});

    /* ===== Smooth scrolling ====== */
	$('a.scrollto').on('click', function(e){
		//Collapse mobile menu after clicking
		if ($('.navbar-collapse').hasClass('show')){
			$('.navbar-toggler').trigger('click');
		}

	});

	/* ======= Countdown ========= */
	// set the date we're counting down to
    var target_date = new Date("Dec 7, 2019").getTime();

    // variables for time units
    var days, hours, minutes, seconds;

    // get tag element
    var countdown =  document.getElementById("countdown-box");
    var days_span = document.createElement("SPAN");
    days_span.className = 'days';
    countdown.appendChild(days_span);
    var hours_span = document.createElement("SPAN");
    hours_span.className = 'hours';
    countdown.appendChild(hours_span);
    var minutes_span = document.createElement("SPAN");
    minutes_span.className = 'minutes';
    countdown.appendChild(minutes_span);
    var secs_span = document.createElement("SPAN");
    secs_span.className = 'secs';
    countdown.appendChild(secs_span);

    // update the tag with id "countdown" every 1 second
    setInterval(function () {

        // find the amount of "seconds" between now and target
        var current_date = new Date().getTime();
        var seconds_left = (target_date - current_date) / 1000;

        // do some time calculations
        days = parseInt(seconds_left / 86400);
        seconds_left = seconds_left % 86400;

        hours = parseInt(seconds_left / 3600);
        seconds_left = seconds_left % 3600;

        minutes = parseInt(seconds_left / 60);
        seconds = parseInt(seconds_left % 60);

        // format countdown string + set tag value.
        days_span.innerHTML = '<span class="number">' + days + '</span>' + '<span class="unit">Days</span>';
        hours_span.innerHTML = '<span class="number">' + hours + '</span>' + '<span class="unit">Hrs</span>';
        minutes_span.innerHTML = '<span class="number">' + minutes + '</span>' + '<span class="unit">Mins</span>';
        secs_span.innerHTML = '<span class="number">' + seconds + '</span>' + '<span class="unit">Secs</span>';

    }, 1000);

    /* ======= Modal Speaker ========= */
    $('#modal_speaker').on('show.bs.modal', function (e) {
        var arrayFields = ['name', 'job', 'company', 'about'];
        var arraySocial = ['twitter', 'linkedin', 'github'];
        var $link = $(e.relatedTarget);
        $('#modal_speaker_photo').attr('src', 'assets/images/speakers/' + $link.data('photo') + '.jpg');
        $('#modal_speaker_label').html($link.data('name'));
        for (var field of arrayFields ) {
            $('#modal_speaker_' + field).html($link.data(field));
        }
        for (var field of arraySocial ) {
            var url = $link.data(field);
            var $social = $('#modal_speaker_' + field);
            if (url) {
                $social.css("display", 'inline-block').children('a').attr('href', url);
            } else {
                $social.css("display", 'none');
            }
        }
    });
});