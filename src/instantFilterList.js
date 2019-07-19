
window.onload = function() {
// Check if Jquery is already loaded, if not, load the jquery magic! Then load the instant sort list. Borrowed most of this from someone else's example, because it is awesome and works well.
    (function(url, position, callback){
        // default values
        url = url || 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
        position = position || 0;

        // Check is jQuery exists
        if (!window.jQuery) {
            // Jquery not loaded -- insert jquery!
            // Initialize <head>
            var head = document.getElementsByTagName('head')[0];
            // Create <script> element
            var script = document.createElement("script");
            // Append URL
            script.src = url;
            // Append type
            script.type = 'text/javascript';
            // Append script to <head>
            head.appendChild(script);
            // Move script on proper position
            head.insertBefore(script,head.childNodes[position]);

            script.onload = function(){
                if(typeof callback == 'function') {
                    callback(jQuery);
                }
            };
        } 
        else {
            if(typeof callback == 'function') {
                callback(jQuery);
                // Jquery already loaded!             
            }
        }
    }('https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js', 5, function($){ 
        // Stuff that happens after jquery init confirmed (this case, call our filter list)
        instantFilterList();
    }));

}


function instantFilterList(){
// Jquery is loaded, let's build the list functionality!

    // Add the CSS (Find where the instant filter list files are stored and add the CSS file.)
    var instantListDir = $('script[src*="instantFilter-dist.js"').attr('src'),
        instantlistCSS = (instantListDir.substr(0, instantListDir.indexOf('instantFilter-dist.js'))) + 'instantFilterList-dist.css'; 
    $('head').append('<link rel="stylesheet" href="' + instantlistCSS + '" type="text/css" />');

    // Wrap each filter list in a container so all future elements have a common parent
    $('.madln-instantFilterList').wrap('<div class="madln-ISLWrap"></div>');
    
    // Add Labels, inputs and styles for each list
    $( '.madln-instantFilterList' ).each(function( index ) {
        var inputLabel = $(this).attr('data-filter-label'),
            listNumber = index + 1,
            filterStyles = "",
            inputLength = $(this).attr('data-filter-input-length'),
            noMatchMessage = "No matching results.",
            typeOfElement = $(this).get(0).tagName;

        // If the filter list is a table and mark the header row...
        if(typeOfElement == "TABLE" ){
            $(this).find('th').closest('tr').addClass('madln-headerRow');
            if($(this).find('.madln-headerRow:has(td)')){
                // Unless the row is not entirely a header row. Then remove that class.
                $(this).find('.madln-headerRow:has(td)').removeClass('madln-headerRow');
            }
        }

        //Find and set custom no-match message
        if ($(this).attr('data-no-match-message') != undefined && $(this).attr('data-no-match-message') != '') {
            noMatchMessage = $(this).attr('data-no-match-message');
        }   
        
        //Add a common container for filter, and "no results" container
        $(this).before('<div class="madln-filter-row"></div>');
        $(this).after('<div class="madln-no-results-row" style="display:none;">' + noMatchMessage + '</div>');

        // Check for input label customization
        if (inputLabel == undefined || inputLabel == '') {
            inputLabel = "Type here to filter list";
        }       
        $(this).siblings('.madln-filter-row').append('<label for="madln-ISLInput' + listNumber + '">' + inputLabel + '</label>');
        $(this).siblings('.madln-filter-row').append(' <input type="text" class="madln-ISLInput" id="madln-ISLInput' + listNumber + '" />');

        // Check for custom input length
        if (inputLength != undefined){
            // Check to make sure that value passed was an integer -- if we parse something that wasn't originally an integer, new val will be different than original..!
            var inputLengthMeasure = parseInt(inputLength, 10);
            if( Math.floor(inputLengthMeasure) == inputLength){
                // It's an integer, so we check to make sure what was passed is within an acceptable range (1-100)
                if(inputLengthMeasure < 1){
                    inputLength = 1;
                }
                else if(inputLengthMeasure > 100){
                    inputLength = 100;
                }
                else{
                    inputLength = inputLengthMeasure;
                }
            }
            else{
                inputLength = 22;
            }
        }
        else {
            inputLength = 22;
        }
        $(this).closest('.madln-ISLWrap').find('.madln-ISLInput').attr('size' , inputLength);

        // Check for styles
        if ($(this).attr('data-filter-style') != undefined){
            filterStyles = $(this).attr('data-filter-style');
            $(this).closest('.madln-ISLWrap').addClass(filterStyles);
        }

    });

    // Add non-case sensitive value to each item
    $( '.madln-instantFilterList li, .madln-instantFilterList tr' ).each(function( index ) {
        var listItemText = $(this).text().toLowerCase();
        $(this).attr('data-item-name' , listItemText);
    });


    // On Typing in input...
    $('body').on('keyup', 'input.madln-ISLInput', function(e){
        
        var typedInFilter = $(this).val(),
            respectCaps = $(this).siblings('.madln-instantFilterList').attr('data-recognize-caps'),
            useElement = 'data-item-name';

        if(respectCaps != undefined){
            //Check for case sensitivity
            respectCaps = respectCaps.toString().toLowerCase();
            if(respectCaps == 'true' || respectCaps == 'yes' || respectCaps == '' || respectCaps == '1'){
                // Match Case!
                useElement = 'text';
            }
        }

        // Show/Hide applicable results
        if(typedInFilter != ''){
            if(useElement == 'data-item-name' ){
                // not case sensitive
                typedInFilter = typedInFilter.toLowerCase();
                $(this).closest('.madln-ISLWrap').find('li[data-item-name*="' + typedInFilter + '"]').show();
                $(this).closest('.madln-ISLWrap').find('li').not('[data-item-name*="' + typedInFilter + '"]').hide();
                $(this).closest('.madln-ISLWrap').find('tr[data-item-name*="' + typedInFilter + '"]').not('.madln-headerRow').show();
                $(this).closest('.madln-ISLWrap').find('tr').not('[data-item-name*="' + typedInFilter + '"]').not('.madln-headerRow').hide();
            }
            else {
                // case sensitive
                $(this).closest('.madln-ISLWrap').find('li:contains("' + typedInFilter + '")').show();
                $(this).closest('.madln-ISLWrap').find('li:not(:contains("' + typedInFilter + '"))').hide();
                $(this).closest('.madln-ISLWrap').find('tr:contains("' + typedInFilter + '")').not('.madln-headerRow').show();
                $(this).closest('.madln-ISLWrap').find('tr:not(:contains("' + typedInFilter + '"))').not('.madln-headerRow').hide();
            }
            $(this).closest('.madln-ISLWrap').find('.madln-no-results-row').hide();
        }
        else {
            // If input is blank, just show everything.
            $(this).closest('.madln-ISLWrap').find('.madln-no-results-row').hide();
            $(this).closest('.madln-ISLWrap').find('li').show();
            $(this).closest('.madln-ISLWrap').find('tr').show();
        }

        if($(this).closest('.madln-ISLWrap').find('li:visible').length == 0 && $(this).closest('.madln-ISLWrap').find('tr:not(.madln-headerRow):visible').length == 0) {
            // action when all are hidden (except header row, if using on a table)
            $(this).closest('.madln-ISLWrap').find('.madln-no-results-row').show();           
         }

    
    });

}


