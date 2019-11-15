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
    // https://getbootstrap.com/docs/4.3/components/modal/#events
    $('#modal_speaker').on('show.bs.modal', function (e) {
        if (! speakers) {
            console.error('Data not found:', 'speakers');
        } else {
            var $link = $(e.relatedTarget);
            var speakerCode = $link.data('speaker');
            var data = speakers[speakerCode];
            if (! data) {
                console.error('Speaker not found:', speakerCode);
            } else {
                $('#modal_speaker_photo').attr('src', 'assets/images/speakers/' + data['photo']);
                $('#modal_speaker_label').html(data['name']);
                for (data_key in data) {
                    if ('social' === data_key) {
                        var $social = $('#modal_speaker_' + data_key).empty();  // remove a sample of the social link from the layout
                        for (social_key in data[data_key]) {
                            var social_url = data[data_key][social_key].trim();
                            if (social_url) {
                                $social.append('<li class="list-inline-item"><a href="' +
                                    social_url + '"><i class="fab fa-fw fa-' +
                                    social_key + '"></i></a></li>');
                            }
                        }
                    } else {
                        $('#modal_speaker_' + data_key).html(data[data_key]);
                    }
                }
            }
        }
    });

    $('#modal_speaker').on('hidden.bs.modal', function (e) {
        // the old photo may be visible for a second after the modal window is opened next time, because the new photo may load slowly
        $('#modal_speaker_photo').attr('src', '');
    });
});