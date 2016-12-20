/*
GENERAL
Table filtering script.
Rows which contain string in the corresponding INPUT are shown, the others 
are hidden.

USING EXAMPLE
<script type="text/javascript" src="table_filter.js"></script>
<script type="text/javascript">
	add_table_filter("table_filter_input", "filtered_table", 3, [1, 2, 3]);
</script>
Important! add_table_filter() call should be placed below the TABLE and 
INPUT declaration.

INPUT PARAMETERS
function add_table_filter(input_id, table_id, search_columns, start_tr)
input_id - id of the INPUT (type="text") which will contain search string;
table_id - id of the filtered table;
start_tr - number of TR from which search should start (useful for removing 
	header rows from the search) (start from 1, not 0).
search_columns - array, numbers of columns which will participate in search 
	(start from 1, not 0); if search_columns == null, all columns are
	joined into search;

AUTHOR
Dmitry Kopytine, Info Design-M <dm9@infodesign.ru>
*/
function add_table_filter(input_id, table_id, start_tr, search_columns) {
	var ie = document.all && !window.opera;
	var input = document.getElementById(input_id);
	var table = document.getElementById(table_id);
	var timeout = null;
	var data_idx = 0;
	var data = new Array();
	var current_tr = 0;
	search_tr(table);
	input.onkeyup = set_timeout;
	input.onpaste = set_timeout;
	function search_tr(element) {
		var children = element.childNodes;
		var i = 0;
		while (children[i]) {
			if (children[i].tagName == "TR") {
				add_tds(children[i]);
			} else {
				search_tr(children[i]);
			}
			i++;
		}
	}
	function add_tds(tr) {
		current_tr++;
		if (current_tr < start_tr) return;
		data[data_idx] = {
			tr_element : tr,
			strings : []
		}
		tds = tr.childNodes;
		var tds_idx = 0;
		var current_td = 1;
		var strings_idx = 0;
		var str;
		while (tds[tds_idx]) {
			if (tds[tds_idx].tagName != "TD") {
				tds_idx++;
				continue;
			}
			if (!search_columns || in_array(current_td, search_columns)) {
				str = tds[tds_idx].innerHTML.toLowerCase();
				str = str.replace(/\"/g, "&quot;");
				str = str.replace(/\'/g, "&apos;");
				data[data_idx].strings[strings_idx] = str;
				strings_idx++;
			}
			if (tds[tds_idx].colspan > 1) {
				current_td += tds[tds_idx].colspan;
			} else {
				current_td++;
			}
			tds_idx++;
		}
		data_idx++;
	}
	function in_array(value, array) {
		var count = array.length;
		var i = 0;
		while (i < count) {
			if (array[i] == value) return true;
			i++;
		}
		return false;
	}
	function do_filtering(text) {
		text = text.toLowerCase();
		text = text.replace(/&/g, "&amp;");
		text = text.replace(/\"/g, "&quot;");
		text = text.replace(/\'/g, "&apos;");
		text = text.replace(/</g, "&lt;");
		text = text.replace("\>", "&gt;");
		var data_count = data.length;
		var data_idx = 0;
		var string_count;
		var string_idx;
		var show;
		while (data_idx < data_count) {
			string_count = data[data_idx].strings.length;
			string_idx = 0;
			show = false;
			while (string_idx < string_count) {
				if (data[data_idx].strings[string_idx].indexOf(text) >= 0) {
					//alert(text + " : " + data[data_idx].strings[string_idx]);
					show = true;
				}
				string_idx++;
			}
			data[data_idx].tr_element.style.display = (show ? (ie ? "block" : "table-row") : "none");
			data_idx++;
		}
	}
	function run_filter() {
		do_filtering(input.value);
	}
	function set_timeout() {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(run_filter, 50);
	}
}