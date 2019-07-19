# instant-filter
Filter any list or table of data simply by adding this plugin and a small mod to the markup of your table or list

Madlantern's Instant Filter – Filter any list or table of data simply by adding this plugin and a small mod to the markup of your table or list.

Created By: Melanie Wilson - www.madlantern.com - github.com/madlantern/instant-filter

Published: 2019-07

Description: This plugin takes a standard table, unordered list or ordered list and adds a filter input. Only rows or list items containing what you type in the filter will show in the results, all others will hide. You can use plugin on multiple tables or lists on a page and one will not affect the other.

Before you use this plugin: I am sharing this plugin with the public, free of charge, without any guarantees that it will work on any specific site, and without any guarantee of future versions. If you choose to use this plugin, you agree to use it at your own risk and without any guaranteed support from me.

How to install:

1.	Copy the madl-instant-filter folder and its contents to a place on your site
2.	From your template file, or on each markup (html, php, etc) page where you want to use this plugin, in the header, add a script reference to the instantFilter-dist.js javascript file which is site-root relative. (That means if the plugin files are stored at mysite.com/scripts/madl-instant-filter/ then your script reference should look like this: <script type="text/javascript" async="async" defer="defer" src="/scripts/madl-instant-filter/instantFilter-dist.js"></script>)

How to use:

•	To the table, ol or ul that you want to filter, add this class to the tag: madln-instantFilterList

Options:

•	Customize the filter label text: Add this attribute to the table or list tag that is being filtered: data-filter-label="Your Custom Label Here"
•	Customize “no matches” text: Add the following attribute to the table or list tag that is being filtered: data-no-match-message="Your custom no-matches text here"
•	Customize the character length of the input: Add the following attribute to the table or list tag that is being filtered:  data-filter-input-length="" . Set its value to a number (integer) to set the length of your filter field. Max 100, min 1. Default (not set or empty value) is 22.
•	Case sensitive filter: Add the following attribute to the table or list tag being filtered: data-recognize-caps="true" – this will make the results only show if they match the case you typed into the filter.
•	Add custom styles: Add the following attribute to the table or list tag being filtered: data-filter-style – accepted values for the preset styles are (you can combine them):
    madln-showBorders – shows table borders.
    madln-staggerColors – alternates shades of gray on table rows
    madln-pad-input – Adds some breathing room around the filter input.

Notes:

•	This plugin uses jQuery. It will add and initialize jquery if it finds that it needs to, so if you don’t already have jquery installed or add a reference to jquery anywhere in your scripts or markup.
•	Works well with nested lists!
•	Does not work particularly well with nested tables. Nested tables are not a great idea anyway, so maybe just try to avoid.

Troubleshooting:

•	Filter box does not appear. Check the javasccript console in the developer tools of your browser. If you see an error referencing the plugin script, that may mean the reference is written incorrectly or the files are missing. Check the reference to the script file in your markup. Also, don’t change the names of the script files! If your site uses a javascript combiner, that could also be the issue.
•	Filter box appears but does not work.  It’s possible you have something strangely nested. Check your html and make sure that all of your tags are closed. Don’t nest tables, if you can avoid it. Nested lists should be fine.
•	Numbers in ordered lists rearrange when I use the filter. That’s expected functionality. While I don’t like it, I haven’t had a chance to research and fix it.
