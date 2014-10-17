function orderNav() {
    var list,
        section,
        header,
        sections = [],
        lists = {},
        headers = {};

    var navUl = document.querySelectorAll('#navigation ul')[0],
        navLis = document.querySelectorAll('#navigation ul li');

    if (!navUl) return;

    for (var i = 0; i < navLis.length; i++) {
        var order, li = navLis[i];

        if (li.classList.contains('nav-header')) {
            section = li.textContent || li.innerText;
            sections.push(section);
            headers[section] = li;
            continue;
        }

        if (!lists[section]) {
            lists[section] = [];
        }

        order = parseFloat(li.getAttribute('data-order'))
        lists[section].push([order, li]);
    }

    for (var i = 0; i < sections.length; i++) {
        section = sections[i];
        list = lists[section].sort(function(a, b) {
            return a[0] - b[0];
        });

        if (header = headers[section]) {
            navUl.appendChild(header);
        }
        for (var j = 0; j < list.length; j++) {
            navUl.appendChild(list[j][1]);
        }
    }
}

if (document.querySelectorAll) orderNav();

function on_data(data) {
    var searchresult = $('.searchresult');
    searchresult.empty();
    var docs = data.response.docs;
    var highlighting = data.highlighting;
    $.each(docs, function(i, item) {
        var resultitem = '<div class="resultitem"><a href="' + item.url_s +'">' + item.title_t + '</a>'
        $.each(highlighting, function(j, highlightingItem) {
            if (j == item.id) {
                resultitem = resultitem + '<p>';
                    if (typeof highlightingItem.text_t != 'undefined') {
                        resultitem += highlightingItem.text_t;
                    }
                resultitem += '</p>';
            }
        });
        resultitem = resultitem + '</div>';
        $('.searchresult').append(resultitem);
    });

    var total = 'Found ' + docs.length + ' results';
    searchresult.prepend('<div class="found">' + total + '</div>');
    $('.searchresult-panel-js').slideDown();
}

function on_search() {
    var query = $('.query-js').val();
    if (query.length == 0) {
        return;
    }

    var url=solrUrl+'/select/?q=(title_t:*' + query + '*)^3' +
        '+(category_txt:*' + query + '*)^2' +
        '+(tags_txt:*' + query + '*)^1.5' +
        '+(text_t:*' +query + '*)' +
        '&start=0&rows=50&indent=on&fl=id,url_s,title_t&wt=json&callback=?&json.wrf=on_data&hl=true&hl.fl=text_*';
    $.getJSON(url);
}

function on_ready() {
    $('.search-js').click(on_search);
    /* Hook enter to search */
    $('body').keypress(function(e) {
        if (e.keyCode == '13') {
            on_search();
        }
    });
    $('.panel-heading span.clickable').on("click", function (e) {
        // collapse the panel
        $(this).parents('.searchresult-panel-js').slideUp();
        $('.searchresult').empty();
    });
}
$(document).ready(on_ready);