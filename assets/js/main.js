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
    // // set the date we're counting down to
    // var target_date = new Date("Dec 7, 2019").getTime();

    // // variables for time units
    // var days, hours, minutes, seconds;

    // // get tag element
    // var countdown =  document.getElementById("countdown-box");
    // var days_span = document.createElement("SPAN");
    // days_span.className = 'days';
    // countdown.appendChild(days_span);
    // var hours_span = document.createElement("SPAN");
    // hours_span.className = 'hours';
    // countdown.appendChild(hours_span);
    // var minutes_span = document.createElement("SPAN");
    // minutes_span.className = 'minutes';
    // countdown.appendChild(minutes_span);
    // var secs_span = document.createElement("SPAN");
    // secs_span.className = 'secs';
    // countdown.appendChild(secs_span);

    // // update the tag with id "countdown" every 1 second
    // setInterval(function () {

    //     // find the amount of "seconds" between now and target
    //     var current_date = new Date().getTime();
    //     var seconds_left = (target_date - current_date) / 1000;

    //     // do some time calculations
    //     days = parseInt(seconds_left / 86400);
    //     seconds_left = seconds_left % 86400;

    //     hours = parseInt(seconds_left / 3600);
    //     seconds_left = seconds_left % 3600;

    //     minutes = parseInt(seconds_left / 60);
    //     seconds = parseInt(seconds_left % 60);

    //     // format countdown string + set tag value.
    //     days_span.innerHTML = '<span class="number">' + days + '</span>' + '<span class="unit">Days</span>';
    //     hours_span.innerHTML = '<span class="number">' + hours + '</span>' + '<span class="unit">Hrs</span>';
    //     minutes_span.innerHTML = '<span class="number">' + minutes + '</span>' + '<span class="unit">Mins</span>';
    //     secs_span.innerHTML = '<span class="number">' + seconds + '</span>' + '<span class="unit">Secs</span>';

    // }, 1000);

    /* ======= Modal Speaker ========= */
    // https://getbootstrap.com/docs/4.3/components/modal/#events

    function selectorSpeaker(field) {
        return '#modal_speaker_' + field;
    }

    $('#modal_speaker').on('show.bs.modal', function (e) {
        var clearFields = ['job', 'company', 'social', 'description'];
        var clearFieldsSelector = clearFields.reduce(function(selector, field) {
            return (selector ? selector + ',' : '') + selectorSpeaker(field);
        }, '');
        var $link = $(e.relatedTarget);
        var speakerCode = $link.data('speaker');
        var title = $link.data('title');
        var description = $link.data('description');
        $(clearFieldsSelector).empty();  // clear fields that may be missing in the data
		$(selectorSpeaker('photo')).attr('src', '').hide();
        if (! speakers || ! speakers[speakerCode]) {
            $(selectorSpeaker('name')).html(title);
            $(selectorSpeaker('description')).html(description);
        } else {
            var data = speakers[speakerCode];
            if (data['photo']) {
                $(selectorSpeaker('photo')).attr('src', 'assets/images/speakers/' + data['photo']).show();
            }

            $(selectorSpeaker('label')).html(data['name']);
            for (data_key in data) {
                if ('social' === data_key) {
                    var $social = $(selectorSpeaker(data_key));
                    for (social_key in data[data_key]) {
                        var social_url = data[data_key][social_key].trim();
                        if (social_url) {
                            $social.append('<li class="list-inline-item"><a href="' +
                                social_url + '"><i class="fab fa-fw fa-' +
                                social_key + '"></i></a></li>');
                        }
                    }
                } else if ('description' === data_key && description) {
                    $(selectorSpeaker(data_key)).html(description);
                } else {
                    $(selectorSpeaker(data_key)).html(data[data_key]);
                }
            }
        }
    });

    /* ======= Modal Sponsor ========= */
   
    function selectorSponsor(field) {
        return '#modal_sponsor_' + field;
    }

    $('#modal_sponsor').on('show.bs.modal', function (e) {
        var $link = $(e.relatedTarget);
        var title = $link.data('title');
        var description = $link.find('.item-description').html()
        var photo = $link.data('photo');
        var link = $link.data('link');
        $(selectorSponsor('photo')).attr('src', '').hide();
        $(selectorSponsor('photo')).attr('src', 'assets/images/logos/' + photo).show();
        $(selectorSponsor('name')).html(title);
        $(selectorSponsor('link')).attr('href', link);
        $(selectorSponsor('description')).html(description);
    });

});