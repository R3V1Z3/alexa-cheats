/* global $, jQuery, dragula, location */
var TOC = [];
var columns = 2;
jQuery(document).ready(function() {
    
    // get url parameters
    // from http://stackoverflow.com/questions/11582512/how-to-get-url-parameters-with-javascript/11582513#11582513
    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
    }
    var gist = getURLParameter('gist');
    if (!gist) {
        $.ajax({
            url: 'alexa-cheats.md',
            type: 'GET',
            dataType: 'text'
        }).success(function(content) {
            render(content);
            render_sections();
            render_info();
        }).error(function(e) {
            console.log('Error on ajax return.');
        });
    } else {
        $.ajax({
            url: 'https://api.github.com/gists/' + gist,
            type: 'GET',
            dataType: 'jsonp'
        }).success(function(gistdata) {
            var objects = [];
            if (!filename) {
                for (var file in gistdata.data.files) {
                    if (gistdata.data.files.hasOwnProperty(file)) {
                        var o = gistdata.data.files[file].content;
                        if (o) {
                            objects.push(o);
                        }
                    }
                }
            }
            else {
                objects.push(gistdata.data.files[filename].content);
            }
            render(objects[0]);
        }).error(function(e) {
            console.log('Error on ajax return.');
        });
    }
    
    var showonly = getURLParameter('showonly');
    if (!showonly) showonly = '';
    var columns = getURLParameter('columns');
    if (!columns) columns = 2;

    function render(content) {
        var md = window.markdownit();
        $('#wrapper').html( md.render(content) );
        
        // handle variations, display first item
        var $html = '';
        $('li strong').each(function(){
            var items = $(this).text().split('/');
            $.each( items, function( key, value ) {
                if (key == 0){
                    $html = '<span class="variation current">' + value + '</span>';
                } else {
                    $html += '<span class="variation">' + value + '</span>';
                }
            });
            $(this).html($html);
        });
        
        // make variations clickable
        $('li strong').click(function() {
            var current = $(this).find('.variation.current');
            $(current).removeClass('current');
            if ($(current).next('.variation').length) {
                $(current).next('.variation').addClass('current');
            } else {
                $(this).find('.variation').first().addClass('current');
            }
        });
    }
    
    function columnize(columns) {
        // begin by wrapping all sections in first column
        $('#commands .section').wrapAll('<div class="column column1of' + columns + '" id="column1"/>');
        if( columns < 2 || columns > 4 ) {
            return;
        }
        for (var i=2; i <= columns; i++) {
            $('#commands').append('<div class="column column1of' + columns + '" id="column' + i + '"/>');
        }
        
        var column_counter = 1;
        
        // iterate sections
        $('#commands .section').each(function() {
            if( column_counter > 1 ) {
                // move this section to next column
                $(this).detach().appendTo('#column' + column_counter);
            }
            column_counter += 1;
            if( column_counter > columns ) {
                column_counter = 1;
            }
        });
    }
    
    function render_sections() {
        
        // header section
        $('h1').each(function() {
            $(this).nextUntil("h2").andSelf().wrapAll('<section id="header"/>');
            $(this).wrapInner('<a name="header"/>');
        });
        
        // command sections
        $('h2').each(function() {
            // get content of h2
            var name = $(this).text().toLowerCase().replace(/\s/g, "-");
            name = name.replace(',', '');
            // add anchor link
            $(this).wrapInner('<a class="handle" name="' + name + '"/>');
            $(this).nextUntil("h2").andSelf().wrapAll('<div class="section" id="' + name + '"/>');
        });
        
        // wrap all command sections in new section
        $('#header').siblings().wrapAll('<section id="commands"/>');
        
        columnize(columns);
        
        // hide all other sections if showonly has been specified
        if(showonly != '') {
            $('#' + showonly).siblings().hide();
        }
        
        // make sections draggable
        dragula( $('.column').toArray(),  {
            moves: function (el, container, handle) {
                return handle.className === 'handle';
            }
        }).on('drop', function (el) {
            // update toc
            $('#toc').html( toc_html() );
        });
  
    }
    
    function toc_html() {
        var html = '<h3>Table of Contents</h3>';
        // iterate section classes and get id name to compose TOC
        $( '#commands .section' ).each(function() {
            var name = $( this ).attr( 'id' );
            html += '<a href="#' + name + '">';
            html += name;
            html += '</a>';
        });
        return html;
    }
    
    function render_info() {
        
        // GitHub Ribbon
        var html = '<a href="https://github.com/Ugotsta/alexa-cheats"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"></a>';
        
        // render TOC
        html += '<div id="toc">';
        html += toc_html();
        html += '</div>';
        
        // command count
        var command_count = $('li').length;
        html += '<div id="command-count">Total commands: ' + command_count + '</div>';
        
        // hide info
        html += '<div id="hide"><span class="key">?</span> - show/hide this panel</div>';
        $('#info').html( html );
        $('#hide').click(function() {
            $('#info').toggle();
        });
        
        // Add keypress to toggle info on '?' or 'h'
        $(document).keypress(function(e) {
            if(e.which == 104 || e.which == 63 || e.which == 72 || e.which == 47) {
                $('#info').toggle();
            }
        });
    }

});
